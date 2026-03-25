"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

type UserRole = "admin" | "user";

type AuthUser = {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
};

type AuthResult = { error?: string; role?: UserRole };

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "signin", email, password }),
      });
      const data = await res.json();
      if (data.error) return { error: data.error };
      const role = data.user.role as UserRole;
      setUser({
        userId: data.user.id,
        email: data.user.email,
        role,
        name: data.user.name,
      });
      router.refresh();
      return { role };
    },
    [router]
  );

  const signUp = useCallback(
    async (email: string, password: string, name: string): Promise<AuthResult> => {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "signup", email, password, name }),
      });
      const data = await res.json();
      if (data.error) return { error: data.error };
      const role = data.user.role as UserRole;
      setUser({
        userId: data.user.id,
        email: data.user.email,
        role,
        name: data.user.name,
      });
      router.refresh();
      return { role };
    },
    [router]
  );

  const signOut = useCallback(async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "signout" }),
    });
    setUser(null);
    router.push("/");
    router.refresh();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
