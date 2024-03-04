import { User } from "@clerk/nextjs/server";

interface UserEmailProps {
  user: User;
}

export default function GetUserEmail({ user }: UserEmailProps) {
  return user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress as string;
}
