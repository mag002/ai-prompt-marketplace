import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
const JWT_SECRET = process.env.JWT_SECRET || 'patrickle002';

export function signToken(payload: any) {
    console.log("===DEBUG=== signToken - JWT_SECRET", JWT_SECRET)
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET)
}

export async function auth(req: NextRequest) {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
        return null
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded as { id: string, name: string }
    } catch {
        return null
    }
}