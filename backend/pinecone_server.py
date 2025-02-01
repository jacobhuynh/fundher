from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

# Initialize FastAPI app
app = FastAPI()

# Sample model for POST requests
class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    on_offer: bool

# Basic root route
@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI!"}

# Sample GET route with a path parameter
@app.get("/items/{item_id}")
def read_item(item_id: int, query_param: Optional[str] = None):
    return {"item_id": item_id, "query_param": query_param}

# Sample POST route
@app.post("/items/")
def create_item(item: Item):
    return {"item": item}
