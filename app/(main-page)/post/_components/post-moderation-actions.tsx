import { checkRole } from "@/utils/check-role";
import DeletePostButton from "@/components/delete-post-button";

interface PostModerationActionsProps {
  postId: number;
  postTitle: string;
  postUserRole: string;
}

export default function PostModerationActions({
  postId,
  postTitle,
  postUserRole,
}: PostModerationActionsProps) {
  if (checkRole("admin") || checkRole("moderator")) {
    return (
      <div className="flex md:text-base text-sm pt-3 gap-x-3">
        <p className="font-semibold">{postUserRole}</p>
        <DeletePostButton
          postId={postId}
          postTitle={postTitle}
          redirectPath="/"
        />
      </div>
    );
  } else {
    return;
  }
}
