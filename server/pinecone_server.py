from pinecone.grpc import PineconeGRPC as Pinecone
from dotenv import load_dotenv
import os

load_dotenv()

pinecone_key = os.getenv('pinecone_key')

pc = Pinecone(api_key=pinecone_key)