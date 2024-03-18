"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface checkIfRoleIsCorrectProps {
  id: string;
}

export default async function checkIfRoleIsCorrect({
  id,
}: checkIfRoleIsCorrectProps) {
  try {
    const user = await clerkClient.users.getUser(id);
    if (
      user.publicMetadata.role === "admin" ||
      user.publicMetadata.role === "moderator" ||
      user.publicMetadata.role === "member"
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return { error: "Kunde inte ändra roll" };
  }
}
