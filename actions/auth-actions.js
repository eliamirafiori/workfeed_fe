"use server";

import { createAuthSession, createSession, deleteSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getMe, loginUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const location = formData.get("location");
  const job_title = formData.get("job_title");
  const experience_level = formData.get("experience_level");
  const minimum_salary = parseInt(formData.get("minimum_salary"));

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valide email.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 chars long.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  const preferences = {
    location,
    job_title,
    experience_level,
    minimum_salary,
  };

  try {
    await createUser(email, password, preferences);
  } catch (error) {
    return {
      errors: "It seems like we got some problems back here.",
    };
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    var token = await loginUser(email, password);
  } catch (error) {
    return {
      errors: "It seems like we got some problems back here.",
    };
  }

  console.log("TES TEST TEST");
  console.log(token);

  await createSession(token);
  redirect("/training");
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  }

  return signup(prevState, formData);
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
