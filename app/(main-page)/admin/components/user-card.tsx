import { checkRole } from "@/utils/roles";
import DeleteUserButton from "@/components/delete-user-button";
import GetUserEmail from "@/utils/get-user-email";
import { Roles } from "@/types/globals";
import { User } from "@clerk/nextjs/server";

import ChangeRoleButton from "./change-role-button";

interface UserCardProps {
  user: User;
  usersRole: Roles;
}

export default function UserCard({ user, usersRole }: UserCardProps) {
  let adminOnlyContent;
  const userEmail = GetUserEmail({ user });

  if (usersRole === "admin") {
    adminOnlyContent = "Admin";
  } else if (usersRole === "moderator") {
    adminOnlyContent = (
      <div className="flex flex-col items-end ">
        <ChangeRoleButton id={user.id} email={userEmail} newRole={"member"} />
        <DeleteUserButton id={user.id} email={userEmail} />
      </div>
    );
  } else if (usersRole === "member") {
    adminOnlyContent = (
      <div>
        <ChangeRoleButton
          id={user.id}
          email={userEmail}
          newRole={"moderator"}
        />
      </div>
    );
  }

  return (
    <div
      key={user.id}
      className="flex justify-between p-3 md:gap-x-20 gap-x-10 bg-secondary w-full rounded-md"
    >
      <div className="flex flex-col">
        <div className="line-clamp-1">
          {user.firstName} {user.lastName}
        </div>
        <div className="break-all line-clamp-1">{userEmail}</div>
      </div>
      {usersRole === "unknown" ? (
        <div className="flex flex-col items-end min-w-fit">
          <p>
            Unknown role <q>{user.publicMetadata.role as string}</q>
          </p>
          <DeleteUserButton id={user.id} email={userEmail} />
        </div>
      ) : (
        <div className="flex flex-col items-end min-w-fit">
          {checkRole("admin") ? (
            <div>{adminOnlyContent}</div>
          ) : (
            <div className="capitalize">{usersRole}</div>
          )}
          {usersRole === "member" && (
            <DeleteUserButton id={user.id} email={userEmail} />
          )}
        </div>
      )}
    </div>
  );
}
