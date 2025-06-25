import { addPrompt, getPrompts } from "@/lib/db";
import { promptSchema } from "@/schemas/prompt-schema";
import { NextRequest, NextResponse } from "next/server"
export async function GET(req: NextRequest) {
    // request
    // response
    // request param
    // param => lib/db => get prompt by id => return prompt

    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query') || ""
    const tags = searchParams.getAll('tag') || ""
    const limit = Number(searchParams.getAll('limit')) || 10
    const page = Number(searchParams.getAll('page')) || 1
    const { pagedPrompts, total } = getPrompts(query, limit, page)
    return NextResponse.json({ data: pagedPrompts, total })


    // phan trang 1,2,3,4,..,5
    // infinite scroll
    // total=200, page=2, limit=20
    // limit=20, page=2
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

// page login

// api login
// user id | password
/**
 *     
  <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm mx-auto py-10 space-y-4">
      <Input placeholder="Email" {...form.register("email")} />
      <Input type="password" placeholder="Mật khẩu" {...form.register("password")} />
      <Button type="submit" className="w-full">Đăng nhập</Button>
    </form>

    17:22 | 20:22
 */