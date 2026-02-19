import type { AppRole } from "@/lib/rbac/types";

export type AuthUser = {
  id: string;
  email: string;
  role: AppRole;
};

export type AuthSession = {
  user: AuthUser | null;
  source: "anonymous" | "supabase";
};
