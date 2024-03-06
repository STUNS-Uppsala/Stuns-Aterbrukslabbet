"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import GetUserEmail from "@/utils/get-user-email";

interface ChangeRoleProps {
  id: string;
  newRole: string;
}

export default async function changeRole({ id, newRole }: ChangeRoleProps) {
  const user = await clerkClient.users.getUser(id);

  if (
    !checkRole("admin") ||
    user.publicMetadata.role === "admin" ||
    newRole === "admin"
  ) {
    return { error: "Obehörig" };
  }

  let affectedUser;

  try {
    affectedUser = await clerkClient.users.updateUser(id, {
      publicMetadata: { role: newRole },
    });
  } catch (err) {
    return { error: "Kunde inte ändra roll" };
  }
  return { data: GetUserEmail({ user: affectedUser }) };
}
