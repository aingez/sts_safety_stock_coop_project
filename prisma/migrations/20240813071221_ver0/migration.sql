-- AddForeignKey
ALTER TABLE "current_stock_part" ADD CONSTRAINT "current_stock_part_type_fkey" FOREIGN KEY ("type") REFERENCES "part_quantity"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
