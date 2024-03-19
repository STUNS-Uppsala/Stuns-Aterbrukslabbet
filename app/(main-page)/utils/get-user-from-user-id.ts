"use server";

import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

interface GetUserFromUserIdProps {
  userId: string;
}

export default async function GetUserFromUserId({
  userId,
}: GetUserFromUserIdProps) {
  const user: User = await clerkClient.users.getUser(userId);
  if (user) {
    const userRole = user.publicMetadata.role;
    return userRole as string;
  }
  return "";
}
