"use server";

import { checkRole } from "@/utils/check-role";
import { db } from "@/lib/db";

interface DeletePostProps {
  postId: number;
}

export default async function deletePost({ postId }: DeletePostProps) {
  if (!checkRole("admin") && !checkRole("moderator")) {
    return { error: "Obehörig" };
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
