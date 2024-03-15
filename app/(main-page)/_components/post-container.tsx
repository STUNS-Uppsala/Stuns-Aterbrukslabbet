import { Post } from "@prisma/client";

import PostCard from "./post";

interface PostContainerProps {
  posts?: Post[];
}

export default async function PostContainer({ posts }: PostContainerProps) {
  return (
    <div className="flex flex-col md:gap-y-5 gap-y-3 my-16 md:px-5 px-2 mx-auto md:max-w-screen-md max-w-[360px]">
      {posts && posts.length > 0 ? (
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
          <p className="text-center bg-secondary md:text-xl text-md md:w-1/3 w-3/5 md:p-4 py-3 rounded-lg">
            Inga inlägg hittades
          </p>
        </div>
      )}
    </div>
  );
}
