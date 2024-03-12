import { clerkClient } from "@clerk/nextjs";

interface GetUserDataParams {
  page?: string;
  query?: string;
  usersPerPage: number;
}

export default async function GetUserData({
  page,
  query,
  usersPerPage,
}: GetUserDataParams) {
  const userCount = query
    ? await clerkClient.users.getCount({ query })
    : await clerkClient.users.getCount();

  const users = query
    ? await clerkClient.users.getUserList({
        query,
        limit: usersPerPage,
        offset: (Number(page) - 1) * usersPerPage,
      })
    : await clerkClient.users.getUserList({
        limit: usersPerPage,
        offset: (Number(page) - 1) * usersPerPage,
      });

  return {
    users,
    userCount,
  };
}
