import gridfs
from pinecone_methods import *

def add_user(db, email, first_name, last_name, dob, city, state, country, citizen_status, school, gpa, major, current_job, resume, interests):
    try:
        # Set up GridFS using the database
        fs = gridfs.GridFS(db)

        # Save resume in GridFS
        resume_file_id = None
        if resume:
            resume_file_id = fs.put(resume, filename=f"{first_name}_{last_name}_resume.pdf")

        # Create document with all user information
        document = {
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "dob": dob,
            "city": city,
            "state": state,
            "country": country,
            "citizen_status": citizen_status,
            "school": school,
            "gpa": gpa,
            "major": major,
            "current_job": current_job,
            "resume_file_id": str(resume_file_id) if resume_file_id else None,
            "interests": interests,
            "applied": [],
            "interested": [],
            "accepted": [],
            "rejected": [],
        }

        # Insert the document into the collection
        result = db['user_data'].insert_one(document)
        return {"message": "User added successfully!", "user_id": str(result.inserted_id)}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

def get_user(db, email):
    try:
        # Query the user_data collection
        result = db['user_data'].find_one({"email": email})
        
        # Handle the case where the user is not found
        if not result:
            return {"error": "User not found"}

        result['_id'] = str(result['_id']) 
        return result
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
    
def add_interested(db, email, fund):
    try:
        # Query the user_data collection
        result = db['user_data'].find_one({"email": email})
        
        # Handle the case where the user is not found
        if not result:
            return {"error": "User not found"}
        
        fund_json = get_fund(fund)

        result['interested'].append(fund_json)

        db['user_data'].update_one(
            {"email": email},
            {"$set": {"interested": result['interested']}}
        )

        return {"message": "Fund added successfully."}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}