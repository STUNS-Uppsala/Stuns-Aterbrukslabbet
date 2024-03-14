import { db } from "@/lib/db";

export default async function getPostData(postId: number) {
  try {
    const result = await db.post.findFirst({
      where: {
        id: postId,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
  return;
}
