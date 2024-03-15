import { clerkClient } from "@clerk/nextjs";

interface GetUserDataParams {
  currentPage?: string;
  query?: string;
  usersPerPage: number;
}

export default async function GetUserData({
  currentPage,
  query,
  usersPerPage,
}: GetUserDataParams) {
  const totalUserCount = await clerkClient.users.getCount();

  const queriedUserCount = query
    ? await clerkClient.users.getCount({ query })
    : totalUserCount;

  const usersList = query
    ? await clerkClient.users.getUserList({
        query,
        limit: usersPerPage,
        offset: (Number(currentPage) - 1) * usersPerPage,
      })
    : await clerkClient.users.getUserList({
        limit: usersPerPage,
        offset: (Number(currentPage) - 1) * usersPerPage,
      });

  return {
    usersList,
    queriedUserCount,
    totalUserCount,
  };
}
