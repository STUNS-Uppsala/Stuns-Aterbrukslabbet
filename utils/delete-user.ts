"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs";

import GetUserEmail from "./get-user-email";

interface DeleteUserPops {
  id: string;
}

export default async function deleteUser({ id }: DeleteUserPops) {
  const user = await clerkClient.users.getUser(id);

  if (
    (!checkRole("admin") && !checkRole("moderator")) ||
    user.publicMetadata.role === "admin" ||
    (user.publicMetadata.role === "moderator" && checkRole("moderator"))
  ) {
    return { error: "Oberhörig" };
  }

  let affectedUser;

  try {
    affectedUser = await clerkClient.users.deleteUser(id);
  } catch (err) {
    return { error: "Kunde inte ta bort" };
  }

  return { data: GetUserEmail({ user: affectedUser }) };
}
