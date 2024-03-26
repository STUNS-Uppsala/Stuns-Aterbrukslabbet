import { checkRole } from "@/utils/check-role";
import DeleteUserButton from "@/components/delete-user-button";
import getUserEmail from "@/utils/get-user-email";
import { User } from "@clerk/nextjs/server";

import ChangeRoleButton from "./change-role-button";

interface UserCardActionsProps {
  user: User;
}

export default function UserCardActions({ user }: UserCardActionsProps) {
  const userEmail = getUserEmail({ user });

  if (user.publicMetadata.role === "admin") {
    return "Admin";
  } else if (user.publicMetadata.role === "moderator") {
    if (checkRole("admin")) {
      return (
        <>
          <ChangeRoleButton id={user.id} email={userEmail} newRole={"medlem"} />
          <DeleteUserButton id={user.id} email={userEmail} />
        </>
      );
    } else {
      return "Moderator";
    }
  } else if (user.publicMetadata.role === "medlem") {
    if (checkRole("admin")) {
      return (
        <>
          <ChangeRoleButton
            id={user.id}
            email={userEmail}
            newRole={"moderator"}
          />
          <DeleteUserButton id={user.id} email={userEmail} />
        </>
      );
    } else {
      return (
        <>
          Medlem
          <DeleteUserButton id={user.id} email={userEmail} />
        </>
      );
    }
  } else {
    return (
      <>
        <p>
          Okänd roll: <span className="capitalize">{user.publicMetadata.role as string}</span>
        </p>
        <DeleteUserButton id={user.id} email={userEmail} />
      </>
    );
  }
}
