/*
  Warnings:

  - The primary key for the `history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `history` table. All the data in the column will be lost.
  - The primary key for the `pallet_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pallet_status` table. All the data in the column will be lost.
  - The primary key for the `staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pallet_id]` on the table `pallet_status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staff_id]` on the table `staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pallet_id` to the `pallet_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staff_id` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "current_stock_part" DROP CONSTRAINT "current_stock_part_pallet_name_fkey";

-- DropForeignKey
ALTER TABLE "pallet_status" DROP CONSTRAINT "pallet_status_packer_id_fkey";

-- DropIndex
DROP INDEX "pallet_status_id_key";

-- DropIndex
DROP INDEX "staff_id_key";

-- AlterTable
ALTER TABLE "history" DROP CONSTRAINT "history_pkey",
DROP COLUMN "id",
ADD COLUMN     "history_id" SERIAL NOT NULL,
ADD CONSTRAINT "history_pkey" PRIMARY KEY ("history_id");

-- AlterTable
ALTER TABLE "pallet_status" DROP CONSTRAINT "pallet_status_pkey",
DROP COLUMN "id",
ADD COLUMN     "pallet_id" TEXT NOT NULL,
ADD CONSTRAINT "pallet_status_pkey" PRIMARY KEY ("pallet_id");

-- AlterTable
ALTER TABLE "staff" DROP CONSTRAINT "staff_pkey",
DROP COLUMN "id",
ADD COLUMN     "staff_id" INTEGER NOT NULL,
ADD CONSTRAINT "staff_pkey" PRIMARY KEY ("staff_id");

-- CreateIndex
CREATE UNIQUE INDEX "pallet_status_pallet_id_key" ON "pallet_status"("pallet_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_staff_id_key" ON "staff"("staff_id");

-- AddForeignKey
ALTER TABLE "pallet_status" ADD CONSTRAINT "pallet_status_packer_id_fkey" FOREIGN KEY ("packer_id") REFERENCES "staff"("staff_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "current_stock_part" ADD CONSTRAINT "current_stock_part_pallet_name_fkey" FOREIGN KEY ("pallet_name") REFERENCES "pallet_status"("pallet_id") ON DELETE RESTRICT ON UPDATE CASCADE;
