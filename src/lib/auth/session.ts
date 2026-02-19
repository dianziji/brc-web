import "server-only";
import type { AuthSession, AuthUser } from "@/lib/auth/types";

export async function getAuthSession(): Promise<AuthSession> {
  // Placeholder: Supabase auth integration will populate user + role here.
  return {
    user: null,
    source: "anonymous",
  };
}

export async function requireAuthUser(): Promise<AuthUser> {
  const session = await getAuthSession();
  if (!session.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
