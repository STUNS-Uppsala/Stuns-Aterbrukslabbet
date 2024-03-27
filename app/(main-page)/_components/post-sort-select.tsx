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
import handleSearchParamsChange from "@/utils/handle-search-params-change";

export default function PostSortSelect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSortingChange(value: string) {
    let sortOrder: SortOrder = value as SortOrder;
    sortOrder = sortOrder === "desc" ? undefined : sortOrder;
    handleSearchParamsChange(
      "sort",
      sortOrder,
      pathname,
      searchParams,
      replace
    );
  }

  const currentSort = searchParams.get("sort") || "desc";

  return (
    <Select defaultValue={currentSort} onValueChange={handleSortingChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="desc">Senast</SelectItem>
        <SelectItem value="asc">Äldst</SelectItem>
      </SelectContent>
    </Select>
  );
}
