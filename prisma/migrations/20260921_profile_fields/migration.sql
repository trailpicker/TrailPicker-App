ALTER TABLE "User" ADD COLUMN "bio" TEXT;
ALTER TABLE "User" ADD COLUMN "location" TEXT;
ALTER TABLE "User" ADD COLUMN "isProfilePublic" BOOLEAN NOT NULL DEFAULT false;
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
