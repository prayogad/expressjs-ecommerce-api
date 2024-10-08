/*
  Warnings:

  - You are about to drop the `DetailPayemnt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DetailPayemnt" DROP CONSTRAINT "DetailPayemnt_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "DetailPayemnt" DROP CONSTRAINT "DetailPayemnt_product_id_fkey";

-- DropTable
DROP TABLE "DetailPayemnt";

-- CreateTable
CREATE TABLE "detail_payment" (
    "payment_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "detail_payment_pkey" PRIMARY KEY ("payment_id","product_id")
);

-- AddForeignKey
ALTER TABLE "detail_payment" ADD CONSTRAINT "detail_payment_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_payment" ADD CONSTRAINT "detail_payment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
