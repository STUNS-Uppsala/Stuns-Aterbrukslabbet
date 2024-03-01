"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { source_sans_3 } from "@/app/fonts";

export function SearchUsers() {
  const router = useRouter();
  const pathname = usePathname();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    router.push(pathname + "?search=" + search);
  }

  return (
    <div className="flex items-center justify-center w-full h-auto pt-10">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
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
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
}
