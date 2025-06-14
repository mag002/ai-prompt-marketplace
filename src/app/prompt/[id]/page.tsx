import { DeletePromptButton } from "@/components/DeletePromptButton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

// server component
// user access via URL => request send to server => Server render this (SERVER) component => generateMetadata => nextJS => generate meta tag (title, descripotion)
// => generate component (PromptDetail) => final HTML => respond back to Browser

// SEO

// React 

// crawl => sitemap => explore => 100 posts => title => h1 h2 p => summarize => info => index => GOOGLE
// crawl => sitemap => explore => index.html (full content/ half content => no client component => full content 
//  client component => half content)
export async function generateMetadata({ params }: { params: { id: string } }) {

    const { id } = await params;
    const res = await fetch('https://dummyjson.com/posts/' + id);
    const data = await res.json();

    return {
        title: `${data.title} | PromptHub`,
        description: data.body.slice(0, 100),
    }
}

// metadata from server => client side update the title again
export default async function PromptDetail({ params }: { params: { id: string } }) {
    // not found data => return ??? => next notFound()
    await new Promise(resolve => setTimeout(resolve, 3000))
    const { id } = await params;
    const res = await fetch('https://dummyjson.com/posts/' + id)
    if (!res.ok) {
        return notFound();
    }
    const data = await res.json();
    console.log('data', data)
    // 17:30 | 20:30
    // dummy json get data

    const handleDelete = () => {

    }

    return <>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/explore">Explore</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{data.title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="rounded shadow p-3 mt-5">
            <div className="max-w-3xl mx-auto space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{data.title}</h1>
                    <div className="flex gap-3">
                        <Button asChild>
                            <Link href={`/prompt/${data.id}/edit`}>
                                Edit
                            </Link>
                        </Button>
                        <DeletePromptButton id={id} />
                    </div>
                </div>
                <div className="flex gap-3">
                    {
                        data.tags.map((item: string) => {
                            return <div key={`tags_${item}_${Math.random()}`} className="rounded bg-gray-200 p-2 capitalize text-xs font-bold">{item}</div>
                        })
                    }
                </div>
                <p className="text-xl font-bold mt-5">Description</p>
                <p className="text-muted-foreground">{data.body}</p>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Button>Copy propmt</Button>
                        <b>Likes</b>: {data.reactions.likes}
                    </div>
                    <p className="text-sm text-gray-500">👤 Tác giả: user-{data.userId}</p>
                </div>
            </div>
        </div>
    </>
}