import { Clock, MapPin, User } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";

import creationDateToString from "../../utils/creation-date-to-string";
import ContactMeDialog from "./contact-me-dialog";
import getNameAndEmailFromUserId from "../../utils/get-name-and-email-from-user-id";
import getPostTypeSpecificData from "../../utils/get-post-type-specific-data";
import getUserRoleFromUserId from "../../utils/get-user-role-from-user-id";
import PostModerationActions from "./post-moderation-actions";

interface PostProps {
  post: Post;
}

export default async function Post({ post }: PostProps) {
  const creationDateString = creationDateToString(post.createdAt);
  const { postTypeColor, expirationDateText, disclaimerText } =
    getPostTypeSpecificData({
      postType: post.postType,
    });
  const { name, email } = await getNameAndEmailFromUserId({ userId: post.userId });
  const postUserRole = await getUserRoleFromUserId({ userId: post.userId });
  return (
    <article className="mt-5 md:pt-10 pt-3 md:px-16 px-6 md:pb-6 pb-4 md:max-w-screen-md max-w-[360px] bg-secondary rounded-2xl mx-auto">
      {/* Post image should replace the div below */}
      <div className="aspect-[4/3] md:mt-0 mt-2 md:mx-10 bg-primary rounded-md" />
      <div className="w-full flex flex-col gap-y-1">
        <div className="flex pt-2 md:text-base text-xs justify-between">
          <section className="flex gap-x-1 items-center">
            <MapPin className="md:block hidden shrink-0" size={16} />
            <MapPin className="md:hidden block shrink-0" size={12} />
            {post.location}
          </section>
          <section className="flex text-end gap-x-1 text-nowrap items-center">
            <Clock className="md:block hidden" size={16} />
            <Clock className="md:hidden block" size={12} />
            {creationDateString}
          </section>
        </div>
        <div className="flex md:text-base text-xs md:h-14 h-10 justify-between">
          <section className="flex gap-x-1 h-1/2 items-center">
            <div
              className={cn(
                "md:h-4 md:w-4 h-3 w-3 rounded-[50%]",
                postTypeColor
              )}
            />
            {post.postType}
          </section>
          {post.hasCustomExpirationDate && (
            <section className="text-red-500 text-end">
              <p>{expirationDateText}</p>
              <p>{post.expiresAt.toLocaleDateString("sv-SE")}</p>
            </section>
          )}
        </div>
        <h1 className="w-full md:text-3xl text-2xl break-words">
          {post.title}
        </h1>
        <p className="w-full md:text-base text-xs md:pt-2 break-words">
          {post.description}
        </p>
        <Link href={`/profile/${post.userId}`} className="flex w-fit items-center mt-4 hover:opacity-70">
          <User className="md:block hidden" size={18} />
          <User className="md:hidden block" size={12} />
          <p className="md:text-xl text-sm pl-1">{name}</p>
        </Link>
        <div className="flex justify-between items-center">
          <ContactMeDialog
            name={name}
            email={email}
            disclaimerText={disclaimerText}
          />
        </div>
        <PostModerationActions
          postId={post.id}
          postTitle={post.title}
          postUserRole={postUserRole}
        />
      </div>
    </article>
  );
}
