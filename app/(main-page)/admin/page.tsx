import { redirect } from "next/navigation";

import { checkRole } from "@/utils/roles";
import Pagination from "@/components/pagination";

import getUsers from "./utils/get-users";
import SearchUsers from "./components/search-users";
import UserCard from "./components/user-card";

export default async function AdminDashboard(params: {
  searchParams: { search?: string; page?: string };
}) {
  if (!checkRole("admin") && !checkRole("moderator")) {
    redirect("/");
  }

  const query = params.searchParams.search;
  const page = params.searchParams.page;

  const usersPerPage = 10;

  const { users, pages } = await getUsers({ page, query, usersPerPage });

  return (
    <>
      <SearchUsers />
      <div className="flex flex-col items-center mx-auto pt-4 w-1/3 min-w-fit">
        {users.map((user) => {
          if (
            !user.publicMetadata.role ||
            user.publicMetadata.role === "member"
          ) {
            return <UserCard key={user.id} user={user} usersRole="member" />;
          } else if (user.publicMetadata.role === "moderator") {
            return <UserCard key={user.id} user={user} usersRole="moderator" />;
          } else if (user.publicMetadata.role === "admin") {
            return <UserCard key={user.id} user={user} usersRole="admin" />;
          } else {
            return <UserCard key={user.id} user={user} usersRole="unknown" />;
          }
        })}
      </div>
      <Pagination pages={pages} />
    </>
  );
}
