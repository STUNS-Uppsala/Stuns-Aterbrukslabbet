import Pagination from "@/components/pagination";
import getPostDataFromDb from "../../utils/get-post-data-from-db";
import PostContainer from "../../_components/post-container";
import { getUserId } from "@/utils/get-user-id";
import getNameAndEmailFromUserId from "../../utils/get-name-and-email-from-user-id";
import getUserRoleFromUserId from "../../utils/get-user-role-from-user-id";
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
  const postsPerPage = 2;
  const currentUserId = getUserId();
  const pageUserRole = await getUserRoleFromUserId({ userId: params.userId });
  const { name, email } = await getNameAndEmailFromUserId({
    userId: params.userId,
  });

  let headerText;
  let displayModeration;

  if (currentUserId === params.userId) {
    headerText = "Mina inlägg";
    displayModeration = false;
  } else {
    headerText = name + "'s Inlägg";
  }

  const { postsList, queriedPostsCount } = await getPostDataFromDb({
    type: undefined,
    category: undefined,
    currentPage: Number(searchParams.page),
    postsPerPage: postsPerPage,
    sort: "desc",
    userId: params.userId,
  });
  return (
    <div className="md:mt-5 mt-3 mx-auto md:max-w-screen-md max-w-[360px]">
      <div className="flex flex-col">
        <ProfilePageModerationActions
          PageUserId={params.userId}
          email={email}
          pageUserRole={pageUserRole}
        />
        <p className="flex md:text-xl text-base">{headerText}</p>
      </div>
      <PostContainer posts={postsList} />
      <Pagination itemCount={queriedPostsCount} itemsPerPage={postsPerPage} />
    </div>
  );
}
