"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/create-safe-action";

import { ChangeRole } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, email, role } = data;
  let user;

  try {
    user = await clerkClient.users.updateUser(id, {
      publicMetadata: { role: role },
    });
  } catch (err) {
    return { error: "Failed to change role" };
  }
  return { data: email };
};

export const changeRole = createSafeAction(ChangeRole, handler);
