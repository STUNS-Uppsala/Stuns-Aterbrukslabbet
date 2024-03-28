import { clerkClient } from "@clerk/nextjs";
import getUserEmail from "@/utils/get-user-email";
import { type Post } from "@prisma/client";
import sendMail from "@/utils/send-mail";

interface SendMailToExpiringPostsProps {
  post: Post;
  subject: string;
  mailTemplate: React.ReactNode;
}

export async function sendMailToExpiringPosts({
  post,
  subject,
  mailTemplate,
}: SendMailToExpiringPostsProps) {
  const postUser = await clerkClient.users.getUser(post.userId);
  const userEmail = getUserEmail({ user: postUser });

  sendMail({
    toMail: userEmail,
    subject,
    mailTemplate,
  });
}
