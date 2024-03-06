import GetUserEmail from "@/utils/get-user-email";
import { User } from "@clerk/nextjs/server";

import UserCardActions from "./user-card-actions";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div
      key={user.id}
      className="flex justify-between p-3 md:gap-x-20 gap-x-10 bg-secondary w-full rounded-md"
    >
      <div className="flex flex-col gap-y-2">
        <div className="line-clamp-1">
          {user.firstName} {user.lastName}
        </div>
        <div className="break-all line-clamp-1">{GetUserEmail({ user })}</div>
      </div>
      <div className="flex flex-col gap-y-2 items-end min-w-fit">
        <UserCardActions user={user} />
      </div>
    </div>
  );
}
