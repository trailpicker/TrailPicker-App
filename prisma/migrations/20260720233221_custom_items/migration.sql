-- DropForeignKey
ALTER TABLE "BuildItem" DROP CONSTRAINT "BuildItem_gearId_fkey";

-- AlterTable
ALTER TABLE "BuildItem" ALTER COLUMN "gearId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BuildItem" ADD CONSTRAINT "BuildItem_gearId_fkey" FOREIGN KEY ("gearId") REFERENCES "Gear"("id") ON DELETE SET NULL ON UPDATE CASCADE;
