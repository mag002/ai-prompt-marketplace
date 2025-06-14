import { signToken } from "@/lib/jwt";
import { findUser } from "@/lib/users";
import { loginSchema } from "@/schemas/login-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
    }

    const user = findUser(result.data.username, result.data.password);
    if (!user) {
        return NextResponse.json({ message: "Login Failed!" }, { status: 404 })
    }

    const token = signToken({ id: user.id, name: user.name, testPayload: "HELLO!" });

    const res = NextResponse.json({ user: { username: user?.username, id: user?.id, name: user?.name } })

    res.cookies.set("token", token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24
    })
    // 18:09 | 21:09

    return res
}