import { cookies } from "next/headers";

// ─── Types ────────────────────────────────────────────────
export type UserRole = "admin" | "user";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
};

export type SessionPayload = {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
};

// ─── Hardcoded users (temporary) ──────────────────────────
const USERS: (User & { password: string })[] = [
  {
    id: "admin-001",
    email: "admin@email.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "user-001",
    email: "user@email.com",
    password: "user123",
    name: "User",
    role: "user",
    createdAt: "2026-01-01T00:00:00Z",
  },
];

// In-memory registered users (lost on server restart — temporary)
const registeredUsers: (User & { password: string })[] = [];

function getAllUsers() {
  return [...USERS, ...registeredUsers];
}

// ─── Auth functions ───────────────────────────────────────
export function authenticate(email: string, password: string): User | null {
  const user = getAllUsers().find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function registerUser(
  email: string,
  password: string,
  name: string
): { user?: User; error?: string } {
  if (getAllUsers().find((u) => u.email === email)) {
    return { error: "Email already registered" };
  }
  const newUser: User & { password: string } = {
    id: `user-${Date.now()}`,
    email,
    password,
    name,
    role: "user",
    createdAt: new Date().toISOString(),
  };
  registeredUsers.push(newUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw2, ...userWithoutPassword } = newUser;
  return { user: userWithoutPassword };
}

export function getRegisteredUsers(): User[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllUsers().map(({ password: _p, ...u }) => u);
}

// ─── Session (cookie-based) ──────────────────────────────
const SESSION_COOKIE = "anera-session";

function encode(payload: SessionPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

function decode(token: string): SessionPayload | null {
  try {
    return JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export function createSession(user: User) {
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, encode(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export function getSession(): SessionPayload | null {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decode(token);
}

export function destroySession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE);
}
