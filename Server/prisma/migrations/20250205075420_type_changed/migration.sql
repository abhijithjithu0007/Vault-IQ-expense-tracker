/*
  Warnings:

  - You are about to alter the column `currentExpense` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `currentExpense` DOUBLE NOT NULL DEFAULT 0;
