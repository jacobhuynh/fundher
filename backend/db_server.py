from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from mongo_methods import *
from pinecone_methods import *
from fastapi.encoders import jsonable_encoder

# To start: uvicorn db_server:app --reload

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the MongoDB connection
def get_db():
    connection_string = os.getenv('mongo_url')
    client = MongoClient(connection_string)
    db = client['fundher']
    try:
        yield db
    finally:
        client.close()

# Pydantic model for user data
class UserData(BaseModel):
    email: str
    first_name: str
    last_name: str
    dob: str
    city: str
    state: str
    country: str
    citizen_status: str
    school: str
    gpa: float
    major: str
    current_job: str
    interests: List[str]
    resume: Optional[bytes]  # Optional resume field

class PineconeFund(BaseModel):
    pineconeId: str
    email: str

# Status endpoint
@app.get("/status")
def read_root():
    return {"message": "Working"}

# Endpoint to add user data to MongoDB
@app.post("/add_user/")
def add_mongo_user(user_data: UserData, db=Depends(get_db)):
    # Call the add_user method with injected database
    result = add_user(
        db,
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        dob=user_data.dob,
        city=user_data.city,
        state=user_data.state,
        country=user_data.country,
        citizen_status=user_data.citizen_status,
        school=user_data.school,
        gpa=user_data.gpa,
        major=user_data.major,
        current_job=user_data.current_job,
        resume=user_data.resume,
        interests=user_data.interests
    )
    return result

# Route to retrieve user data
@app.get("/get_user/{user_email}")
def get_mongo_user(user_email: str, db=Depends(get_db)):
    return get_user(db, user_email)

# Route to query pinecone database
@app.get("/pinecone_query/{user_email}")
def pinecone_query(user_email: str, db=Depends(get_db)):
    mongo_result = get_user(db, user_email)
    pinecone_result = query_pinecone(mongo_result)
    
    matches = [
        {
            "id": match["id"],
            "score": match["score"],
            "metadata": match.get("metadata", {})
        }
        for match in pinecone_result.get("matches", [])
    ]

    return jsonable_encoder({"matches": matches})

# Route to add fund to interested array
@app.post("/pinecone_interested/")
def pinecone_fund(pinecone_fund: PineconeFund, db=Depends(get_db)):
    pinecone_result = add_interested(db, pinecone_fund.email, pinecone_fund.pineconeId)
    return "Hi"

    
    