import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getToken } from "./auth";

export async function patchMe(payload) {
  const token = getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/endpoint/users/me`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (res.status === 401) {
    // Token expired or invalid
    cookies().delete("token");
    redirect("/login"); // force login again
  }

  if (!res.ok) {
    throw new Error("Something went wrong while updating user.");
  }

  const data = await res.json();
  return data;
}

export async function getMe() {
  const token = getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/endpoint/users/me`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    // Token expired or invalid
    cookies().delete("token");
    redirect("/login"); // force login again
  }

  if (!res.ok) {
    throw new Error("Something went wrong while getting user");
  }

  const data = await res.json();
  return data;
}
