import db from "./db";

export async function createUser(email, password, preferences) {
  const result = await fetch(
    `${process.env.NEXT_LOCALHOST_URL}/endpoint/register`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
        preferences: preferences,
      }),
    }
  );

  return result;
}

export async function loginUser(email, password) {
  const res = await fetch(`${process.env.NEXT_LOCALHOST_URL}/endpoint/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  });

  if (res.ok) {
    const data = await res.json();

    console.log("DEBUGGING LOGIN USER API");
    console.log("Response Data:", data);
    return data.access_token;
  } else {
    console.error("Login failed:", res.statusText);
  }
}

export async function getMe(token) {
  const res = await fetch(
    `${process.env.NEXT_LOCALHOST_URL}/endpoint/users/me`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const data = await res.json();

    console.log("DEBUGGING GET ME API");
    console.log("Response Data:", data);
    return { user: data.username, session: token };
  } else {
    console.error("Login failed:", res.statusText);
  }
}
