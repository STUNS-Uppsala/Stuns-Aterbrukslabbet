-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '6 months';

-- CreateTable
CREATE TABLE "SoonExpiringPosts" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "postLink" TEXT NOT NULL,

    CONSTRAINT "SoonExpiringPosts_pkey" PRIMARY KEY ("id")
);
