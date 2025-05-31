import PromptCard from "@/components/PromptCard";
import { Prompt } from "@/type";

export default async function ExplorePage() {
    const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        const res = await fetch('https://dummyjson.com/posts');
        const json = await res.json();
        console.log(json)
        return json;
    }

    const { posts } = await fetchData();
    // Skeleton Shadcn
    await fetchData();

    return <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">🔍 Khám phá Prompt</h1>
            <p className="text-muted-foreground">
                Khám phá các ý tưởng prompt sáng tạo từ cộng đồng. Nhấn vào từng prompt để xem chi tiết.
            </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Prompt) => (
                <PromptCard key={post.id} prompt={post} />
            ))}
        </div>
    </section>
}
