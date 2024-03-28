import { db } from "@/lib/db";

interface DeletePostsByIdProps {
  postsIds: number[];
}

export default async function deletePostsById({
  postsIds,
}: DeletePostsByIdProps) {
  await db.post.deleteMany({
    where: {
      id: {
        in: postsIds,
      },
    },
  });
}
