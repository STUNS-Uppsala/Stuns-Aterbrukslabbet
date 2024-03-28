import { db } from "@/lib/db";

import {
  PostExpiredCustomMail,
  PostExpiredMail,
  PostExpiresInAWeekCustomMail,
  PostExpiresInAWeekMail,
  PostExpiresTommorowCustomMail,
  PostExpiresTommorowMail,
} from "@/emails/expiring-posts-emails";

import { sendMailToExpiringPosts } from "./send-mail-to-expiring-posts";

export default async function getSoonExpiringPosts() {
  const now = new Date();
  const today = new Date(now.setHours(0, 0, 0, 0));
  const tommorow = new Date(today.getTime() + 24 * 60 * 60 * 1000); // 1 day from now at 00:00
  const inSevenDays = new Date(today.getTime() + 24 * 60 * 60 * 1000 * 7); // 7 days from now at 00:00
  const inEightDays = new Date(today.getTime() + 24 * 60 * 60 * 1000 * 8); // 8 days from now at 00:00

  const posts = await db.post.findMany({
    where: {
      expiresAt: {
        gte: today,
        lte: inEightDays,
      },
    },
  });

  function dateToEpoch(date: Date) {
    return date.setHours(0, 0, 0, 0);
  }

  const postsExperingInOneWeek = posts.filter((post) => {
    return dateToEpoch(post.expiresAt) === dateToEpoch(inSevenDays);
  });
  const postsExperingTommorow = posts.filter((post) => {
    return dateToEpoch(post.expiresAt) === dateToEpoch(tommorow);
  });
  const postsExperingToday = posts.filter((post) => {
    return dateToEpoch(post.expiresAt) === dateToEpoch(today);
  });
  postsExperingInOneWeek.forEach((post) => {
    if (post.hasCustomExpirationDate) {
      sendMailToExpiringPosts({
        post,
        subject: "Ditt inlägg går ut om en vecka",
        mailTemplate: PostExpiresInAWeekCustomMail({
          postId: post.id,
          postTitle: post.title,
        }),
      });
    } else {
      sendMailToExpiringPosts({
        post,
        subject: "Ditt inlägg går ut om en vecka",
        mailTemplate: PostExpiresInAWeekMail({
          postId: post.id,
          postTitle: post.title,
        }),
      });
    }
  });

  postsExperingTommorow.forEach((post) => {
    if (post.hasCustomExpirationDate) {
      sendMailToExpiringPosts({
        post,
        subject: "Ditt inlägg går ut imorgon",
        mailTemplate: PostExpiresTommorowCustomMail({
          postId: post.id,
          postTitle: post.title,
        }),
      });
    } else {
      sendMailToExpiringPosts({
        post,
        subject: "Ditt inlägg går ut imorgon",
        mailTemplate: PostExpiresTommorowMail({
          postId: post.id,
          postTitle: post.title,
        }),
      });
    }
  });

  const postsToDelete: number[] = [];

  postsExperingToday.forEach((post) => {
    if (post.hasCustomExpirationDate) {
      sendMailToExpiringPosts({
        post,
        subject: "Ditt inlägg har tagits bort",
        mailTemplate: PostExpiredCustomMail({
          postId: post.id,
          postTitle: post.title,
        }),
      });
    } else {
      sendMailToExpiringPosts({
        post,
        subject: "Ditt inlägg har tagits bort",
        mailTemplate: PostExpiredMail({
          postId: post.id,
          postTitle: post.title,
        }),
      });
    }
    postsToDelete.push(post.id);
  });

  await db.post.deleteMany({
    where: {
      id: {
        in: postsToDelete,
      },
    },
  });

  return {
    postsExperingInOneWeek,
    postsExperingTommorow,
    postsExperingToday,
  };
}
