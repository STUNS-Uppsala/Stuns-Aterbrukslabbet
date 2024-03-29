import { clerkClient } from "@clerk/nextjs";

interface GetUserRoleFromUserIdProps {
  userId: string;
}

export default async function getUserRoleFromUserId({
  userId,
}: GetUserRoleFromUserIdProps) {
  try {
    const user = await clerkClient.users.getUser(userId);
    const userRole = user.publicMetadata.role;
    return userRole as string;
  } catch (err) {
    return err as string;
  }
}
