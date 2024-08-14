/*
  Warnings:

  - You are about to drop the `part_quantity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "current_stock_part" DROP CONSTRAINT "current_stock_part_type_fkey";

-- DropTable
DROP TABLE "part_quantity";
