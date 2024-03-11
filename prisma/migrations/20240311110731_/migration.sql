/*
  Warnings:

  - You are about to drop the column `isCustomExpireDate` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isCustomExpireDate",
ADD COLUMN     "hasCustomExpirationDate" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '6 months';
