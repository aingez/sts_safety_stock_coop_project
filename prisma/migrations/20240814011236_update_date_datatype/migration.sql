-- AlterTable
ALTER TABLE "current_stock_part" ALTER COLUMN "pack_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "history" ALTER COLUMN "pack_date" DROP DEFAULT,
ALTER COLUMN "unpack_date" DROP DEFAULT;
