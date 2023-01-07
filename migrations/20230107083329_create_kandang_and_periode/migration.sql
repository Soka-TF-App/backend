/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_author_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_B_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_Post_tags";

-- CreateTable
CREATE TABLE "Kandang" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Kandang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periode" (
    "id" UUID NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "startAt" DATE NOT NULL,
    "kandang" UUID,

    CONSTRAINT "Periode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Kandang_periodes" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "Periode_kandang_idx" ON "Periode"("kandang");

-- CreateIndex
CREATE UNIQUE INDEX "_Kandang_periodes_AB_unique" ON "_Kandang_periodes"("A", "B");

-- CreateIndex
CREATE INDEX "_Kandang_periodes_B_index" ON "_Kandang_periodes"("B");

-- AddForeignKey
ALTER TABLE "Periode" ADD CONSTRAINT "Periode_kandang_fkey" FOREIGN KEY ("kandang") REFERENCES "Kandang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Kandang_periodes" ADD CONSTRAINT "_Kandang_periodes_A_fkey" FOREIGN KEY ("A") REFERENCES "Kandang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Kandang_periodes" ADD CONSTRAINT "_Kandang_periodes_B_fkey" FOREIGN KEY ("B") REFERENCES "Periode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
