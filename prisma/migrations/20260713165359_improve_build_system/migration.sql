-- DropForeignKey
ALTER TABLE "Build" DROP CONSTRAINT "Build_userId_fkey";

-- AlterTable
ALTER TABLE "Build" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BuildItem" ADD COLUMN     "customWeight" INTEGER,
ADD COLUMN     "gearNameSnapshot" TEXT,
ADD COLUMN     "isConsumable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isWorn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priceSnapshot" DOUBLE PRECISION,
ADD COLUMN     "weightSnapshot" INTEGER;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
