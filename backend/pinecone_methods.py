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
batch_size = 1

# Method to refresh pinecone database with new json data
def refresh_piencone(json_data):
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
        
        
    # TODO: retrieve real data
    json_data = '''
    [
        {
            "id": "item1",
            "text": "Scholarship opportunity for women pursuing degrees in STEM fields, offering up to $10,000 in funding.",
            "genre": "education",
            "url": "https://example.com/scholarship-for-women-stem",
            "tags": ["scholarship", "women", "STEM", "education", "funding"]
        }
    ]
    '''
    data = json.loads(json_data)

    # Define variable to hold vector embeddings
    vectors = []
    for item in data:
        # Generate embedding for the text using OpenAI
        try:
            response = openai_client.embeddings.create(
                # TODO: replace with all text
                input=item["text"],
                model="text-embedding-3-small"
            )
            embedding = response.data[0].embedding
        except Exception as e:
            print(f"Error generating embedding for item {item['id']}: {e}")
            continue
        vectors.append({
            # TODO: replace id with whatever url is
            "id": item["id"],
            "values": embedding,
            # TODO: replace metadata with real metadata
            "metadata": {
                "text": item["text"],
                "genre": item.get("genre", "unknown")
            }
        })
    for i in range(0, len(vectors), batch_size):
        upsert_response = pinecone_index.upsert(
            vectors=vectors[i:i + batch_size], 
            # Optional: separate vectors by categories (scholarships, funding, etc)
            namespace="fundher-data")
        
# Method to query pinecone database based on user data (should be given as json)
def query_pinecone(data):
    
    # Create user vector to query database
    try:
        response = openai_client.embeddings.create(
            # TODO: turn data into string
            input=data,
            model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
    except Exception as e:
        print(f"Error generating embedding for item {data['email']}: {e}")
    user_vector = {
        "id": data["email"],
        "values": embedding,
        # TODO: replace metadata with real metadata
        "metadata": {
            "first_name": data["first_name"],
            "last_name": data["last_name"]
        }
    }
    
    # Query database based on user data
    response = pinecone_index.query(
        namespace="fundher-data",
        vector=user_vector,
        filter={
            # Optional
        },
        top_k=20,
        include_values=True
    )
    
    return response