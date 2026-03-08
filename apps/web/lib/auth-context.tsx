"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { trpc } from "./trpc";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  subscription: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("filmhee_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    trpc.auth.me
      .query()
      .then(setUser)
      .catch(() => localStorage.removeItem("filmhee_token"))
      .finally(() => setIsLoading(false));
  }, []);

  function login(token: string, user: AuthUser) {
    localStorage.setItem("filmhee_token", token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("filmhee_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
