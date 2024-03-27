import { Post } from "@prisma/client";

import PostCard from "./post-card";

interface PostContainerProps {
  posts?: Post[];
}

export default async function PostContainer({ posts }: PostContainerProps) {
  return (
    <div className="flex flex-col md:gap-y-3 gap-y-2 md:mt-6 mt-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              title={post.title}
              postId={post.id}
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
        <div className="flex justify-center md:mt-12 mt-8">
          <p className="text-center bg-secondary md:text-xl text-md md:w-1/3 w-3/5 md:p-4 py-3 rounded-lg">
            Inga inlägg hittades
          </p>
        </div>
      )}
    </div>
  );
}
