export type AppRole =
  | "anon"
  | "member"
  | "trainer"
  | "training_manager"
  | "finance"
  | "admin";

export type AppPermission =
  | "finance:read"
  | "finance:write"
  | "training:read"
  | "training:write"
  | "donation:read"
  | "donation:write"
  | "admin:all";
