-- DropIndex
DROP INDEX "BuildItem_buildId_gearId_key";

-- AlterTable
ALTER TABLE "BuildItem" ADD COLUMN     "customCategory" TEXT;
