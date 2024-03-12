import { db } from "@/lib/db";
import { PostCategory, PostType } from "@/types/globals";
import { Post } from "@prisma/client";

interface getPostFromDbProps {
  category: PostCategory;
  page?: number;
  postsPerPage: number;
  searchParams?: string;
  sort: "asc" | "desc";
  type: PostType;
}

export default async function getPostFromDb({
  type,
  category,
  searchParams,
  page,
  sort,
  postsPerPage,
}: getPostFromDbProps) {
  let returnedPosts, returnedPages;

  try {
    returnedPosts = await db.post.findMany({
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
    const result = await db.post.count({
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
    returnedPages = Math.ceil(result / postsPerPage);
  } catch (error) {
    console.error(error);
  }

  const posts = returnedPosts ? returnedPosts : [];
  const pages = returnedPages ? returnedPages : 1;

  return { posts, pages };
}
