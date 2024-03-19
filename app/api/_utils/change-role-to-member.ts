"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface changeRoleToMemberProps {
  id: string;
}

export default async function changeRoleToMember({
  id,
}: changeRoleToMemberProps) {
  try {
    await clerkClient.users.updateUser(id, {
      publicMetadata: { role: "member" },
    });
  } catch {
    return { error: "Failed to change role" };
  }
  return { Response: 200 };
}
