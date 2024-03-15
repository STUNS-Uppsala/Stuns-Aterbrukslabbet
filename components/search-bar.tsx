"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  labelText: string;
  itemsFoundCount?: number;
}

export default function SearchBar({
  labelText,
  itemsFoundCount,
}: SearchBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    const params = new URLSearchParams(searchParams);
    const page = params.get("page");
    if (search) {
      if (page) {
        params.delete("page", page);
      }
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
        }}
        className="flex flex-col w-full"
      >
        <div className="flex items-end justify-between px-1 pb-1">
          <label htmlFor="search" className="md:text-lg text-sm font-medium">
            {labelText}
          </label>
          {searchParams.get("search") && (
            <p className="md:text-base text-xs">
              {`${itemsFoundCount} resultat`}
            </p>
          )}
        </div>
        <input
          className="rounded-md bg-primary md:h-12 h-9 md:px-3 px-2 md:text-lg text-sm"
          placeholder="Sök..."
          onChange={handleSearchChange}
          defaultValue={searchParams.get("search")?.toString()}
        />
      </form>
    </div>
  );
}
