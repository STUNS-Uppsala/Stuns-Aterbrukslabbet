import SearchBar from "@/components/search-bar";

import PostCategoryButtons from "./post-category-buttons";
import PostSortSelect from "./post-sort-select";
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
      <section className="flex justify-between w-full gap-x-2">
        <PostCategoryButtons />
        <PostSortSelect />
      </section>
    </div>
  );
}
