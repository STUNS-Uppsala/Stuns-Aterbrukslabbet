"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs";

import GetUserEmail from "./get-user-email";

interface DeleteUserPops {
  id: string;
}

export default async function deleteUser({ id }: DeleteUserPops) {
  if (!checkRole("admin") && !checkRole("moderator")) {
    return { error: "Not Authorized" };
  }

  let user;

  try {
    user = await clerkClient.users.deleteUser(id);
  } catch (err) {
    return { error: "Failed to delete" };
  }

  return { data: GetUserEmail({ user }) };
}
