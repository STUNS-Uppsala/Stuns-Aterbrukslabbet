"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { ChangeRole } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  if (!checkRole("admin")) {
    return { error: "Not Authorized" };
  }

  const { id, email, role } = data;
  let user;

  try {
    user = await clerkClient.users.updateUser(id, {
      publicMetadata: { role: role },
    });
  } catch (err) {
    return { error: "Failed to delete" };
  }
  return { data: email };
};

export const changeRole = createSafeAction(ChangeRole, handler);
