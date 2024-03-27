"use server";

import { db } from "@/lib/db";

interface DeleteUsersPostProps {
  deletedUsersId: string;
}

export default async function deleteUserPosts({
  deletedUsersId,
}: DeleteUsersPostProps) {
  try {
    await db.post.deleteMany({
      where: {
        userId: deletedUsersId,
      },
    });
  } catch {
    return { error: "Failed to delete user's posts" };
  }
}
