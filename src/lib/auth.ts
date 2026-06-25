// =============================================
// GÜRGENTEKSTIL - Admin Auth Yardımcıları
// =============================================

import { cookies } from "next/headers";
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { AdminSession } from "@/types";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET ?? "fallback_secret_change_this";
const COOKIE_NAME = "gt_admin_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 gün

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(userId: string, username: string): string {
  return sign({ id: userId, username }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminSession | null {
  try {
    return verify(token, JWT_SECRET) as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export { COOKIE_NAME, COOKIE_MAX_AGE };
