"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { source_sans_3 } from "@/app/fonts";

export default function SearchUsers() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
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
          placeholder="Sök..."
          onChange={handleSearchChange}
          defaultValue={searchParams.get("search")?.toString()}
        />
      </form>
    </div>
  );
}
