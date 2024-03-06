export {};

export type Roles = "admin" | "moderator" | "member";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
