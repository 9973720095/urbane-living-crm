import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding employees...");

  // 1. Purane employees delete karein (Optional, clean start ke liye)
  await prisma.employee.deleteMany();

  // 2. Data Prepare karein (3 real + 7 dummy)
  const realEmployees = [
    { name: "Abhishek Mishra", email: "askabhi139@gmail.com", whatsapp: "919667999139" },
    { name: "Vibhuti Mishra", email: "urbanelivingofficial@gmail.com", whatsapp: "91956055103" },
    { name: "Saban Jha", email: "saban.urbaneliving@gmail.com", whatsapp: "919973720095" },
  ];

  const dummyEmployees = Array.from({ length: 7 }).map((_, i) => ({
    name: `Dummy Employee ${i + 1}`,
    email: `dummy${i + 1}@urbaneliving.com`,
    whatsapp: `91000000000${i + 1}`,
  }));

  const allEmployees = [...realEmployees, ...dummyEmployees];

  // 3. Database mein insert karein
  await prisma.employee.createMany({
    data: allEmployees,
  });

  console.log(`Successfully seeded ${allEmployees.length} employees!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });