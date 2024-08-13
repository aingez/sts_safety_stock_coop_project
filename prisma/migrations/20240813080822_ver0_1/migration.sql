/*
  Warnings:

  - The primary key for the `pallet_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pallet_name` on the `pallet_status` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `pallet_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `pallet_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "current_stock_part" DROP CONSTRAINT "current_stock_part_pallet_name_fkey";

-- DropIndex
DROP INDEX "pallet_status_pallet_name_key";

-- AlterTable
ALTER TABLE "pallet_status" DROP CONSTRAINT "pallet_status_pkey",
DROP COLUMN "pallet_name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "pallet_status_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "pallet_status_id_key" ON "pallet_status"("id");

-- AddForeignKey
ALTER TABLE "current_stock_part" ADD CONSTRAINT "current_stock_part_pallet_name_fkey" FOREIGN KEY ("pallet_name") REFERENCES "pallet_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
