import { ROLE_PERMISSIONS } from "@/lib/rbac/matrix";
import type { AppPermission, AppRole } from "@/lib/rbac/types";

export function getRolePermissions(role: AppRole): AppPermission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(role: AppRole, permission: AppPermission): boolean {
  const permissions = getRolePermissions(role);
  return permissions.includes("admin:all") || permissions.includes(permission);
}

export function hasAnyPermission(role: AppRole, permissions: AppPermission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

export function hasAllPermissions(role: AppRole, permissions: AppPermission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}
