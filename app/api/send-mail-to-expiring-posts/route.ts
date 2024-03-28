import getSoonExpiringPosts from "../_utils/get-soon-expiring-posts";

export async function POST() {
  const { postsExperingInOneWeek, postsExperingTommorow, postsExperingToday } =
    await getSoonExpiringPosts();

  return Response.json({
    postsExperingInOneWeek,
    postsExperingTommorow,
    postsExperingToday,
  });
}
