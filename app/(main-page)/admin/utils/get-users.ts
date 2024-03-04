import { clerkClient } from "@clerk/nextjs";

interface GetUsersParams {
  page?: string;
  query?: string;
  usersPerPage: number;
}

export default async function getUsers({
  page,
  query,
  usersPerPage,
}: GetUsersParams) {
  const userCount = query
    ? await clerkClient.users.getCount({ query })
    : await clerkClient.users.getCount();

  const pages = Math.ceil(userCount / usersPerPage);

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
    pages,
  };
}
