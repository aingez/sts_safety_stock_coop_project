/*
  Warnings:

  - The primary key for the `part_quantity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `type` on the `current_stock_part` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `part_quantity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "partType" AS ENUM ('Block', 'Head', 'Crankshaft');

-- DropForeignKey
ALTER TABLE "current_stock_part" DROP CONSTRAINT "current_stock_part_type_fkey";

-- AlterTable
ALTER TABLE "current_stock_part" DROP COLUMN "type",
ADD COLUMN     "type" "partType" NOT NULL;

-- AlterTable
ALTER TABLE "history" DROP COLUMN "type",
ADD COLUMN     "type" "partType" NOT NULL;

-- AlterTable
ALTER TABLE "part_quantity" DROP CONSTRAINT "part_quantity_pkey",
DROP COLUMN "type",
ADD COLUMN     "type" "partType" NOT NULL,
ADD CONSTRAINT "part_quantity_pkey" PRIMARY KEY ("type");

-- AddForeignKey
ALTER TABLE "current_stock_part" ADD CONSTRAINT "current_stock_part_type_fkey" FOREIGN KEY ("type") REFERENCES "part_quantity"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
