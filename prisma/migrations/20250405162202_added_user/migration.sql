-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "photoURL" TEXT DEFAULT 'https://i0.wp.com/passivesills.com/wp-content/uploads/2020/06/User-Icon-Grey.png?fit=400%2C400&ssl=1&w=640',
    "provider" TEXT NOT NULL DEFAULT 'credentials',
    "profession" TEXT NOT NULL DEFAULT '',
    "university" TEXT NOT NULL DEFAULT '',
    "dateOfBirthDay" TEXT NOT NULL DEFAULT '',
    "descr" TEXT NOT NULL DEFAULT '',
    "bgImage" TEXT NOT NULL DEFAULT 'https://www.omfif.org/wp-content/uploads/2022/10/ocean-economy-newweb.png',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
