"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PostCategory } from "@/types/globals";

export default function PostCategoryButtons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handlePostCategoryChange(postCategory: PostCategory) {
    const params = new URLSearchParams(searchParams);

    params.get("page") && params.delete("page");
    postCategory
      ? params.set("category", postCategory)
      : params.delete("category");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-x-3 rounded-md">
      <div className="flex items-center bg-primary bg-opacity-40 rounded-md md:text-base text-[9px]">
        <button
          onClick={() => handlePostCategoryChange(undefined)}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 rounded-s-md md:px-3 px-[6px] md:py-[8px] py-1",
            !searchParams.get("category") && "bg-opacity-100"
          )}
        >
          Alla
        </button>
        <div className="md:hidden w-[1px] h-5/6 bg-black bg-opacity-20"></div>
        <button
          onClick={() => handlePostCategoryChange("Förbrukningsvara")}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 md:px-3 px-[6px] md:py-[8px] py-1",
            searchParams.get("category") === "Förbrukningsvara" &&
              "bg-opacity-100"
          )}
        >
          Förbrukningsvara
        </button>
        <div className="md:hidden w-[1px] h-5/6 bg-black bg-opacity-20"></div>
        <button
          onClick={() => handlePostCategoryChange("Instrument/Maskin")}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 md:px-3 px-[6px] md:py-[8px] py-1",
            searchParams.get("category") === "Instrument/Maskin" &&
              "bg-opacity-100"
          )}
        >
          Instrument/Maskin
        </button>
        <div className="md:hidden w-[1px] h-5/6 bg-black bg-opacity-20"></div>
        <button
          onClick={() => handlePostCategoryChange("Inventarie")}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 rounded-e-md md:px-3 px-[6px] md:py-[8px] py-1",
            searchParams.get("category") === "Inventarie" && "bg-opacity-100"
          )}
        >
          Inventarie
        </button>
      </div>
    </div>
  );
}
