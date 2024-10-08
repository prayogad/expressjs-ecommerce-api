-- CreateTable
CREATE TABLE "carts" (
    "user_username" VARCHAR(100) NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("user_username","product_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "total_price" INTEGER NOT NULL,
    "payment_status" VARCHAR(100) NOT NULL,
    "shipment_status" VARCHAR(100) NOT NULL,
    "expedition" TEXT NOT NULL,
    "user_username" VARCHAR(100) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPayemnt" (
    "payment_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "DetailPayemnt_pkey" PRIMARY KEY ("payment_id","product_id")
);

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_username_fkey" FOREIGN KEY ("user_username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_username_fkey" FOREIGN KEY ("user_username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPayemnt" ADD CONSTRAINT "DetailPayemnt_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPayemnt" ADD CONSTRAINT "DetailPayemnt_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
