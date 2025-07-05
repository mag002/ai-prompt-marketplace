import { bookmarks } from "@/lib/bookmarks";
import { auth } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const decoded = await auth(req);
    if (!decoded) {
        return NextResponse.json({ message: "Unauthenticated!" }, { status: 403 })
    }
    const bookmarked = bookmarks[decoded.id] || [];
    const { id } = await params;
    return NextResponse.json({ bookmarked: bookmarked.includes(Number(id)) })
}