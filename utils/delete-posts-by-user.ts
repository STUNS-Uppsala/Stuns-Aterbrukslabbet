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

  let deletedPostCount;
  try {
    deletedPostCount = await db.post.deleteMany({
      where: {
        userId: userId,
      },
    });
  } catch {
    return { error: "Kunde inte ta bort inlägg" };
  }
  return { data: deletedPostCount.count };
}
