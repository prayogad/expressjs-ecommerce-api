-- DropIndex
DROP INDEX "carts_user_username_key";

-- AlterTable
ALTER TABLE "carts" ADD CONSTRAINT "carts_pkey" PRIMARY KEY ("user_username", "product_id");
