import { db } from "@/lib/db";
import { Post } from "@prisma/client";

interface AddAndGetFromSoonExpieringPostsProps {
  post: Post;
}

export default async function addAndGetFromSoonExpieringPosts({
  post,
}: AddAndGetFromSoonExpieringPostsProps) {
  const alreadyExists = await db.soonExpiringPosts.findFirst({
    where: {
      postId: post.id,
    },
  });

  if (alreadyExists) {
    return alreadyExists.postLink;
  }

  const postLink = makeRandomLink(20);
  await db.soonExpiringPosts.create({
    data: {
      postId: post.id,
      postLink,
    },
  });
  return postLink;
}

function makeRandomLink(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
