-- AlterTable
ALTER TABLE "Build" ADD COLUMN     "destinationId" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
