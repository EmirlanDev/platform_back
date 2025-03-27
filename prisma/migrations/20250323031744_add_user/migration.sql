-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "photoURL" TEXT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "profession" TEXT NOT NULL DEFAULT 'Пусто',
    "university" TEXT NOT NULL DEFAULT 'Пусто',
    "dateOfBirthDay" TEXT NOT NULL DEFAULT 'Пусто',
    "descr" TEXT NOT NULL DEFAULT 'Пусто',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
