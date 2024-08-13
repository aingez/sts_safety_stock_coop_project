/*
  Warnings:

  - You are about to drop the `CurrentStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PalletStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PartHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PartQuantity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurrentStock" DROP CONSTRAINT "CurrentStock_palletId_fkey";

-- DropForeignKey
ALTER TABLE "CurrentStock" DROP CONSTRAINT "CurrentStock_type_fkey";

-- DropForeignKey
ALTER TABLE "PalletStatus" DROP CONSTRAINT "PalletStatus_staffId_fkey";

-- DropForeignKey
ALTER TABLE "PartHistory" DROP CONSTRAINT "PartHistory_packStaffId_fkey";

-- DropForeignKey
ALTER TABLE "PartHistory" DROP CONSTRAINT "PartHistory_serial_fkey";

-- DropForeignKey
ALTER TABLE "PartHistory" DROP CONSTRAINT "PartHistory_unpackStaffId_fkey";

-- DropTable
DROP TABLE "CurrentStock";

-- DropTable
DROP TABLE "PalletStatus";

-- DropTable
DROP TABLE "PartHistory";

-- DropTable
DROP TABLE "PartQuantity";

-- DropTable
DROP TABLE "Staff";
