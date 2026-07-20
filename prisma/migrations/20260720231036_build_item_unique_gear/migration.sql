/*
  Warnings:

  - A unique constraint covering the columns `[buildId,gearId]` on the table `BuildItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BuildItem_buildId_gearId_key" ON "BuildItem"("buildId", "gearId");
