/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Carousel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarouselFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedbacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarouselFeedback" DROP CONSTRAINT "CarouselFeedback_carouselId_fkey";

-- DropForeignKey
ALTER TABLE "CarouselFeedback" DROP CONSTRAINT "CarouselFeedback_feedbackId_fkey";

-- DropForeignKey
ALTER TABLE "Feedbacks" DROP CONSTRAINT "Feedbacks_userId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- DropTable
DROP TABLE "Carousel";

-- DropTable
DROP TABLE "CarouselFeedback";

-- DropTable
DROP TABLE "Feedbacks";

-- DropTable
DROP TABLE "Projects";

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 4,
    "feedback" TEXT NOT NULL,
    "projectid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
