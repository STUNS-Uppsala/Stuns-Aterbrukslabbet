"use client";

export default function handleSearchParamsChange(
  param: string,
  query: string | undefined,
  pathname: string,
  searchParams: URLSearchParams,
  replace: (url: string, options?: { scroll?: boolean }) => void
) {
  const params = new URLSearchParams(searchParams);

  params.get("page") && params.delete("page");
  query ? params.set(param, query) : params.delete(param);

  replace(`${pathname}?${params.toString()}`, { scroll: false });
}
