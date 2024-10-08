-- CreateTable
CREATE TABLE "admin" (
    "usernmae" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "token" VARCHAR(100),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("usernmae")
);
