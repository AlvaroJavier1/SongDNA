-- CreateEnum
CREATE TYPE "ConnectionType" AS ENUM ('SAMPLE', 'INTERPOLATION', 'COVER', 'REMIX');

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "year" INTEGER,
    "genre" TEXT,
    "coverUrl" TEXT,
    "spotifyId" TEXT,
    "youtubeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "type" "ConnectionType" NOT NULL,
    "description" TEXT,
    "timestampSource" INTEGER,
    "timestampDerivative" INTEGER,
    "sourceSongId" TEXT NOT NULL,
    "derivativeSongId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Song_title_idx" ON "Song"("title");

-- CreateIndex
CREATE INDEX "Song_artist_idx" ON "Song"("artist");

-- CreateIndex
CREATE INDEX "Connection_sourceSongId_idx" ON "Connection"("sourceSongId");

-- CreateIndex
CREATE INDEX "Connection_derivativeSongId_idx" ON "Connection"("derivativeSongId");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_sourceSongId_derivativeSongId_type_key" ON "Connection"("sourceSongId", "derivativeSongId", "type");

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_sourceSongId_fkey" FOREIGN KEY ("sourceSongId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_derivativeSongId_fkey" FOREIGN KEY ("derivativeSongId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
