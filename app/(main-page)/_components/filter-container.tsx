import SearchBar from "@/components/search-bar";

import PostCategoryButtons from "./post-category-buttons";
import PostTypeButtons from "./post-type-buttons";

interface FilterContainerProps {
  totalPostCount: number;
  postCount: number;
}

export default function FilterContainer({
  totalPostCount,
  postCount,
}: FilterContainerProps) {
  const labelText = `Sök bland ${totalPostCount} annonser`;

  return (
    <div className="flex flex-col md:gap-y-3 gap-y-2 mt-4">
      <SearchBar labelText={labelText} itemsFoundCount={postCount} />
      <PostTypeButtons />
      <PostCategoryButtons />
    </div>
  );
}
