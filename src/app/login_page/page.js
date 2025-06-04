"use client";

import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
        grant_type: "password",
      };

      const formBody = new URLSearchParams(data).toString();

      console.log(data);

      const response = await fetch("/api/proxy/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          username: "",
          password: "",
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
