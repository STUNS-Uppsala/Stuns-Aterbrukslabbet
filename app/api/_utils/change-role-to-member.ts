"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface ChangeRoleToMemberProps {
  id: string;
}

export default async function ChangeRoleToMember({
  id,
}: ChangeRoleToMemberProps) {
  try {
    await clerkClient.users.updateUser(id, {
      publicMetadata: { role: "medlem" },
    });
  } catch {
    return { error: "Failed to change role" };
  }
  return { Response: 200 };
}
