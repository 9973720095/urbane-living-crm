import { PrismaClient, Department, EmployeeRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Employees...");
  await prisma.employee.deleteMany();

  const employees = [
    { name: "Abhishek Mishra", email: "abhi.urbaneliving@gmail.com", pass: "ULFC@abhi@2026", whatsapp: "9667999139", phone: "9667999139", designation: "Manager", department: Department.MANAGEMENT, role: EmployeeRole.MANAGER, employeeCode: "EMP001" },
    { name: "Digvijay Jha", email: "dj.urbaneliving@gmail.com", pass: "ULFC@dj@2026", whatsapp: "9925012116", phone: "9925012116", designation: "Manager", department: Department.MANAGEMENT, role: EmployeeRole.MANAGER, employeeCode: "EMP002" },
    { name: "Vibhuti Mishra", email: "vibhooti.urbaneliving@gmail.com", pass: "ULFC@vm@2026", whatsapp: "9560555103", phone: "9560555103", designation: "Sales Manager", department: Department.SALES, role: EmployeeRole.SALES_MANAGER, employeeCode: "EMP003" },
    { name: "Saban Jha", email: "saban.urbaneliving@gmail.com", pass: "ULFC@jhaji@2026", whatsapp: "9973720095", phone: "9973720095", designation: "Admin", department: Department.MANAGEMENT, role: EmployeeRole.ADMIN, employeeCode: "EMP004" },
    { name: "Lata Rawat", email: "lata.urbaneliving@gmail.com", pass: "ULFC@rawat@2026", whatsapp: "9717341076", phone: "9717341076", designation: "HR", department: Department.HR, role: EmployeeRole.HR_EXECUTIVE, employeeCode: "EMP005" },
    { name: "Ayush", email: "ayush.urbaneliving@gmail.com", pass: "ULFC@ayush@2026", whatsapp: "8279446641", phone: "8279446641", designation: "Sales", department: Department.SALES, role: EmployeeRole.SALES_EXECUTIVE, employeeCode: "EMP006" },
    { name: "Archit", email: "sales1.urbaneliving@gmail.com", pass: "ULFC@archit@2026", whatsapp: "7668523073", phone: "7668523073", designation: "Sales", department: Department.SALES, role: EmployeeRole.SALES_EXECUTIVE, employeeCode: "EMP007" },
    { name: "Deepak", email: "deepak.urbaneliving@gmail.com", pass: "ULFC@deepak@2026", whatsapp: "8810550911", phone: "8810550911", designation: "Designer", department: Department.DESIGN, role: EmployeeRole.DESIGNER, employeeCode: "EMP008" },
  ];

  for (const e of employees) {
    const hashedPassword = await bcrypt.hash(e.pass, 10);
    await prisma.employee.create({
      data: {
        name: e.name, email: e.email, password: hashedPassword,
        whatsapp: e.whatsapp, phone: e.phone,
        designation: e.designation, department: e.department,
        role: e.role, employeeCode: e.employeeCode,
      }
    });
  }
  console.log("✅ Employees Seeded Successfully");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });