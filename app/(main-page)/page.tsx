import Pagination from "@/components/pagination";
import { PostType } from "@/types/globals";

import FilterContainer from "./_components/filter-container";
import getPostDataFromDb from "./utils/get-post-data-from-db";
import Intro from "./_components/intro";
import PostContainer from "./_components/post-container";
import { PostType } from "@/types/globals";

interface MainPageProps {
  searchParams: { type?: PostType; page?: string; search?: string };
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const postsPerPage = 10;
  const { postsList, queriedPostsCount, totalPostCount } =
    await getPostDataFromDb({
      type: searchParams.type,
      category: undefined,
      currentPage: Number(searchParams.page),
      searchParams: searchParams.search,
      postsPerPage: postsPerPage,
      sort: "desc",
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
