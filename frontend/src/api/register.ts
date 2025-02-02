"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  dob: string;
  city: string;
  state: string;
  country: string;
  citizen_status: string;
  school: string;
  gpa: number | null;
  major: string;
  current_job: string;
  interests: string[];
  resume: null;
}

export async function registerUser(userData: UserData) {
  console.log("formData", userData);
  try {
    const formData = JSON.stringify(userData);
    const response = await fetch("http://127.0.0.1:8000/add_user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        dob: userData.dob,
        city: userData.city,
        state: userData.state,
        country: userData.country,
        citizen_status: userData.citizen_status,
        school: userData.school,
        gpa: userData.gpa,
        major: userData.major,
        current_job: userData.current_job,
        interests: userData.interests,
        resume: userData.resume,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/register");
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to register user. Please try again." };
  }
}
