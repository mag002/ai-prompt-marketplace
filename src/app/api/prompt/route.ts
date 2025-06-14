import { addPrompt, prompts } from "@/lib/db";
import { promptSchema } from "@/schemas/prompt-schema";
import { NextRequest, NextResponse } from "next/server"
export async function GET() {
    // request
    // response
    // request param
    // param => lib/db => get prompt by id => return prompt

    console.log("DEBUG", prompts)
    return NextResponse.json(prompts)
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = promptSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
        }

        const prompt = addPrompt(result.data);

        return NextResponse.json({ prompt }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}

// 18:47 | 21:47
// terminal => folder structure => markdown structure 