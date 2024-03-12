import Pagination from "@/components/pagination";

import FilterContainer from "./_components/filter-container";
import Intro from "./_components/intro";
import PostContainer from "./_components/post-container";
import getPostDataFromDb from "./utils/get-post-data-from-db";

interface PageProps {
  searchParams: { page?: string; search?: string };
}

export default async function MainPage({ searchParams }: PageProps) {
  const postsPerPage = 2;
  const { posts, postCount } = await getPostDataFromDb({
    type: undefined,
    category: undefined,
    sort: "desc",
    postsPerPage: postsPerPage,
    page: Number(searchParams.page),
    searchParams: searchParams.search,
  });
  return (
    <div>
      {!searchParams.page && <Intro />}
      <FilterContainer
        postCount={postCount}
        searchParam={searchParams.search}
      />
      <PostContainer posts={posts} />
      <Pagination itemCount={postCount} itemsPerPage={postsPerPage} />
    </div>
  );
}
