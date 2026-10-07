import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

const DEMO_EMAIL = "admin@devpanel.com";
const DEMO_PASSWORD = "DevPanel123!";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = await createToken(email);

  const response = NextResponse.json({
    token,
    user: {
      email,
      name: "DevPanel Admin",
    },
  });

  response.cookies.set("devpanel_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}