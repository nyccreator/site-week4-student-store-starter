/*
  Warnings:

  - Added the required column `updated_at` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ;
