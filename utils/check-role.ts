import { auth } from "@clerk/nextjs";
import { Roles } from "@/types/globals";

  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
}
