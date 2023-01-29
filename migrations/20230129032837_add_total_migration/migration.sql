-- CreateEnum
CREATE TYPE "DataDailyWaktuType" AS ENUM ('siang', 'malam');

-- CreateTable
CREATE TABLE "DataDOC" (
    "id" UUID NOT NULL,
    "periode" UUID,
    "jumlahDOC" INTEGER NOT NULL,
    "tipeDOC" TEXT NOT NULL DEFAULT '',
    "kematianDOC" INTEGER NOT NULL,
    "bobotBox" INTEGER NOT NULL,
    "kodeBox" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DataDOC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleDOC" (
    "id" UUID NOT NULL,
    "bobot" INTEGER NOT NULL,

    CONSTRAINT "SampleDOC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataWeekly" (
    "id" UUID NOT NULL,
    "periode" UUID,
    "lantai" INTEGER NOT NULL,
    "sekat" INTEGER NOT NULL,

    CONSTRAINT "DataWeekly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleWeekly" (
    "id" UUID NOT NULL,
    "periode" UUID,
    "bobot" INTEGER NOT NULL,

    CONSTRAINT "SampleWeekly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataDaily" (
    "id" UUID NOT NULL,
    "periode" UUID,
    "waktu" "DataDailyWaktuType" NOT NULL DEFAULT 'siang',
    "jumlahMati" INTEGER NOT NULL,
    "jumlahAfkir" INTEGER NOT NULL,

    CONSTRAINT "DataDaily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataPanen" (
    "id" UUID NOT NULL,
    "periode" UUID,
    "namaPelanggan" TEXT NOT NULL DEFAULT '',
    "noSPPA" TEXT NOT NULL DEFAULT '',
    "noTruck" TEXT NOT NULL DEFAULT '',
    "namaPengemudi" TEXT NOT NULL DEFAULT '',
    "jumlahAyam" INTEGER NOT NULL,
    "bobot" INTEGER NOT NULL,

    CONSTRAINT "DataPanen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataPenjarangan" (
    "id" UUID NOT NULL,
    "periode" UUID,
    "namaPelanggan" TEXT NOT NULL DEFAULT '',
    "noSPPA" TEXT NOT NULL DEFAULT '',
    "noTruck" TEXT NOT NULL DEFAULT '',
    "namaPengemudi" TEXT NOT NULL DEFAULT '',
    "jumlahAyam" INTEGER NOT NULL,
    "bobot" INTEGER NOT NULL,

    CONSTRAINT "DataPenjarangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSapronak" (
    "id" UUID NOT NULL,
    "periode" UUID,
    "jumlahPakan" INTEGER NOT NULL,
    "namaObat" TEXT NOT NULL DEFAULT '',
    "jumlahObat" INTEGER NOT NULL,
    "satuan" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DataSapronak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataNonSapronak" (
    "id" UUID NOT NULL,
    "periode" UUID,
    "jenis" TEXT NOT NULL DEFAULT '',
    "jumlah" INTEGER NOT NULL,
    "satuan" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DataNonSapronak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DataDOC_samples" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_DataWeekly_samples" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "DataDOC_periode_idx" ON "DataDOC"("periode");

-- CreateIndex
CREATE INDEX "DataWeekly_periode_idx" ON "DataWeekly"("periode");

-- CreateIndex
CREATE INDEX "SampleWeekly_periode_idx" ON "SampleWeekly"("periode");

-- CreateIndex
CREATE INDEX "DataDaily_periode_idx" ON "DataDaily"("periode");

-- CreateIndex
CREATE INDEX "DataPanen_periode_idx" ON "DataPanen"("periode");

-- CreateIndex
CREATE INDEX "DataPenjarangan_periode_idx" ON "DataPenjarangan"("periode");

-- CreateIndex
CREATE INDEX "DataSapronak_periode_idx" ON "DataSapronak"("periode");

-- CreateIndex
CREATE INDEX "DataNonSapronak_periode_idx" ON "DataNonSapronak"("periode");

-- CreateIndex
CREATE UNIQUE INDEX "_DataDOC_samples_AB_unique" ON "_DataDOC_samples"("A", "B");

-- CreateIndex
CREATE INDEX "_DataDOC_samples_B_index" ON "_DataDOC_samples"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DataWeekly_samples_AB_unique" ON "_DataWeekly_samples"("A", "B");

-- CreateIndex
CREATE INDEX "_DataWeekly_samples_B_index" ON "_DataWeekly_samples"("B");

-- AddForeignKey
ALTER TABLE "DataDOC" ADD CONSTRAINT "DataDOC_periode_fkey" FOREIGN KEY ("periode") REFERENCES "Periode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataWeekly" ADD CONSTRAINT "DataWeekly_periode_fkey" FOREIGN KEY ("periode") REFERENCES "Periode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleWeekly" ADD CONSTRAINT "SampleWeekly_periode_fkey" FOREIGN KEY ("periode") REFERENCES "Periode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataDaily" ADD CONSTRAINT "DataDaily_periode_fkey" FOREIGN KEY ("periode") REFERENCES "Periode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataPanen" ADD CONSTRAINT "DataPanen_periode_fkey" FOREIGN KEY ("periode") REFERENCES "Periode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataPenjarangan" ADD CONSTRAINT "DataPenjarangan_periode_fkey" FOREIGN KEY ("periode") REFERENCES "Periode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSapronak" ADD CONSTRAINT "DataSapronak_periode_fkey" FOREIGN KEY ("periode") REFERENCES "Periode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataNonSapronak" ADD CONSTRAINT "DataNonSapronak_periode_fkey" FOREIGN KEY ("periode") REFERENCES "Periode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataDOC_samples" ADD CONSTRAINT "_DataDOC_samples_A_fkey" FOREIGN KEY ("A") REFERENCES "DataDOC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataDOC_samples" ADD CONSTRAINT "_DataDOC_samples_B_fkey" FOREIGN KEY ("B") REFERENCES "SampleDOC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataWeekly_samples" ADD CONSTRAINT "_DataWeekly_samples_A_fkey" FOREIGN KEY ("A") REFERENCES "DataWeekly"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DataWeekly_samples" ADD CONSTRAINT "_DataWeekly_samples_B_fkey" FOREIGN KEY ("B") REFERENCES "SampleWeekly"("id") ON DELETE CASCADE ON UPDATE CASCADE;
