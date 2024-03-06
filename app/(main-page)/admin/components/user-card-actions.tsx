import { checkRole } from "@/utils/roles";
import DeleteUserButton from "@/components/delete-user-button";
import GetUserEmail from "@/utils/get-user-email";
import { User } from "@clerk/nextjs/server";

import ChangeRoleButton from "./change-role-button";

interface UserCardActionsProps {
  user: User;
}

export default function UserCardActions({ user }: UserCardActionsProps) {
  const userEmail = GetUserEmail({ user });

  if (user.publicMetadata.role === "admin") {
    return "Admin";
  } else if (user.publicMetadata.role === "moderator") {
    if (checkRole("admin")) {
      return (
        <>
          <ChangeRoleButton id={user.id} email={userEmail} newRole={"member"} />
          <DeleteUserButton id={user.id} email={userEmail} />
        </>
      );
    } else {
      return "Moderator";
    }
  } else if (
    user.publicMetadata.role === "member" ||
    !user.publicMetadata.role
  ) {
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
          Member
          <DeleteUserButton id={user.id} email={userEmail} />
        </>
      );
    }
  } else {
    return (
      <>
        <p>
          Unknown role&nbsp;<q>{user.publicMetadata.role as string}</q>
        </p>
        <DeleteUserButton id={user.id} email={userEmail} />
      </>
    );
  }
}
