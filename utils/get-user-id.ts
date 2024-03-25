import { auth } from "@clerk/nextjs";

export function getUserId() {
  const { userId } = auth();

  return userId;
}
