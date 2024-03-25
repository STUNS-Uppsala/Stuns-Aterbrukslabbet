"use server";

import { checkRole } from "@/utils/check-role";
import { clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";

import DeleteUserEmail from "../emails/deleted-user-email";
import getUserEmail from "./get-user-email";
import sendMail from "./send-mail";

interface DeleteUserProps {
  id: string;
  comment: string;
}

export default async function deleteUser({ id, comment }: DeleteUserProps) {
  let user;
  try {
    user = await clerkClient.users.getUser(id);
  } catch {
    return { error: "Kunde inte hämta användare" };
  }
  const userEmail = getUserEmail({ user });

  if (
    (!checkRole("admin") && !checkRole("moderator")) ||
    user.publicMetadata.role === "admin" ||
    (user.publicMetadata.role === "moderator" && checkRole("moderator"))
  ) {
    return { error: "Obehörig" };
  }

  let deletedPosts;
  try {
    deletedPosts = await db.post.deleteMany({
      where: {
        userId: id,
      },
    });
  } catch {
    return { error: "Kunde inte ta bort inlägg" };
  }

  try {
    await clerkClient.users.deleteUser(id);
    sendMail({
      toMail: userEmail,
      subject: "Ditt konto har blivit borttaget",
      mailTemplate: DeleteUserEmail({ comment: comment }),
    });
  } catch (err) {
    return { error: "Kunde inte ta bort användare" };
  }

  return { data: userEmail, deletedPostCount: deletedPosts.count };
}
