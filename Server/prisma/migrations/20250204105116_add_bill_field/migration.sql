/*
  Warnings:

  - You are about to drop the column `expense` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `expense` ADD COLUMN `bill` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `expense`,
    ADD COLUMN `currentExpense` INTEGER NOT NULL DEFAULT 0;
