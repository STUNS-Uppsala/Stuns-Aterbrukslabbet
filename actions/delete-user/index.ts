"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteUser } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  if (!checkRole("admin") && !checkRole("moderator")) {
    return { error: "Not Authorized" };
  }

  const { id, email } = data;
  let user;

  try {
    user = await clerkClient.users.deleteUser(id);
  } catch (err) {
    return { error: "Failed to delete" };
  }
  return { data: email };
};

export const deleteUser = createSafeAction(DeleteUser, handler);
