"use server";

import { db } from "@/lib/db";

interface DeleteUsersPostsProps {
  deletedUsersId: string;
}

export default async function deleteUsersPosts({
  deletedUsersId,
}: DeleteUsersPostsProps) {
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
