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

export default async function ModerationActions({
  postUserId,
  postId,
  postTitle,
  email,
  postUserRole,
}: ModerationActionsProps) {
  let moderationActions;
  if (postUserRole) {
    if (checkRole("admin") || checkRole("moderator")) {
      if (postUserRole === "admin") {
        moderationActions = (
          <>
            <DeletePostButton
              id={postId}
              postTitle={postTitle}
              redirectPath="/"
            />
            <p>Admin</p>
          </>
        );
      } else if (postUserRole === "moderator" && checkRole("admin")) {
        moderationActions = (
          <>
            <DeletePostButton
              id={postId}
              postTitle={postTitle}
              redirectPath="/"
            />
            <DeleteUserButton id={postUserId} email={email} redirectPath="/" />
          </>
        );
      } else if (postUserRole === "moderator" && checkRole("moderator")) {
        moderationActions = (
          <>
            <DeletePostButton
              id={postId}
              postTitle={postTitle}
              redirectPath="/"
            />
            <p>Moderator</p>
          </>
        );
      } else {
        moderationActions = (
          <>
            <DeletePostButton
              id={postId}
              postTitle={postTitle}
              redirectPath="/"
            />
            <DeleteUserButton id={postUserId} email={email} redirectPath="/" />
          </>
        );
      }
    } else {
      moderationActions = <></>;
    }
    return moderationActions;
  }
}
