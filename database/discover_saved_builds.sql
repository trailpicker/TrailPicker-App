-- Bookmarks only. Discover never exposes unpublished builds.
CREATE TABLE "SavedBuild" (
    "userId" TEXT NOT NULL,
    "buildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SavedBuild_pkey" PRIMARY KEY ("userId","buildId")
);

CREATE INDEX "SavedBuild_buildId_idx" ON "SavedBuild"("buildId");
ALTER TABLE "SavedBuild" ADD CONSTRAINT "SavedBuild_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SavedBuild" ADD CONSTRAINT "SavedBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "Build_isPublic_createdAt_idx" ON "Build"("isPublic", "createdAt");
CREATE INDEX "Build_isPublic_updatedAt_idx" ON "Build"("isPublic", "updatedAt");
