import { NextResponse } from "next/server";
import { getSession, getRegisteredUsers } from "@/lib/auth";

export async function GET() {
  const session = getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const users = getRegisteredUsers();
  return NextResponse.json({ users });
}
