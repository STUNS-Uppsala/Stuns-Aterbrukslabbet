import { getUserId } from "@/utils/get-user-id";
import Pagination from "@/components/pagination";

import getNameAndEmailFromUserId from "../../utils/get-name-and-email-from-user-id";
import getPostDataFromDb from "../../utils/get-post-data-from-db";
import getUserRoleFromUserId from "../../utils/get-user-role-from-user-id";
import PostContainer from "../../_components/post-container";
import ProfilePageModerationActions from "../_components/profile-page-moderation-actions";

interface ProfilePageProps {
  params: {
    userId: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const postsPerPage = 10;
  const currentUserId = getUserId();
  const pageUserRole = await getUserRoleFromUserId({ userId: params.userId });
  const { firstName, lastName, email } = await getNameAndEmailFromUserId({
    userId: params.userId,
  });

  const headerText =
    currentUserId === params.userId
      ? "Mina inlägg"
      : `${firstName} ${firstName}'s Inlägg`;

  const { postsList, queriedPostsCount } = await getPostDataFromDb({
    type: undefined,
    category: undefined,
    currentPage: Number(searchParams.page),
    postsPerPage: postsPerPage,
    sort: "desc",
    userId: params.userId,
  });

  return (
    <div className="flex flex-col md:mt-5 mt-3 md:px-5 px-2 mx-auto md:max-w-screen-md max-w-[360px]">
      <ProfilePageModerationActions
        pageUserId={params.userId}
        email={email}
        pageUserRole={pageUserRole}
      />
      <div className="flex justify-between">
        <p className="flex md:text-xl text-base">{headerText}</p>
        <p className="flex md:text-xl text-base">
          {queriedPostsCount} aktiva annonser
        </p>
      </div>
      <PostContainer posts={postsList} />
      <Pagination itemCount={queriedPostsCount} itemsPerPage={postsPerPage} />
    </div>
  );
}
