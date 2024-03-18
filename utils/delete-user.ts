"use server";

import { checkRole } from "@/utils/check-role";
import { clerkClient } from "@clerk/nextjs";

import getUserEmail from "./get-user-email";
import deletePostsByUser from "./delete-posts-by-user";

interface DeleteUserPops {
  id: string;
}

export default async function deleteUser({ id }: DeleteUserPops) {
  let user;
  try {
    user = await clerkClient.users.getUser(id);
  } catch (err) {
    return { error: err as string};
  }

  try {
    deletePostsByUser({userId: id});
  } catch {
    return { error: "Kunde inte ta bort användarens inlägg"};
  }

  if (
    (!checkRole("admin") && !checkRole("moderator")) ||
    user.publicMetadata.role === "admin" ||
    (user.publicMetadata.role === "moderator" && checkRole("moderator"))
  ) {
    return { error: "Obehörig" };
  }

  let affectedUser;

  try {
    affectedUser = await clerkClient.users.deleteUser(id);
  } catch (err) {
    return { error: "Kunde inte ta bort användare" };
  }

  return { data: getUserEmail({ user }) };
}
