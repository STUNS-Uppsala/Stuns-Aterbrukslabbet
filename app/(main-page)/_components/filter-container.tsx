import SearchBar from "@/components/search-bar";

interface FilterContainerProps {
  totalPostCount: number;
  postCount: number;
}

export default function FilterContainer({
  totalPostCount,
  postCount,
}: FilterContainerProps) {
  const labelText = `Sök bland ${totalPostCount} annonser`;
  const itemsFoundText = `${postCount} inlägg hittades`;
  return (
    <div className="md:px-5 px-2 mx-auto md:max-w-screen-md max-w-[360px]">
      <SearchBar labelText={labelText} itemsFoundText={itemsFoundText} />
    </div>
  );
}
