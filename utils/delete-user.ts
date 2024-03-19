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
  } catch {
    return { error: "Kunde inte hämta användare"};
  }  

  if (
    (!checkRole("admin") && !checkRole("moderator")) ||
    user.publicMetadata.role === "admin" ||
    (user.publicMetadata.role === "moderator" && checkRole("moderator"))
  ) {
    return { error: "Obehörig" };
  }

  let deletedPostResult;
  try {
    deletedPostResult = await deletePostsByUser({userId: id});
  } catch {
    return { error: "Kunde inte ta bort användarens inlägg"};
  }

  let affectedUser;

  try {
    affectedUser = await clerkClient.users.deleteUser(id);
  } catch (err) {
    return { error: "Kunde inte ta bort användare" };
  }

  return { data: getUserEmail({ user }), deletedPostCount: deletedPostResult.data };
}
