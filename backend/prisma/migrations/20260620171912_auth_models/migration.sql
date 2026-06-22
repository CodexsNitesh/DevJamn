/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,name]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_workspaceId_name_key" ON "Channel"("workspaceId", "name");

-- CreateIndex
CREATE INDEX "OTP_email_idx" ON "OTP"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
