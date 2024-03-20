"use server";

import { checkRole } from "@/utils/check-role";

import { db } from "@/lib/db";

interface DeletePostProps {
  id: number;
}

export default async function deletePost({ id }: DeletePostProps) {
  if (!checkRole("admin") && !checkRole("moderator")) {
    return { error: "Obehörig" };
  }

  try {
    await db.post.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    return { error: "Kunde inte ta bort inlägg" };
  }

  return { data: "borttagen" };
}
