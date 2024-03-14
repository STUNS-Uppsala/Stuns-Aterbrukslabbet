import Pagination from "@/components/pagination";

import FilterContainer from "./_components/filter-container";
import getPostDataFromDb from "./utils/get-post-data-from-db";
import Intro from "./_components/intro";
import PostContainer from "./_components/post-container";
import { PostType } from "@/types/globals";

interface PageProps {
  searchParams: { type?: PostType; page?: string; search?: string };
}

export default async function MainPage({ searchParams }: PageProps) {
  const postsPerPage = 2;
  const { postsList, queriedPostsCount, totalPostCount } =
    await getPostDataFromDb({
      type: searchParams.type,
      category: undefined,
      sort: "desc",
      postsPerPage: postsPerPage,
      currentPage: Number(searchParams.page),
      searchParams: searchParams.search,
    });
  return (
    <div>
      {!searchParams.page && <Intro />}
      <FilterContainer
        totalPostCount={totalPostCount}
        postCount={queriedPostsCount}
      />
      <PostContainer posts={postsList} />
      <Pagination itemCount={queriedPostsCount} itemsPerPage={postsPerPage} />
    </div>
  );
}
