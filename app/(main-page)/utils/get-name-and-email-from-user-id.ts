import GetUserEmail from "@/utils/get-user-email";
import { clerkClient } from "@clerk/nextjs";

export default async function getNameAndEmailFromUserId(userId: string) {
  let returnedUser;
  try {
    returnedUser = await clerkClient.users.getUser(userId);
  } catch (error) {
    console.error(error);
  }

  const fullName = returnedUser
    ? returnedUser.firstName + " " + returnedUser.lastName
    : "Kunde inte hitta namn";

  const email = returnedUser
    ? GetUserEmail({ user: returnedUser })
    : "Kunde inte hitta email";

  return { fullName, email };
}
