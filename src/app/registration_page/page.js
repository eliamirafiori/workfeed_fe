"use client";

import { useState } from "react";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    location: "",
    job_title: "",
    experience_level: "",
    minimum_salary: 0,
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      let data = {
        username: formData.username,
        password: formData.password,
        preferences: {
          location: formData.location,
          job_title: formData.job_title,
          experience_level: formData.experience_level,
          minimum_salary: formData.minimum_salary,
        },
      };

      console.log(data);

      const test = await fetch("/api/proxy/health", { method: "GET" });

      console.log(test.json());

      const response = await fetch(
        "/api/proxy/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Credentials": "true",
            // "Access-Control-Allow-Origin": "https://work-feed-be.onrender.com",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            // "Access-Control-Allow-Headers":
            //   "X-CSRF-Token, X-Requested-With, Accept, Accept- Version, Content - Length, Content - MD5, Content - Type, Date, X - Api - Version",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setStatus("success");
        setFormData({
          username: "",
          password: "",
          location: "",
          job_title: "",
          experience_level: "",
          minimum_salary: 0,
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Username</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Location</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Job Title</span>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Experience Level</span>
          <input
            type="text"
            name="experience_level"
            value={formData.experience_level}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Minimum Salary</span>
          <input
            type="number"
            name="minimum_salary"
            value={formData.minimum_salary}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>

        {status === "loading" && (
          <p className="mt-4 text-blue-500">Submitting...</p>
        )}
        {status === "success" && (
          <p className="mt-4 text-green-600">Form submitted successfully!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-600">
            Submission failed. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
