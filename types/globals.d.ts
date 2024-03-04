export {};

export type Roles = "admin" | "moderator" | "member" | "unknown";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
