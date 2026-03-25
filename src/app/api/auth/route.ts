import { NextRequest, NextResponse } from "next/server";
import { authenticate, registerUser, getSession } from "@/lib/auth";
import type { User } from "@/lib/auth";

const SESSION_COOKIE = "anera-session";

function encode(user: User): string {
  return Buffer.from(
    JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    })
  ).toString("base64");
}

function setSessionCookie(res: NextResponse, user: User) {
  res.cookies.set(SESSION_COOKIE, encode(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function POST(req: NextRequest) {
  const { action, email, password, name } = await req.json();

  switch (action) {
    case "signin": {
      const user = authenticate(email, password);
      if (!user) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
      const res = NextResponse.json({ user });
      setSessionCookie(res, user);
      return res;
    }

    case "signup": {
      if (!email || !password || !name) {
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
      }
      const result = registerUser(email, password, name);
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      const res = NextResponse.json({ user: result.user });
      setSessionCookie(res, result.user!);
      return res;
    }

    case "signout": {
      const res = NextResponse.json({ success: true });
      res.cookies.set(SESSION_COOKIE, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });
      return res;
    }

    case "me": {
      const session = getSession();
      if (!session) {
        return NextResponse.json({ user: null });
      }
      return NextResponse.json({ user: session });
    }

    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: session });
}
