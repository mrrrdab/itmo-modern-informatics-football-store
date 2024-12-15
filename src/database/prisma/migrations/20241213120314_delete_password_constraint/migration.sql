-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "EmailVerification" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 hour';
