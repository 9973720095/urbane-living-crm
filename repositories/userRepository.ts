import { prisma } from "@/lib/prisma";

export class UserRepository {
  /**
   * Database se unique email ke basis par user check karne ke liye
   */
  static async findByEmail(email: string) {
    try {
      // Prisma standard client model syntax lookup with dynamic fallback
      const prismaClient = prisma as any;
      const userModel = prismaClient.user || prismaClient.User;

      if (!userModel) {
        throw new Error("Prisma User model configuration is completely missing");
      }

      return await userModel.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      console.error("Database error inside UserRepository.findByEmail:", error);
      throw new Error("Failed to query user from database layer");
    }
  }
}