-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PalletStatus" (
    "id" TEXT NOT NULL,
    "rowLocation" INTEGER NOT NULL,
    "packDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "staffId" INTEGER,

    CONSTRAINT "PalletStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentStock" (
    "serial" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "palletId" TEXT NOT NULL,

    CONSTRAINT "CurrentStock_pkey" PRIMARY KEY ("serial")
);

-- CreateTable
CREATE TABLE "PartQuantity" (
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PartQuantity_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "PartHistory" (
    "id" SERIAL NOT NULL,
    "serial" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "palletId" TEXT NOT NULL,
    "packDate" TIMESTAMP(3) NOT NULL,
    "unpackDate" TIMESTAMP(3) NOT NULL,
    "packStaffId" INTEGER NOT NULL,
    "unpackStaffId" INTEGER NOT NULL,

    CONSTRAINT "PartHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrentStock_palletId_key" ON "CurrentStock"("palletId");

-- CreateIndex
CREATE UNIQUE INDEX "PartHistory_serial_palletId_packDate_key" ON "PartHistory"("serial", "palletId", "packDate");

-- AddForeignKey
ALTER TABLE "PalletStatus" ADD CONSTRAINT "PalletStatus_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentStock" ADD CONSTRAINT "CurrentStock_palletId_fkey" FOREIGN KEY ("palletId") REFERENCES "PalletStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentStock" ADD CONSTRAINT "CurrentStock_type_fkey" FOREIGN KEY ("type") REFERENCES "PartQuantity"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartHistory" ADD CONSTRAINT "PartHistory_packStaffId_fkey" FOREIGN KEY ("packStaffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartHistory" ADD CONSTRAINT "PartHistory_unpackStaffId_fkey" FOREIGN KEY ("unpackStaffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartHistory" ADD CONSTRAINT "PartHistory_serial_fkey" FOREIGN KEY ("serial") REFERENCES "CurrentStock"("serial") ON DELETE RESTRICT ON UPDATE CASCADE;
