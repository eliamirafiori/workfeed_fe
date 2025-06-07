"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import { auth } from "@/actions/auth-actions";

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});

  let preferences;

  if (mode === "signup") {
    preferences = (
      <>
        <h2>Preferences</h2>
        <p>
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" />
        </p>
        <p>
          <label htmlFor="job_title">Job Title</label>
          <input type="text" name="job_title" id="job_title" />
        </p>
        <p>
          <label htmlFor="experience_level">Experience Level</label>
          <input type="text" name="experience_level" id="experience_level" />
        </p>
        <p>
          <label htmlFor="minimum_salary">Minimum Salary</label>
          <input type="number" name="minimum_salary" id="minimum_salary" />
        </p>
      </>
    );
  }

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <h2>Credentials</h2>
      <p>
        <label htmlFor="email">Email or Username</label>
        <input type="text" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {preferences}
      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account</Link>
        )}
      </p>
    </form>
  );
}
