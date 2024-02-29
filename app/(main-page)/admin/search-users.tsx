"use client";

import { source_sans_3 } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export function SearchUsers() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center w-full h-auto pt-10">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
        className="lg:w-1/3"
      >
        <label
          htmlFor="search"
          className={cn(
            "text-4xl font-normal flex flex-col",
            source_sans_3.className
          )}
        >
          Sök bland användare
        </label>
        <input
          className="rounded-md bg-primary w-full h-12 p-3 mt-3"
          id="search"
          name="search"
          type="text"
          placeholder="Sök..."
        />
      </form>
    </div>
  );
}
