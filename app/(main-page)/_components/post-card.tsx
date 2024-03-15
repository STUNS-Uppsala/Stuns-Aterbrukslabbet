import Link from "next/link";

import { cn } from "@/lib/utils";

import creationDateToString from "../utils/creation-date-to-string";
import getPostColorAndExpirationText from "../utils/get-post-type-specific-data";

interface PostProps {
  title: string;
  postId: number;
  description: string | null;
  postType: string;
  location: string;
  expirationDate: Date;
  creationDate: Date;
  hasCustomExpirationDate: boolean;
}

export default function PostCard({
  title,
  postId,
  description,
  postType,
  location,
  expirationDate,
  creationDate,
  hasCustomExpirationDate,
}: PostProps) {
  let creationDateString = creationDateToString(creationDate);
  const { postTypeColor, expirationDateText } = getPostColorAndExpirationText({
    postType,
  });

  return (
    <Link href={`/post/${postId}`}>
      <div className="flex md:py-4 md:pr-4 py-2 pr-2 bg-secondary w-full rounded-xl">
        <div
          className={cn(
            "md:mr-2 md:min-w-2 min-w-1 mr-1 rounded-e-md",
            postTypeColor
          )}
        />
        <div className="grid grid-cols-12 w-full">
          <section className="col-span-4">
            {/* Post image should replace the div below */}
            <div className="aspect-[4/3] w-full bg-primary rounded-md" />
          </section>
          <section className="flex flex-col col-span-5 md:pl-4 pl-2">
            <div className="grow">
              <h3 className="md:text-2xl text-sm line-clamp-1 pb-1 break-all">
                {title}
              </h3>
              <p className="md:text-base text-[10px] md:line-clamp-3 line-clamp-2 break-words">
                {description}
              </p>
            </div>
            <div className="md:pt-0 pt-1">
              <div className="flex items-center gap-1">
                <div
                  className={cn(
                    "md:h-3 md:w-3 h-2 w-2 rounded-[50%]",
                    postTypeColor
                  )}
                ></div>
                <p className="md:text-sm text-[9px]">{postType}</p>
              </div>
              <p className="md:text-sm text-[8px] line-clamp-1 break-all">
                {location}
              </p>
            </div>
          </section>
          <section className="flex md:flex-col pl-2 flex-col-reverse col-span-3">
            <div className="flex md:flex-col flex-col-reverse md:grow">
              <p className="md:text-base text-[9px] text-end md:pb-2 pt-1">
                {creationDateString}
              </p>
              {hasCustomExpirationDate && (
                <div className="md:text-base text-[9px] text-end text-red-500">
                  <p>{expirationDateText}</p>
                  <p>{expirationDate.toLocaleDateString("sv-SE")}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Link>
  );
}
