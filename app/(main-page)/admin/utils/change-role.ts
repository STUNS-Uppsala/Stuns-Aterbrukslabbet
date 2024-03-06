"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import GetUserEmail from "@/utils/get-user-email";

interface ChangeRoleProps {
  id: string;
  newRole: string;
}

export default async function changeRole({ id, newRole }: ChangeRoleProps) {
  if (!checkRole("admin")) {
    return { error: "Not Authorized" };
  }

  let user;

  try {
    user = await clerkClient.users.updateUser(id, {
      publicMetadata: { role: newRole },
    });
  } catch (err) {
    return { error: "Failed to change role" };
  }
  return { data: GetUserEmail({ user }) };
}
