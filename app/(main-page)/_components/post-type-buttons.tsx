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
      <div className="bg-primary rounded-md bg-opacity-30 text-xl">
        <button
          onClick={() => handlePostTypeChange(undefined)}
          className={clsx(
            "rounded-s-xl px-4 py-2",
            !searchParams.get("type") && "bg-primary "
          )}
        >
          Alla
        </button>
        <button
          onClick={() => handlePostTypeChange("Erbjuds")}
          className={clsx(
            "px-4 py-2",
            searchParams.get("type") === "Erbjuds" && " bg-primary"
          )}
        >
          Erbjuds
        </button>
        <button
          onClick={() => handlePostTypeChange("Efterfrågas")}
          className={clsx(
            "rounded-e-md px-4 py-2",
            searchParams.get("type") === "Efterfrågas" && " bg-primary"
          )}
        >
          Efterfrågas
        </button>
      </div>
    </div>
  );
}
