"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  labelText: string;
  itemsFoundText?: string;
}

export default function SearchBar({
  labelText,
  itemsFoundText,
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
        <div className="flex justify-between px-1 pb-1">
          <label htmlFor="search" className="text-xl font-medium">
            {labelText}
          </label>
          {searchParams.get("search") && itemsFoundText && (
            <p>{itemsFoundText}</p>
          )}
        </div>
        <input
          className="rounded-md bg-primary h-12 p-3"
          placeholder="Sök..."
          onChange={handleSearchChange}
          defaultValue={searchParams.get("search")?.toString()}
        />
      </form>
    </div>
  );
}
