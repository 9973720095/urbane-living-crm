import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class AuthService {
  // Static rakho, 'new' ki zaroorat nahi
  static async login(email: string, password: string) {
    const user = await (prisma as any).user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return { success: false, message: "Invalid credentials" };
    }
    return { success: true, message: "Login successful", user };
  }
}