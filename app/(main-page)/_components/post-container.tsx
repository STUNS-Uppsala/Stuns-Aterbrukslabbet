import Pagination from "@/components/pagination";

import getPostAndPages from "../utils/get-posts-and-pages";
import PostCard from "./post";

interface PostContainerProps {
  page?: number;
}

export default async function PostContainer({ page }: PostContainerProps) {
  const postsPerPage = 10;
  const { posts, pages } = await getPostAndPages({
    type: undefined,
    category: undefined,
    sort: "desc",
    postsPerPage: postsPerPage,
    page: page,
  });
  return (
    <div className="flex flex-col md:gap-y-5 gap-y-3 my-16 md:px-5 px-2 mx-auto md:max-w-screen-md max-w-[360px]">
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              postType={post.postType}
              location={post.location}
              creationDate={post.createdAt}
              expirationDate={post.expiresAt}
              hasCustomExpirationDate={post.hasCustomExpirationDate}
            />
          );
        })
      ) : (
        <div className="flex justify-center">
          <p className="text-center bg-secondary text-xl w-1/3 p-4 rounded-lg">
            Inga inlägg hittades
          </p>
        </div>
      )}
      <Pagination pages={pages} />
    </div>
  );
}
