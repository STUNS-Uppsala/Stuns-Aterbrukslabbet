import { checkRole } from "@/utils/check-role";
import DeleteUserButton from "@/components/delete-user-button";

interface ProfilePageModerationActionsProps {
  PageUserId: string;
  email: string;
  pageUserRole: string;
}

export default function ProfilePageModerationActions({
  PageUserId,
  email,
  pageUserRole,
}: ProfilePageModerationActionsProps) {
  if (checkRole("admin") || checkRole("moderator")) {
    if (pageUserRole === "admin" || pageUserRole === "moderator") {
      return (
        <div className="flex md:text-base text-sm pt-1 gap-x-3">
          <p className="font-semibold">{pageUserRole}</p>
          {checkRole("admin") && pageUserRole !== "admin" && (
            <DeleteUserButton id={PageUserId} email={email} redirectPath="/" />
          )}
        </div>
      );
    } else {
      return (
        <div className="flex md:text-base text-sm pt-1 gap-x-3">
          <p className="font-semibold">{pageUserRole}</p>
          <DeleteUserButton id={PageUserId} email={email} redirectPath="/" />
        </div>
      );
    }
  } else {
    return;
  }
}
