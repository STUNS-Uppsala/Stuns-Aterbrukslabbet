export {};

export type Roles = "admin" | "moderator" | "medlem";
export type PostType = undefined | "Erbjuds" | "Efterfrågas";
export type PostCategory =
  | undefined
  | "Förbrukningsvara"
  | "Instrument/Maskin"
  | "Inventarie";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
