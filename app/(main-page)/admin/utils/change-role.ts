"use server";

import { checkRole } from "@/utils/check-role";
import { clerkClient } from "@clerk/nextjs/server";
import getUserEmail from "@/utils/get-user-email";
import { Resend } from "resend";
import ChangeRoleEmail from "@/emails/change-role-email";
import { Roles } from "@/types/globals";

interface ChangeRoleProps {
  id: string;
  newRole: Roles;
}

export default async function changeRole({ id, newRole }: ChangeRoleProps) {
  const user = await clerkClient.users.getUser(id);
  const userEmail = getUserEmail({ user });
  const resend = new Resend(process.env.RESEND_API_KEY);
  const sendingMail = process.env.RESEND_SENDING_MAIL;

  if (!userEmail || !sendingMail) {
    return { error: "Kunde inte skicka mail" };
  }

  if (
    !checkRole("admin") ||
    user.publicMetadata.role === "admin" ||
    newRole === "admin"
  ) {
    return { error: "Obehörig" };
  }

  try {
    await clerkClient.users.updateUser(id, {
      publicMetadata: { role: newRole },
    });
    resend.emails.send({
      from: sendingMail,
      to: "stunsaterbrukslabbet@gmail.com",
      subject: "Din roll har uppdaterats",
      text: "",
      react: ChangeRoleEmail({ role: newRole }),
    });
  } catch {
    return { error: "Kunde inte ändra roll" };
  }
  return { data: userEmail };
}
