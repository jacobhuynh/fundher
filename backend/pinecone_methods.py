from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
from dotenv import load_dotenv
from openai import OpenAI
import json
import os

# Load environment variables
load_dotenv()

# Initialize OpenAI with API key
openai_key = os.getenv('openai_key')
openai_client = OpenAI(api_key=openai_key)


# Initialize Pinecone with API key
pinecone_key = os.getenv('pinecone_key')
index_host = os.getenv('index_host')
pinecone_client = Pinecone(api_key=pinecone_key)
pinecone_index = pinecone_client.Index(host=index_host)

# Define index parameters
index_name = "fundher"
index_dimension = 1536
index_metric = "cosine"

# Define vector upsert size
batch_size = 20

# Method to refresh pinecone database with new json data
def refresh_pinecone(filepath):
    # Extract the names of existing indexes
    existing_indexes = [index["name"] for index in pinecone_client.list_indexes()]

    # Create the index if it doesn't exist
    if index_name not in existing_indexes:
        pinecone_client.create_index(
            name=index_name,
            dimension=index_dimension,
            metric=index_metric,
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
        print(f"Index '{index_name}' created successfully.")
    else:
        print(f"Index '{index_name}' already exists.")

    # Get index namespaces and reset namespaces
    index_namespaces = pinecone_index.describe_index_stats()
    for namespace in index_namespaces['namespaces'].keys():
        pinecone_index.delete(delete_all=True, namespace=namespace)
        print(f"Successfully deleted {namespace}.")
        
    try:
        with open(filepath, "r") as file:
            json_data = json.load(file)
    except FileNotFoundError:   
        print("The file was not found.")
    except json.JSONDecodeError:
        print("The file contains invalid JSON.")
    
    # Define variable to hold vector embeddings
    vectors = []
    for item in json_data:
        data = []
        if isinstance(item, dict):
            for key, value in item.items():
            # Handle different data types
                if isinstance(value, list):
                    # Join list elements as a comma-separated string
                    value_str = ", ".join(str(item) for item in value)
                elif value is None:
                    value_str = "N/A"  # Handle null values
                else:
                    value_str = str(value)
                
                # Format each key-value pair
                data.append(f"{key.replace('_', ' ').title()}: {value_str}")
        
            data_string = "\n".join(data)
        
        # Generate embedding for the text using OpenAI
        try:
            response = openai_client.embeddings.create(
                input=data_string,
                model="text-embedding-3-small"
            )
            embedding = response.data[0].embedding
        except Exception as e:
            print(f"Error generating embedding for item {item['id']}: {e}")
            continue
        vectors.append({
            "id": item["link"],
            "values": embedding,
            "metadata": {
                "title": item.get("title", "N/A"),
                "link": item.get("link", "N/A"),
                "offered_by": item.get("offeredBy", "N/A"),
                "amount": item.get("amount", "N/A"),
                "grade_level": item.get("gradeLevel", "N/A"),
                "deadline": item.get("deadline", "N/A"),
                "scholarship_info": item.get("scholarshipInfo", "N/A"),
                "eligibility_info": item.get("eligibilityInfo", "N/A"),
                "application_info": item.get("applicationInfo", "N/A"),
                "requirements": item.get("requirements", [])
            }
        })
    for i in range(0, len(vectors), batch_size):
        upsert_response = pinecone_index.upsert(
            vectors=vectors[i:i + batch_size], 
            # Optional: separate vectors by categories (scholarships, funding, etc)
            namespace="fundher-data")
        
# Method to query pinecone database based on user data (should be given as json)
def query_pinecone(json_data):
    # To skip list
    skip = ["gpa", "email", "first_name", "last_name", "interested", "applied", "rejected", "accepted"]
    
    data = []
    for key, value in json_data.items():
        if key in skip:
            continue
        # Handle different data types
        if isinstance(value, list):
            # Join list elements as a comma-separated string
            value_str = ", ".join(str(item) for item in value)
        elif value is None:
            value_str = "N/A"  # Handle null values
        else:
            value_str = str(value)
        
        # Format each key-value pair
        data.append(f"{key.replace('_', ' ').title()}: {value_str}")
    
    data_string = "\n".join(data)
    
    # Create user vector to query database
    try:
        response = openai_client.embeddings.create(
            input=data_string,
            model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
    except Exception as e:
        print(f"Error generating embedding for item {json_data['email']}: {e}")
        return {"error": "Embedding generation failed"}
    
    # Query database based on user data
    response = pinecone_index.query(
        namespace="fundher-data",
        vector=embedding,
        top_k=50,
        include_values=True,
        include_metadata=True
    )
    
    return response

def get_fund(pinecone_id):
    response = pinecone_index.query(
        namespace="fundher-data",
        id=pinecone_id,
        top_k=1,
        include_values=True,
        include_metadata=True
    )
    return response.get("matches", [])[0].metadata