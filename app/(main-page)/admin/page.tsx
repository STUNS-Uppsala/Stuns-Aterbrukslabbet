import { redirect } from "next/navigation";

import { checkRole } from "@/utils/check-role";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";

import getUserData from "./utils/get-user-data";
import UserCard from "./_components/user-card";

interface AdminDashboardProps {
  searchParams: { search?: string; page?: string };
}

export default async function AdminDashboard({
  searchParams,
}: AdminDashboardProps) {
  if (!checkRole("admin") && !checkRole("moderator")) {
    redirect("/");
  }

  const query = searchParams.search;
  const page = searchParams.page;
  const usersPerPage = 10;

  const { users, userCount, totalUserCount } = await getUserData({
    page,
    query,
    usersPerPage,
  });

  const labelText = `Sök bland ${totalUserCount} användare`;
  const itemsFoundText = `${userCount} användare hittades`;

  return (
    <div className="max-w-screen-md mx-auto p-3 pt-10">
      <SearchBar labelText={labelText} itemsFoundText={itemsFoundText} />
      <div className="flex flex-col items-center mx-auto gap-y-3 pt-6">
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
      <Pagination itemCount={userCount} itemsPerPage={usersPerPage} />
    </div>
  );
}
