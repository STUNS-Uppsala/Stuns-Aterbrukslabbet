import { checkRole } from "@/utils/check-role";
import DeleteUserButton from "@/components/delete-user-button";

interface ProfilePageModerationActionsProps {
  pageUserId: string;
  email: string;
  pageUserRole: string;
}

export default function ProfilePageModerationActions({
  pageUserId,
  email,
  pageUserRole,
}: ProfilePageModerationActionsProps) {
  if (checkRole("admin") || checkRole("moderator")) {
    if (pageUserRole === "admin" || pageUserRole === "moderator") {
      return (
        <div className="flex md:text-base text-sm pt-1 gap-x-3">
          <p className="font-semibold capitalize">{pageUserRole}</p>
          {checkRole("admin") && pageUserRole !== "admin" && (
            <DeleteUserButton id={pageUserId} email={email} redirectPath="/" />
          )}
        </div>
      );
    } else {
      let unknownRoleText;
      if (pageUserRole !== "medlem") {
        unknownRoleText = "Okänd roll: ";
      }
      return (
        <div className="flex md:text-base text-sm pt-1 gap-x-3">
          <p className="font-semibold">{unknownRoleText}<span className="capitalize">{pageUserRole}</span></p>
          <DeleteUserButton id={pageUserId} email={email} redirectPath="/" />
        </div>
      );
    }
  } else {
    return;
  }
}
