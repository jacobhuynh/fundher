import gridfs

def add_user(db, email, first_name, last_name, dob, city, state, country, citizen_status, school, gpa, major, current_job, resume, interests):
    try:
        # Set up GridFS using the provided database
        fs = gridfs.GridFS(db)

        # Save the resume in GridFS
        resume_file_id = None
        if resume:
            resume_file_id = fs.put(resume, filename=f"{first_name}_{last_name}_resume.pdf")

        # Create the document with all user information
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
            "interests": interests
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

        # Convert the result to JSON serializable format (if necessary)
        result['_id'] = str(result['_id'])  # Convert ObjectId to string
        return result
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}