"use client";

import { PostType } from "@/types/globals";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PostTypeButtons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handlePostTypeChange(postType: PostType) {
    const params = new URLSearchParams(searchParams);
    if (params.get("page")) {
      params.delete("page");
    }
    postType ? params.set("type", postType) : params.delete("type");

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-x-3 mt-3 rounded-md">
      <div className="bg-primary rounded-md bg-opacity-40 md:text-lg text-xs">
        <button
          onClick={() => handlePostTypeChange(undefined)}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 rounded-s-md md:px-4 md:py-[10px] px-2 py-[6px]",
            !searchParams.get("type") && "bg-opacity-100"
          )}
        >
          Alla
        </button>
        <button
          onClick={() => handlePostTypeChange("Erbjuds")}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 md:px-4 md:py-[10px] px-2 py-[6px]",
            searchParams.get("type") === "Erbjuds" && "bg-opacity-100"
          )}
        >
          Erbjuds
        </button>
        <button
          onClick={() => handlePostTypeChange("Efterfrågas")}
          className={clsx(
            "bg-primary hover:bg-opacity-100 bg-opacity-0 rounded-e-md md:px-4 md:py-[10px] px-2 py-[6px]",
            searchParams.get("type") === "Efterfrågas" && "bg-opacity-100"
          )}
        >
          Efterfrågas
        </button>
      </div>
    </div>
  );
}
