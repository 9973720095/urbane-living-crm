// src/services/authService.ts
import { prisma } from "@/lib/prisma";

export class AuthService {
  static async login(email: string, password: string) {
    // TODO: real check
    return { id: "1", email, name: "Admin" };
  }
}