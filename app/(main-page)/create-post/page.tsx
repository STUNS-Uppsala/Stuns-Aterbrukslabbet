import CreatePostComponent from "./_components/create-post-component";
import { getUserId } from "@/utils/get-user-id";
import getNameAndEmailFromUserId from "../utils/get-name-and-email-from-user-id";

export default async function createPostPage() {
  const userId = getUserId();

  if (!userId) {
    return;
  }

  const { firstName, lastName, email } = await getNameAndEmailFromUserId({
    userId,
  });

  return (
    <div>
      <CreatePostComponent
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
    </div>
  );
}
