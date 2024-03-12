import { redirect } from "next/navigation";

import { checkRole } from "@/utils/check-role";
import { cn } from "@/lib/utils";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import { source_sans_3 } from "@/app/fonts";

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

  const { users, userCount } = await getUserData({ page, query, usersPerPage });

  return (
    <div className="max-w-screen-md mx-auto p-3 pt-10">
      <label
        htmlFor="search"
        className={cn(
          "md:text-4xl text-2xl font-normal",
          source_sans_3.className
        )}
      >
        Sök bland användare
      </label>
      <SearchBar />
      <div className="flex flex-col items-center mx-auto gap-y-3 pt-6">
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
      <Pagination itemCount={userCount} itemsPerPage={usersPerPage} />
    </div>
  );
}
