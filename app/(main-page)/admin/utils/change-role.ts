"use server";

import ChangeRoleEmail from "@/emails/change-role-email";
import { checkRole } from "@/utils/check-role";
import { clerkClient } from "@clerk/nextjs/server";
import getUserEmail from "@/utils/get-user-email";
import { Roles } from "@/types/globals";
import sendMail from "@/utils/send-mail";

interface ChangeRoleProps {
  id: string;
  newRole: Roles;
}

export default async function changeRole({ id, newRole }: ChangeRoleProps) {
  const user = await clerkClient.users.getUser(id);
  const userEmail = getUserEmail({ user });

  if (
    !checkRole("admin") ||
    user.publicMetadata.role === "admin" ||
    newRole === "admin"
  ) {
    return { error: "Obehörig" };
  }

  try {
    sendMail({
      toMail: userEmail,
      subject: "Din roll har uppdaterats",
      mailTemplate: ChangeRoleEmail({ role: newRole }),
    });
  } catch {
    return { error: "Kunde inte skicka e-post" };
  }

  try {
    await clerkClient.users.updateUser(id, {
      publicMetadata: { role: newRole },
    });
  } catch {
    return { error: "Kunde inte ändra roll" };
  }
  return { data: userEmail };
}
