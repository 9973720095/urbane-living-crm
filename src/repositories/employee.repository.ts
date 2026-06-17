import { prisma } from "@/lib/prisma";

export class EmployeeRepository {
  async getAll() {
    return prisma.employee.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}