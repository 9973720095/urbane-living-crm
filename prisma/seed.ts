import { PrismaClient, Department, EmployeeRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Employees...");

  // Existing Employees Delete
  await prisma.employee.deleteMany();

  await prisma.employee.createMany({
    data: [
      {
        name: "Abhishek Mishra",
        email: "abhi.urbaneliving@gmail.com",
        password: "ULFC@abhi@2026",
        whatsapp: "9667999139",
        phone: "9667999139",
        designation: "Manager",
        department: Department.MANAGEMENT,
        role: EmployeeRole.MANAGER,
        employeeCode: "EMP001",
      },

      {
        name: "Digvijay Jha",
        email: "dj.urbaneliving@gmail.com",
        password: "ULFC@dj@2026",
        whatsapp: "9925012116",
        phone: "9925012116",
        designation: "Manager",
        department: Department.MANAGEMENT,
        role: EmployeeRole.MANAGER,
        employeeCode: "EMP002",
      },

      {
        name: "Vibhuti Mishra",
        email: "vibhooti.urbaneliving@gmail.com",
        password: "ULFC@vm@2026",
        whatsapp: "9560555103",
        phone: "9560555103",
        designation: "Sales Manager",
        department: Department.SALES,
        role: EmployeeRole.SALES_MANAGER,
        employeeCode: "EMP003",
      },

      {
        name: "Saban Jha",
        email: "saban.urbaneliving@gmail.com",
        password: "ULFC@jhaji@2026",
        whatsapp: "9973720095",
        phone: "9973720095",
        designation: "Admin",
        department: Department.MANAGEMENT,
        role: EmployeeRole.ADMIN,
        employeeCode: "EMP004",
      },

      {
        name: "Lata Rawat",
        email: "lata.urbaneliving@gmail.com",
        password: "ULFC@rawat@2026",
        whatsapp: "9717341076",
        phone: "9717341076",
        designation: "HR",
        department: Department.HR,
        role: EmployeeRole.HR_EXECUTIVE,
        employeeCode: "EMP005",
      },

      {
        name: "Ayush",
        email: "ayush.urbaneliving@gmail.com",
        password: "ULFC@ayush@2026",
        whatsapp: "8279446641",
        phone: "8279446641",
        designation: "Sales",
        department: Department.SALES,
        role: EmployeeRole.SALES_EXECUTIVE,
        employeeCode: "EMP006",
      },

      {
        name: "Archit",
        email: "sales1.urbaneliving@gmail.com",
        password: "ULFC@archit@2026",
        whatsapp: "7668523073",
        phone: "7668523073",
        designation: "Sales",
        department: Department.SALES,
        role: EmployeeRole.SALES_EXECUTIVE,
        employeeCode: "EMP007",
      },

      {
        name: "Deepak",
        email: "deepak.urbaneliving@gmail.com",
        password: "ULFC@deepak@2026",
        whatsapp: "8810550911",
        phone: "8810550911",
        designation: "Designer",
        department: Department.DESIGN,
        role: EmployeeRole.DESIGNER,
        employeeCode: "EMP008",
      },
    ],
  });

  console.log("✅ Employees Seeded Successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });