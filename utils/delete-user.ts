"use server";

import { Resend } from "resend";

import { checkRole } from "@/utils/check-role";
import { clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";

import DeletedUserEmail from "../emails/deleted-account-email";
import getUserEmail from "./get-user-email";

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
  const resend = new Resend(process.env.RESEND_API_KEY);
  const sendingMail = process.env.RESEND_SENDING_MAIL;

  if (!userEmail || !sendingMail) {
    return { error: "Kunde inte skicka mail" };
  }

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
    resend.emails.send({
      from: sendingMail,
      to: "stunsaterbrukslabbet@gmail.com",
      subject: "Ditt konto har blivit borttaget",
      text: "",
      react: DeletedUserEmail({ comment: comment }),
    });
  } catch (err) {
    return { error: "Kunde inte ta bort användare" };
  }

  return { data: userEmail, deletedPostCount: deletedPosts.count };
}
