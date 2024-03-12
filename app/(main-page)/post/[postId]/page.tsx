import { ArrowLeft, Bookmark, MapPin, User } from "lucide-react";
import getPostData from "../../utils/get-post-data";
import GetExpirationDateAndPostType from "../../utils/get-expiration-date-and-post-type";
import { cn } from "@/lib/utils";
import CreationDateToString from "../../utils/creation-date-to-string";
import getUserNameFromUserId from "../../utils/get-user-name-from-user-id";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

export default async function PostIdPage({ params }: PostIdPageProps) {
  const post = await getPostData(Number(params.postId));
  if (post) {
    let creationDateString = CreationDateToString(post.createdAt);
    let userName = getUserNameFromUserId(post.userId)
    const { postTypeColor, expirationDateElement } =
      GetExpirationDateAndPostType({
        postType: post.postType,
        expirationDate: post.expiresAt,
        hasCustomExpirationDate: post.hasCustomExpirationDate,
      });
    return (
      <div className="mt-5 md:mb-10 mb-6 pt-3 md:pb-10 pb-4 md:max-w-screen-md max-w-[360px] bg-secondary rounded-2xl mx-auto">
        <ArrowLeft size={30} className="md:ml-7 ml-4 md:mb-0 mb-2" />
        <div className="aspect-[4/3] md:mx-20 mx-6 bg-primary rounded-md" />
        <div className="flex flex-col md:mx-20 mx-6 gap-y-1">
          <div className="flex pt-4 md:text-lg text-base justify-between">
            <div className="flex gap-x-2">
              <MapPin size={20} />
              {post.location}
            </div>
            <div className="text-end text-nowrap">{creationDateString}</div>
          </div>
          <div className="flex md:text-lg text-base h-14 justify-between">
            <div className="flex gap-x-2">
              <div
                className={cn(
                  "h-5 w-5 rounded-[50%] bg-primary",
                  postTypeColor
                )}
              />
              {post.postType}
            </div>
            <div className="text-red-500 text-end">{expirationDateElement}</div>
          </div>
          <p className="md:text-3xl text-2xl">{post.title}</p>
          <p className="text-sm md:pt-2">{post.description}</p>
          <div className="flex items-center mt-4">
            <User size={20} />
            <p className="text-lg">{userName}</p>
          </div>
          <div className="flex pt-1 justify-between items-center">
            <div className="flex md:h-10 md:w-40 h-8 w-32 md:text-xl text-base rounded-lg bg-primary justify-center items-center">
              Kontakta mig
            </div>
            <Bookmark size={30} />
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Ingen post hittades</p>;
  }
}
