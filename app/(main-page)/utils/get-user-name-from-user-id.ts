import { clerkClient } from "@clerk/nextjs";

export default async function getUserNameFromUserId(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId)
    if (user) {
      const firstName = user.firstName
      const lastName = user.lastName
      if (firstName && lastName) {
        const fullName = firstName + " " + lastName;
        return fullName;
      } else {
      }
    }
  } catch (error) {
    console.error(error);
  }
  return;
}
