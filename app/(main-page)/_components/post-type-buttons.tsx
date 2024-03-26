"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PostType } from "@/types/globals";

export default function PostTypeButtons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handlePostTypeChange(postType: PostType) {
    const params = new URLSearchParams(searchParams);

    params.get("page") && params.delete("page");
    postType ? params.set("type", postType) : params.delete("type");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-x-3 rounded-md">
      <div className="flex items-center bg-primary bg-opacity-40 rounded-md md:text-lg text-xs">
        <button
          onClick={() => handlePostTypeChange(undefined)}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 rounded-s-md md:px-4 px-2 md:py-[10px] py-[6px]",
            !searchParams.get("type") && "bg-opacity-100"
          )}
        >
          Alla
        </button>
        <div className="md:hidden w-[1px] h-5/6 bg-black bg-opacity-20"></div>
        <button
          onClick={() => handlePostTypeChange("Erbjuds")}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 md:px-4 px-2 md:py-[10px] py-[6px]",
            searchParams.get("type") === "Erbjuds" && "bg-opacity-100"
          )}
        >
          Erbjuds
        </button>
        <div className="md:hidden w-[1px] h-5/6 bg-black bg-opacity-20"></div>
        <button
          onClick={() => handlePostTypeChange("Efterfrågas")}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 rounded-e-md md:px-4 px-2 md:py-[10px] py-[6px]",
            searchParams.get("type") === "Efterfrågas" && "bg-opacity-100"
          )}
        >
          Efterfrågas
        </button>
      </div>
    </div>
  );
}
