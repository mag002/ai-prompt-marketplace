// import { bookmarks } from "@/lib/bookmarks";
import { getPrompt } from "@/lib/db";
import { auth } from "@/lib/jwt";
import { readDB, writeDB } from "@/lib/mock/json-db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const decoded = await auth(req)

        if (!decoded) {
            return NextResponse.json({ message: "Unauthenticated!" }, { status: 403 })
        }

        const { id: userId } = decoded;
        const body = await req.json();
        const { promptId } = body;
        // 17:35 | 20:35
        const bookmarks = readDB("bookmarks")
        console.log(bookmarks)
        // readDB => bookmarks => update by user-id
        bookmarks[userId] = bookmarks[userId].filter((b:number)=>b!==Number(promptId))
        writeDB("bookmarks", bookmarks)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}



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
        // 17:35 | 20:35
        const bookmarks = readDB("bookmarks")
        console.log(bookmarks)
        // readDB => bookmarks => update by user-id
        bookmarks[userId] = bookmarks[userId] || [];
        if (!bookmarks[userId].includes(promptId)) {
            bookmarks[userId].push(promptId)
            writeDB("bookmarks", bookmarks)
        }
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const decoded = await auth(req);
    if (!decoded) {
        return NextResponse.json({ message: "Unauthenticated!" }, { status: 403 })
    }
    const bookmarks = readDB('bookmarks')
    const bookmarked = bookmarks[decoded.id] || [];
    const bookmarkedPrompts = bookmarked.map((promptId:number) => {
        return getPrompt(promptId)
    })
    return NextResponse.json({ bookmarkedPrompts})
}
//DELETE to un bookmark