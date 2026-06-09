// src/services/authService.ts
import { prisma } from "@/lib/prisma";

export class AuthService {
  // Abhi ke liye dummy login — lead saving ke baad auth banayenge
  static async login(email: string, password: string) {
    // TODO: real check
    return { id: "1", email, name: "Admin" };
  }
}