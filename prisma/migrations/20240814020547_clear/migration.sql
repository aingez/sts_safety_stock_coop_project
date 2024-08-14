/*
  Warnings:

  - You are about to drop the `current_stock_part` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pallet_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "current_stock_part" DROP CONSTRAINT "current_stock_part_pallet_name_fkey";

-- DropForeignKey
ALTER TABLE "pallet_status" DROP CONSTRAINT "pallet_status_packer_id_fkey";

-- DropTable
DROP TABLE "current_stock_part";

-- DropTable
DROP TABLE "history";

-- DropTable
DROP TABLE "pallet_status";

-- DropTable
DROP TABLE "staff";

-- DropEnum
DROP TYPE "partType";
