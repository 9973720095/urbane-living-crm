-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('CALL', 'FOLLOWUP', 'MEETING', 'SITE_VISIT');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "FollowUp" ADD COLUMN     "reminderSent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "duration" INTEGER DEFAULT 30;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "employeeId" TEXT;

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "TaskType" NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "leadId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "googleEventId" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
