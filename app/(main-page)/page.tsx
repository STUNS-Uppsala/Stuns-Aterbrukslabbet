import Pagination from "@/components/pagination";
import { PostType, PostCategory } from "@/types/globals";

import FilterContainer from "./_components/filter-container";
import getPostDataFromDb from "./utils/get-post-data-from-db";
import Intro from "./_components/intro";
import PostContainer from "./_components/post-container";

interface MainPageProps {
  searchParams: {
    type?: PostType;
    category?: PostCategory;
    page?: string;
    search?: string;
  };
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const postsPerPage = 10;
  const { postsList, queriedPostsCount, totalPostCount } =
    await getPostDataFromDb({
      type: searchParams.type,
      category: searchParams.category,
      currentPage: Number(searchParams.page),
      searchParams: searchParams.search,
      postsPerPage: postsPerPage,
      sort: "desc",
    });
  return (
    <div>
      {!searchParams.page && <Intro />}
      <div className="md:max-w-screen-md max-w-[360px] mx-auto md:px-5 px-2">
        <FilterContainer
          totalPostCount={totalPostCount}
          postCount={queriedPostsCount}
        />
        <PostContainer posts={postsList} />
      </div>
      <Pagination itemCount={queriedPostsCount} itemsPerPage={postsPerPage} />
    </div>
  );
}
