import { getToken } from "./auth";

export async function getHealth() {
  const token = getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/endpoint/health`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong while getting user");
  }

  const data = await res.json();
  return data;
}
