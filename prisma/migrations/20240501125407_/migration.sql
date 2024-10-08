-- CreateTable
CREATE TABLE "users" (
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "address" TEXT,
    "token" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "price" VARCHAR(100) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pictures" (
    "id" SERIAL NOT NULL,
    "picture_url" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_phone_key" ON "users"("email", "phone");

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
