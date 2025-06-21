"use client"

import { DropdownList } from "@/components/DropdownList";
import PromptCard from "@/components/PromptCard";
import PromptCardsSkeleton from "@/components/PromptCardsSkeleton";
import SearchPrompt from "@/components/SearchPrompt";
import { Badge } from "@/components/ui/badge";
import { Prompt } from "@/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

// sort/filter => BTVN

// pagination
export default function ExplorePage() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [prompts, setPrompt] = useState<Prompt[]>([]);
    const [tagsData, setTagsData] = useState<DropdownList[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [isPending, startTransition] = useTransition();
    const fetchTags = async () => {
        const res = await fetch(`http://localhost:3000/api/prompt/tag`);
        const json: string[] = await res.json();
        const tags = json.map(t => ({ label: t, value: t }))
        setTagsData(tags)
    }
    const fetchPrompts = async () => {
        // [1,2,3]
        // convert selectedTags to tagString
        // const params = new URLSearchParams({ query })
        const tagString = "tag=exxxxxxample&tag=example"
        const res = await fetch(`http://localhost:3000/api/prompt?query=${query}&${tagString}`);
        const json = await res.json();
        setPrompt(json)
    }
    const fetchData = async () => {
        startTransition(async () => {
            await fetchTags();
            await fetchPrompts();
        })
    }

    useEffect(() => {
        fetchData()
    }, [searchParams])


    return <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">🔍 Khám phá Prompt</h1>
            <p className="text-muted-foreground">
                Khám phá các ý tưởng prompt sáng tạo từ cộng đồng. Nhấn vào từng prompt để xem chi tiết.
            </p>
        </header>
        <SearchPrompt query={query} setQuery={setQuery} />
        <div className="flex gap-3 items-baseline">
            <DropdownList selectedTags={selectedTags} setSelectedTags={setSelectedTags} list={tagsData} label="Tags filter" />
            <div className="flex w-full flex-wrap gap-2">
                {selectedTags.map(tag => {
                    return <Badge key={tag}>{tag.toUpperCase()}</Badge>
                })}

            </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isPending ? <PromptCardsSkeleton /> : prompts.map((post: Prompt) => (
                <PromptCard key={post.id} prompt={post} />
            ))
            }
        </div>
    </section>
}
