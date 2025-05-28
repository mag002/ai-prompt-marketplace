import PromptCard from "@/components/PromptCard";
import { Prompt } from "@/type";

export const mockPosts = [
    {
        id: 1,
        title: "Viết 1 bài thơ haiku về AI",
        body: "AI như gió thổi, dữ liệu hóa thành thơ, máy học biết mơ.",
        userId: 101,
    },
    {
        id: 2,
        title: "Tạo prompt để viết truyện trinh thám",
        body: "Viết một câu chuyện trinh thám bắt đầu bằng một cánh cửa bị khóa từ bên trong.",
        userId: 102,
    },
    {
        id: 3,
        title: "Đưa ý tưởng cho podcast về công nghệ",
        body: "Liệt kê 5 chủ đề podcast hấp dẫn về AI trong đời sống hằng ngày.",
        userId: 103,
    },
];
// server component

export default async function ExplorePage() {
    const fetchData = async () => {
        const res = await fetch('https://dummyjson.com/posts');
        const json = await res.json();
        console.log(json)
        return json;
    }

    await fetchData();
    console.log("FETCHED")

    return <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">🔍 Khám phá Prompt</h1>
            <p className="text-muted-foreground">
                Khám phá các ý tưởng prompt sáng tạo từ cộng đồng. Nhấn vào từng prompt để xem chi tiết.
            </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockPosts.map((post: Prompt) => (
                <PromptCard key={post.id} prompt={post} />
            ))}
        </div>
    </section>
}