import { prisma } from "@/lib/prisma";
async function main() {
  const employee = (prisma as any).employee;
  await employee.deleteMany();
  await employee.createMany({
    data: [
      { name: "Abhishek Mishra", email: "askabhi139@gmail.com", whatsapp: "919667999139" },
      { name: "Vibhuti Mishra", email: "urbanelivingofficial@gmail.com", whatsapp: "91956055103" },
      { name: "Saban Jha", email: "saban.urbaneliving@gmail.com", whatsapp: "919973720095" },
    ]
  });
}
main();