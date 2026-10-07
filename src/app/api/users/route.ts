import { NextRequest, NextResponse } from "next/server";
import { getUserMetrics, getUsers } from "@/lib/users";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("devpanel_token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await verifyToken(token);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const search = request.nextUrl.searchParams.get("search") ?? "";

  return NextResponse.json({
    users: getUsers(search),
    metrics: getUserMetrics(),
  });
}