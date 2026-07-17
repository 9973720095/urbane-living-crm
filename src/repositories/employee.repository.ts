import { prisma } from "@/lib/prisma";

export class EmployeeRepository {

  async getAll() {
    return prisma.employee.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string) {
    return prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    return prisma.employee.create({
      data,
    });
  }

  async update(
    id: string,
    data: any
  ) {
    return prisma.employee.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.employee.delete({
      where: {
        id,
      },
    });
  }

}