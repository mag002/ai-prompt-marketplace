// import { bookmarks } from "@/lib/bookmarks";
import { auth } from "@/lib/jwt";
import { readDB } from "@/lib/mock/json-db";
import { findUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const decoded = await auth(req);
    if (!decoded) {
        return NextResponse.json({ message: "Unauthenticated!" }, { status: 403 })
    }
    const user = findUser(decoded.id);
    return NextResponse.json({  user })
}