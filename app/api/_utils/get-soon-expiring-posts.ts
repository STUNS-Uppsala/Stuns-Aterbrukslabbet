import { db } from "@/lib/db";

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
  return {
    postsExperingInOneWeek,
    postsExperingTommorow,
    postsExperingToday,
  };
}
