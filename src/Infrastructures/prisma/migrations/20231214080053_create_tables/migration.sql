-- CreateEnum
CREATE TYPE "PROCESS" AS ENUM ('UNPROCESS', 'PROCESS', 'PROCESSED');

-- CreateEnum
CREATE TYPE "JENISSURAT" AS ENUM ('SURAT_KEMATIAN', 'SKU', 'DOMISILI', 'KETERANGAN_LAHIR', 'SURAT_PINDAH', 'SURAT_SERBA_GUNA');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "user" (
    "nik" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "roleId" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" VARCHAR(255) NOT NULL,
    "process" "PROCESS" NOT NULL DEFAULT 'UNPROCESS',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nik" VARCHAR(255) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,
    "nik" VARCHAR(255) NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" VARCHAR(255) NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'USER',

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentications" (
    "token" VARCHAR(255) NOT NULL,
    "nik" VARCHAR(255) NOT NULL,

    CONSTRAINT "authentications_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "type" "JENISSURAT" NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "nik" VARCHAR(255) NOT NULL,
    "requestId" VARCHAR(255) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authentications_nik_key" ON "authentications"("nik");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_nik_fkey" FOREIGN KEY ("nik") REFERENCES "user"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_nik_fkey" FOREIGN KEY ("nik") REFERENCES "user"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authentications" ADD CONSTRAINT "authentications_nik_fkey" FOREIGN KEY ("nik") REFERENCES "user"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
