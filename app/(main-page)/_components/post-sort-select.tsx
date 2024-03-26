"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type SortOrder } from "@/types/globals";

export default function PostSortSelect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSortingChange(value: string) {
    const sortOrder: SortOrder = value as SortOrder;
    const params = new URLSearchParams(searchParams);

    params.get("page") && params.delete("page");
    sortOrder && value !== "desc"
      ? params.set("sort", sortOrder)
      : params.delete("sort");

    replace(`${pathname}?${params.toString()}`);
  }

  const currentSort = searchParams.get("sort") || "desc";

  return (
    <Select defaultValue={currentSort} onValueChange={handleSortingChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="desc">Senast</SelectItem>
        <SelectItem value="asc">Äldst</SelectItem>
      </SelectContent>
    </Select>
  );
}
