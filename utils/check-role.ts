import { auth } from "@clerk/nextjs";
import { Roles } from "@/types/globals";

export function checkRole(role: Roles) {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
}
