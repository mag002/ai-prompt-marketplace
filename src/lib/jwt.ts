import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'patrickle002';

export function signToken(payload: any) {
    console.log("===DEBUG=== signToken - JWT_SECRET", JWT_SECRET)
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET)
}