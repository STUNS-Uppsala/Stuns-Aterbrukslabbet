"use client";

import { Post } from "@prisma/client";
import { cn } from "@/lib/utils";
import { ArrowLeft, Bookmark, MapPin, User } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PostProps {
  post: Post;
  creationDateString: string;
  expirationDateText: string;
  postTypeColor: string;
  disclaimerText: string
  userName: string;
  email: string;
}

export default function Post({
  post,
  creationDateString,
  expirationDateText,
  postTypeColor,
  disclaimerText,
  userName,
  email,
}: PostProps) {
  return (
    <div className="mt-5 md:mb-10 mb-6 pt-3 md:pb-10 pb-4 md:max-w-screen-md max-w-[360px] bg-secondary rounded-2xl mx-auto">
      <div className="w-3 md:ml-7 ml-4 md:mb-0 mb-2">
        <Link href="/">
          <ArrowLeft width={30} />
        </Link>
      </div>
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
              className={cn("h-5 w-5 rounded-[50%] bg-primary", postTypeColor)}
            />
            {post.postType}
          </div>
          {post.hasCustomExpirationDate && (
            <div className="text-red-500 text-end">
              <p>{expirationDateText}</p>
              <p>{post.expiresAt.toLocaleDateString("sv-SE")}</p>
            </div>
          )}
        </div>
        <h1 className="md:text-3xl text-2xl">{post.title}</h1>
        <p className="text-sm md:pt-2">{post.description}</p>
        <div className="flex items-center mt-4">
          <User size={20} />
          <p className="text-lg">{userName}</p>
        </div>
        <div className="flex pt-1 justify-between items-center">
          <Dialog>
            <DialogTrigger>
              <div className="flex md:h-10 md:w-40 h-8 w-32 md:text-xl text-base rounded-lg bg-primary justify-center items-center">
                Kontakta mig
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex justify-center items-center">
                  <User size={20} />
                  <p className="text-lg">{userName}</p>
                </div>
                <p className="flex justify-center">
                  <span>
                    Email:{" "}
                    <a
                      className="hover:underline text-blue-600"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  </span>
                </p>
                <p className="pt-6 text-center font-semibold">
                  {disclaimerText}
                </p>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Bookmark size={30} />
        </div>
      </div>
    </div>
  );
}
