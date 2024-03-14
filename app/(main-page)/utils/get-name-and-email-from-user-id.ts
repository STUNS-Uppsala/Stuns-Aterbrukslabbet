import { clerkClient } from "@clerk/nextjs";
import GetUserEmail from "@/utils/get-user-email";

export default async function GetNameAndEmailFromUserId(userId: string) {
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
