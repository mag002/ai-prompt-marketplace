import { tags } from "@/lib/tags";
import { NextResponse } from "next/server";
export async function GET() {
    return NextResponse.json(tags)
}
