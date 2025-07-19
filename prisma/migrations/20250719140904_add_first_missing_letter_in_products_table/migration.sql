/*
  Warnings:

  - Added the required column `first_missing_letter` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "first_missing_letter" TEXT NOT NULL;
