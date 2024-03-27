"use server";

import { checkRole } from "@/utils/check-role";
import { db } from "@/lib/db";
import DeletePostEmail from "@/emails/deleted-post-email";

import sendMail from "./send-mail";

interface DeletePostProps {
  postEmail: string;
  postId: number;
  postTitle: string;
  comment: string;
}

export default async function deletePost({
  postId,
  postEmail,
  postTitle,
  comment,
}: DeletePostProps) {
  if (!checkRole("admin") && !checkRole("moderator")) {
    return { error: "Obehörig" };
  }

  try {
    sendMail({
      toMail: postEmail,
      subject: "Ditt inlägg har blivit borttaget",
      mailTemplate: DeletePostEmail({ comment: comment, title: postTitle }),
    });
  } catch {
    return { error: "Kunde inte skicka e-post" };
  }

  try {
    await db.post.delete({
      where: {
        id: postId,
      },
    });
    return { data: "borttagen" };
  } catch (err) {
    return { error: "Kunde inte ta bort inlägg" };
  }
}
