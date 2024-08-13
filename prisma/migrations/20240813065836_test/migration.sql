-- CreateTable
CREATE TABLE "staff" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pallet_status" (
    "pallet_name" TEXT NOT NULL,
    "row_location" INTEGER NOT NULL,
    "column_location" INTEGER NOT NULL,
    "is_packing" BOOLEAN NOT NULL,
    "packer_id" INTEGER NOT NULL,

    CONSTRAINT "pallet_status_pkey" PRIMARY KEY ("pallet_name")
);

-- CreateTable
CREATE TABLE "current_stock_part" (
    "serial" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "pack_date" TIMESTAMP(3) NOT NULL,
    "pallet_name" TEXT NOT NULL,

    CONSTRAINT "current_stock_part_pkey" PRIMARY KEY ("serial")
);

-- CreateTable
CREATE TABLE "part_quantity" (
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "part_quantity_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "pallet_name" TEXT NOT NULL,
    "pack_date" TIMESTAMP(3) NOT NULL,
    "packer_id" INTEGER NOT NULL,
    "unpack_date" TIMESTAMP(3) NOT NULL,
    "unpacker_id" INTEGER NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_id_key" ON "staff"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pallet_status_pallet_name_key" ON "pallet_status"("pallet_name");

-- CreateIndex
CREATE UNIQUE INDEX "current_stock_part_serial_key" ON "current_stock_part"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "history_serial_key" ON "history"("serial");

-- AddForeignKey
ALTER TABLE "pallet_status" ADD CONSTRAINT "pallet_status_packer_id_fkey" FOREIGN KEY ("packer_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "current_stock_part" ADD CONSTRAINT "current_stock_part_pallet_name_fkey" FOREIGN KEY ("pallet_name") REFERENCES "pallet_status"("pallet_name") ON DELETE RESTRICT ON UPDATE CASCADE;
