import SearchBar from "@/components/search-bar";

interface FilterContainerProps {
  postCount?: number;
  searchParam?: string;
}

export default function FilterContainer({
  postCount,
  searchParam,
}: FilterContainerProps) {
  let searchHeader;
  if (postCount && searchParam) {
    searchHeader = <p>{postCount} inlägg hittade</p>;
  } else if (postCount && !searchParam) {
    searchHeader = <p>Sök bland {postCount} olika annonser</p>;
  } else if (!postCount) {
    searchHeader = <p>{postCount} inlägg hittades</p>;
  } else {
    searchHeader = <p>Något gick fel</p>;
  }
  return (
    <div className="md:px-5 px-2 mx-auto md:max-w-screen-md max-w-[360px]">
      <div className="pl-2 text-lg">{searchHeader}</div>
      <SearchBar />
    </div>
  );
}
