/*
  Warnings:

  - You are about to drop the column `pulic` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Blog" DROP COLUMN "pulic",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
