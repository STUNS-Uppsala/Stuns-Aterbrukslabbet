import { db } from "@/lib/db";
import { Post } from "@prisma/client";
import { PostCategory, PostType } from "@/types/globals";

interface getPostFromDbProps {
  type: PostType;
  category: PostCategory;
  searchParams?: string;
  page?: number;
  sort: "asc" | "desc";
}

export default async function getPostFromDb({
  type,
  category,
  searchParams,
  page,
  sort,
}: getPostFromDbProps): Promise<Post[]> {
  const postsPerPage = 10;
  try {
    const result = await db.post.findMany({
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
    return result;
  } catch (error) {
    console.error(error);
  }
  return [];
}
