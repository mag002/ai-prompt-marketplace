import { bookmarks } from "@/lib/bookmarks";
import { auth } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // api design


        // GET DELETE (data inside of param) | POST PUT PATCH (data inside of request body)
        // everything we need should be inside of request body (json)
        // everything about user should be inside of token or header (jwt)

        // const token = req.headers.get("cookie")?.split("token=")[1].split(";")[0];
        const decoded = await auth(req)

        if (!decoded) {
            return NextResponse.json({ message: "Unauthenticated!" }, { status: 403 })
        }

        const { id: userId } = decoded;
        const body = await req.json();
        const { promptId } = body;
        console.log(bookmarks)
        bookmarks[userId] = bookmarks[userId] || [];
        if (!bookmarks[userId].includes(promptId)) {
            bookmarks[userId].push(promptId)
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}