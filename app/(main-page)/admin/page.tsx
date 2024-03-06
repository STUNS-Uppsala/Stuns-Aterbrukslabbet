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
    <div className="max-w-screen-md mx-auto p-3 pt-10">
      <SearchUsers />
      <div className="flex flex-col items-center mx-auto gap-y-3 pt-6">
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
      <Pagination pages={pages} />
    </div>
  );
}
