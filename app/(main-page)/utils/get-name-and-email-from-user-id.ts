import { clerkClient } from "@clerk/nextjs";
import getUserEmail from "@/utils/get-user-email";

interface GetNameAndEmailFromUserIdProps {
  userId: string;
}

export default async function getNameAndEmailFromUserId({
  userId,
}: GetNameAndEmailFromUserIdProps) {
  let returnedUser;
  try {
    returnedUser = await clerkClient.users.getUser(userId);
  } catch (error) {
    console.error(error);
  }

  const name = returnedUser
    ? returnedUser.firstName + " " + returnedUser.lastName
    : "Kunde inte hitta namn";

  const email = returnedUser
    ? getUserEmail({ user: returnedUser })
    : "Kunde inte hitta email";

  return { name, email };
}
