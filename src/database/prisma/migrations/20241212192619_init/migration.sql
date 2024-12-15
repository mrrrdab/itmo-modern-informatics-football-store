-- AlterTable
ALTER TABLE "EmailVerification" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 hour';
