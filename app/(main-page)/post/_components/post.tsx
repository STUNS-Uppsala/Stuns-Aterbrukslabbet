"use client";

import { Post } from "@prisma/client";
import { cn } from "@/lib/utils";
import { ArrowLeft, Clock, MapPin, User } from "lucide-react";
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
  disclaimerText: string;
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
    <div className="my-5 pt-3 md:pb-6 pb-4 md:max-w-screen-md max-w-[360px] bg-secondary rounded-2xl mx-auto">
      <div className="w-3 md:ml-10 ml-4">
        <Link href="/">
          <ArrowLeft width={30} />
        </Link>
      </div>
      {/* Post image should replace the div below */}
      <div className="aspect-[4/3] md:mt-0 mt-2 md:mx-24 mx-6 bg-primary rounded-md"/>
      <div className="flex flex-col md:mx-16 mx-6 gap-y-1">
        <div className="flex pt-2 md:text-base text-xs justify-between">
          <div className="flex gap-x-1 items-center">
            <MapPin className="md:block hidden shrink-0" size={16} />
            <MapPin className="md:hidden block shrink-0" size={12} />
            {post.location}
          </div>
          <div className="flex text-end gap-x-1 text-nowrap items-center">
            <Clock className="md:block hidden" size={16}/>
            <Clock className="md:hidden block" size={12}/>
            {creationDateString}
          </div>
        </div>
        <div className="flex md:text-base text-xs md:h-14 h-10 justify-between">
          <div className="flex gap-x-1 h-1/2 items-center">
            <div
              className={cn(
                "md:h-4 md:w-4 h-3 w-3 rounded-[50%]",
                postTypeColor
              )}
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
        <p className="md:text-base text-xs md:pt-2">{post.description}</p>
        <div className="flex items-center mt-4">
          <User className="md:block hidden" size={18} />
          <User className="md:hidden block" size={12} />
          <p className="md:text-xl text-xs pl-1">{userName}</p>
        </div>
        <div className="flex justify-between items-center">
          <Dialog>
            <DialogTrigger>
              <div className="flex md:h-10 md:w-40 h-8 w-32 md:text-xl text-base rounded-lg bg-primary justify-center items-center">
                Kontakta mig
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <p className="flex justify-center text-base">{userName}</p>
                <a
                  className="flex justify-center hover:underline text-blue-600"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
                <p className="pt-6 text-center font-semibold">
                  {disclaimerText}
                </p>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          
        </div>
      </div>
    </div>
  );
}
