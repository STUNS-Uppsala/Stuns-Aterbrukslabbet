import Image from "next/image";

import Bookmark from "@/public/images/bookmark.svg";
import { cn } from "@/lib/utils";

interface PostProps {
  title: string;
  description: string;
  postType: string;
  location: string;
  expirationDate: Date | null;
  creationDate: Date;
}

function CreationDateToString(creationDate: Date): string {
  const todayDate = new Date();
  const yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  let creationDateString: string;

  if (creationDate.toDateString() === todayDate.toDateString()) {
    creationDateString =
      "Idag " +
      creationDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
  } else if (creationDate.toDateString() === yesterdayDate.toDateString()) {
    creationDateString =
      "Igår " +
      creationDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
  } else {
    creationDateString = creationDate.toLocaleDateString();
  }
  return creationDateString;
}

export default function Post({
  title,
  description,
  postType,
  location,
  expirationDate,
  creationDate,
}: PostProps) {
  let expirationDateElement;
  let postTypeColor;
  let creationDateString = CreationDateToString(creationDate);

  if (expirationDate) {
    expirationDateElement = (
      <>
        <p>Hämta senast </p>
        <p>{expirationDate.toLocaleDateString()}</p>
      </>
    );
  }

  if (postType === "Erbjuds") {
    postTypeColor = "bg-offerColor";
  }
  if (postType === "Efterfrågas") {
    postTypeColor = "bg-requestColor";
  }

  return (
    <div className="flex justify-center">
      <div className="group flex mx-2 md:py-4 md:pr-4 py-2 pr-2 bg-secondary md:max-w-screen-md max-w-[360px] rounded-xl">
        <div
          className={cn(
            "md:group-hover:min-w-3 md:group-hover:mr-1 md:mr-2 md:min-w-2 min-w-1 mr-1 rounded-e-md",
            postTypeColor
          )}
        ></div>
        <div className="flex">
          <section className="basis-4/12">
            {/* Post image should replace the div below */}
            <div className="aspect-[4/3] w-full bg-primary rounded-md"></div>
          </section>
          <section className="flex flex-col basis-5/12 md:pl-4 pl-2">
            <div className="grow">
              <h3 className="md:text-2xl text-sm line-clamp-1 pb-1">{title}</h3>
              <p className="md:text-base text-[10px] md:line-clamp-3 line-clamp-2">
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
              <p className="md:text-sm text-[8px] line-clamp-1">{location}</p>
            </div>
          </section>
          <section className="flex md:flex-col flex-col-reverse basis-3/12">
            <div className="flex md:flex-col flex-col-reverse md:grow">
              <p className="md:text-base text-[9px] text-end md:pb-2 pt-1">
                {creationDateString}
              </p>
              <div className="md:text-base text-[9px] text-end text-red-500">
                {expirationDateElement}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
