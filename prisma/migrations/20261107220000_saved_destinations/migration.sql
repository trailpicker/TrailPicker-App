-- Destination bookmarks linked to users; catalog IDs are not SQL foreign keys.
CREATE TABLE "SavedDestination" (
    "userId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SavedDestination_pkey" PRIMARY KEY ("userId","destinationId")
);
CREATE INDEX "SavedDestination_destinationId_idx" ON "SavedDestination"("destinationId");
ALTER TABLE "SavedDestination" ADD CONSTRAINT "SavedDestination_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
