from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Pinecone with API key
pinecone_key = os.getenv('pinecone_key')
pc = Pinecone(api_key=pinecone_key)

# Define index parameters
index_name = "fundher"
index_dimension = 1536
index_metric = "cosine"

# Check if the index already exists
existing_indexes = pc.list_indexes()

if index_name not in existing_indexes:
    # Create the index only if it doesn't exist
    pc.create_index(
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
