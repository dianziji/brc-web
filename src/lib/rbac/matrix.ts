import type { AppPermission, AppRole } from "@/lib/rbac/types";

export const ROLE_PERMISSIONS: Record<AppRole, AppPermission[]> = {
  anon: [],
  member: ["training:read"],
  trainer: ["training:read", "training:write"],
  training_manager: ["training:read", "training:write", "donation:read"],
  finance: ["finance:read", "finance:write", "donation:read", "donation:write"],
  admin: ["admin:all"],
};
