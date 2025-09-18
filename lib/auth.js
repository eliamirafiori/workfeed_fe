import { cookies } from "next/headers";

import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "./db";
import { getMe } from "./user";

export function getToken() {
  const token = cookies().get("token")?.value;
  return token;
}

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  // for NextJS 15+
  /*
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  */
  // for NextJS <15
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie(result.session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function createSession(token) {
  // for NextJS 15+
  /*
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  */
  // for NextJS <15
  cookies().set("session", token, {
    // httpOnly: true,
    // secure: true,
    // expires: expiresAt,
    // sameSite: "lax",
    // path: "/",
  });
}

export async function verifySession() {
  const sessionCookie = cookies().get("session");

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionToken = sessionCookie.value;

  if (!sessionToken) {
    return { user: null, session: null };
  }

  const result = await getMe(sessionToken);

  console.log(result);

  return result;
}

export async function deleteSession() {
  // for NextJS 15+
  // const cookieStore = await cookies();
  // for NextJS <15
  const cookieStore = cookies();
  cookieStore.delete("session");
}

export async function createUser(email, password) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/endpoint/register`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    }
  );

  return result;
}

export async function loginUser(email, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/endpoint/login`, {
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

    // Secure cookie setup
    cookies().set("token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 60 seconds × 60 minutes × 24 hours = 1 day in seconds
    });

    return { success: true };
  } else {
    console.error("Login failed:", res.statusText);
    return { success: false, error: "Invalid credentials" };
  }
}
