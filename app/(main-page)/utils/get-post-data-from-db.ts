import { db } from "@/lib/db";
import { PostCategory, PostType } from "@/types/globals";

interface GetPostDataFromDbProps {
  category: PostCategory;
  page?: number;
  postsPerPage: number;
  searchParams?: string;
  sort: "asc" | "desc";
  type: PostType;
}

export default async function GetPostDataFromDb({
  type,
  category,
  searchParams,
  page,
  sort,
  postsPerPage,
}: GetPostDataFromDbProps) {
  let posts, postCount;

  try {
    posts = await db.post.findMany({
      skip: page ? (page - 1) * postsPerPage : 0,
      take: postsPerPage,
      where: {
        postType: type,
        title: {
          contains: searchParams,
          mode: "insensitive",
        },
        category: {
          equals: category,
        },
      },
      orderBy: {
        createdAt: sort,
      },
    });
  } catch (error) {
    console.error(error);
  }

  try {
    postCount = await db.post.count({
      where: {
        postType: type,
        title: {
          contains: searchParams,
          mode: "insensitive",
        },
        category: {
          equals: category,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }


  return { posts, postCount };
}
