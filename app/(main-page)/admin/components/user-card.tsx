import { checkRole } from "@/utils/roles";
import DeleteUserButton from "@/components/delete-user-button";
import { Roles } from "@/types/globals";
import { User } from "@clerk/nextjs/server";

import ChangeRoleButton from "./change-role-button";
import GetUserEmail from "@/utils/get-user-email";

interface UserCardProps {
  user: User;
  usersRole: Roles;
}

export default function UserCard({ user, usersRole }: UserCardProps) {
  let adminOnlyContent;

  if (usersRole === "admin") {
    adminOnlyContent = "Admin";
  } else if (usersRole === "moderator") {
    adminOnlyContent = (
      <div className="flex flex-col items-end ">
        <ChangeRoleButton
          id={user.id}
          email={GetUserEmail({ user })}
          role={"member"}
        />
        <DeleteUserButton id={user.id} email={GetUserEmail({ user })} />
      </div>
    );
  } else if (usersRole === "member") {
    adminOnlyContent = (
      <div>
        <ChangeRoleButton
          id={user.id}
          email={GetUserEmail({ user })}
          role={"moderator"}
        />
      </div>
    );
  }

  return (
    <div
      key={user.id}
      className="flex justify-between p-3 m-2 bg-secondary w-full rounded-md"
    >
      <div className="flex flex-col">
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div>{GetUserEmail({ user })}</div>
      </div>
      {usersRole === "unknown" ? (
        <div className="flex flex-col items-end">
          <p>
            Unknown role <q>{user.publicMetadata.role as string}</q>
          </p>
          <DeleteUserButton id={user.id} email={GetUserEmail({ user })} />
        </div>
      ) : (
        <div className="flex flex-col text-end">
          {checkRole("admin") ? (
            <div>{adminOnlyContent}</div>
          ) : (
            <div className="capitalize">{usersRole}</div>
          )}
          {usersRole === "member" && (
            <DeleteUserButton id={user.id} email={GetUserEmail({ user })} />
          )}
        </div>
      )}
    </div>
  );
}
