import { checkRole } from "@/utils/check-role";
import DeletePostButton from "@/components/delete-post-button";
import DeleteUserButton from "@/components/delete-user-button";

interface ModerationActionsProps {
  postUserId: string;
  postId: number;
  postTitle: string;
  email: string;
  postUserRole: string;
}

export default function ModerationActions({
  postUserId,
  postId,
  postTitle,
  email,
  postUserRole,
}: ModerationActionsProps) {
  if (checkRole("admin") || checkRole("moderator")) {
    if (postUserRole === "admin" || postUserRole === "moderator") {
      return (
        <div className="flex md:text-base text-sm pt-3 gap-x-3">
          <p className="font-semibold">{postUserRole}</p>
          <DeletePostButton
            postId={postId}
            postTitle={postTitle}
            redirectPath="/"
          />
          {checkRole("admin") && postUserRole !== "admin" && (
            <DeleteUserButton id={postUserId} email={email} redirectPath="/" />
          )}
        </div>
      );
    } else {
      return (
        <div className="flex md:text-base text-sm pt-3 gap-x-3">
          <p className="font-semibold">{postUserRole}</p>
          <DeletePostButton
            postId={postId}
            postTitle={postTitle}
            redirectPath="/"
          />
          <DeleteUserButton id={postUserId} email={email} redirectPath="/" />
        </div>
      );
    }
  } else {
    return;
  }
}
