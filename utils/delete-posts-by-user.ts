"use server";

import { checkRole } from "@/utils/check-role";

import { db } from "@/lib/db";

interface deletePostsByUserPops {
  userId: string;
}

export default async function deletePostsByUser({
  userId,
}: deletePostsByUserPops) {
  if (!checkRole("admin") && !checkRole("moderator")) {
    return { error: "Obehörig" };
  }

  try {
    await db.post.deleteMany({
      where: {
        userId: userId,
      },
    });
  } catch (err) {
    return { error: "Kunde inte ta bort inlägg" };
  }
  return ;
}
