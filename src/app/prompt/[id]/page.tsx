import BookmarkButton from "@/components/BookmarkButton";
import CopyButton from "@/components/CopyButton";
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
    const res = await fetch('http://localhost:3000/api/prompt/' + id);
    const data = await res.json();
    //  18:25 | 21:25
    return {
        title: `${data.prompt.title} | PromptHub`,
        description: data.prompt.body.slice(0, 100),
    }
}

// metadata from server => client side update the title again
export default async function PromptDetail({ params }: { params: { id: string } }) {
    // not found data => return ??? => next notFound()
    await new Promise(resolve => setTimeout(resolve, 3000))
    const { id } = await params;
    const res = await fetch('http://localhost:3000/api/prompt/' + id)
    if (!res.ok) {
        return notFound();
    }
    const data = await res.json();
    console.log('data', data)
    const { prompt } = data;
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
                    <BreadcrumbPage>{prompt.title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="rounded shadow p-3 mt-5">
            <div className="max-w-3xl mx-auto space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{prompt.title}</h1>
                    <div className="flex gap-3">
                        {/* TODO: Check user is owner */}
                        {/* <Button asChild>
                            <Link href={`/prompt/${prompt.id}/edit`}>
                                Edit
                            </Link>
                        </Button>
                        <DeletePromptButton id={id} /> */}
                        {/* <Button variant="outline">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"></path>
                            </svg>
                        </Button> */}
                        <BookmarkButton promptId={prompt.id} />
                        {/* <Button variant="outline">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"></path>
                            </svg>
                        </Button> */}
                    </div>
                </div>
                <div className="flex gap-3">
                    {
                        prompt.tags.map((item: string) => {
                            return <div key={`tags_${item}_${Math.random()}`} className="rounded bg-gray-200 p-2 capitalize text-xs font-bold">{item}</div>
                        })
                    }
                </div>
                <p className="text-xl font-bold mt-5">Description</p>
                <p className="text-muted-foreground">{prompt.body}</p>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <CopyButton promptBody={prompt.body} />
                        {/* <b>Likes</b>: {prompt.reactions.likes} */}
                    </div>
                    <p className="text-sm text-gray-500">👤 Tác giả: user-{prompt.userId}</p>
                </div>
            </div>
        </div>
    </>
}