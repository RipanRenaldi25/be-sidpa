/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `contact` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "documents" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "requests" ALTER COLUMN "process" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "role" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contact_phoneNumber_key" ON "contact"("phoneNumber");
