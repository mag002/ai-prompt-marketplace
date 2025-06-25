"use client";

import { DropdownList } from "@/components/DropdownList";
import PromptCard from "@/components/PromptCard";
import PromptCardsSkeleton from "@/components/PromptCardsSkeleton";
import SearchPrompt from "@/components/SearchPrompt";
import { Badge } from "@/components/ui/badge";
import { Prompt } from "@/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export default function ExplorePage() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [tagsData, setTagsData] = useState<DropdownList[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);
    const limit = 10;

    const fetchTags = async () => {
        const res = await fetch(`http://localhost:3000/api/prompt/tag`);
        const json: string[] = await res.json();
        const tags = json.map((t) => ({ label: t, value: t }));
        setTagsData(tags);
    };

    const fetchPrompts = async (reset = false) => {
        if (loading || !hasMore) return;

        setLoading(true);

        const tagParams = selectedTags.map((t) => `tag[]=${t}`).join("&");

        const res = await fetch(
            `http://localhost:3000/api/prompt?query=${query}&${tagParams}&page=${page}&limit=${limit}`
        );
        const json = await res.json();

        if (reset) {
            setPrompts(json.data);
        } else {
            setPrompts((prev) => [...prev, ...json.data]);
        }

        if (json.data.length < limit) {
            setHasMore(false);
        }

        setLoading(false);
    };

    // Reset data when query/tag changes
    useEffect(() => {
        setPage(1);
        setHasMore(true);
        setPrompts([]);
        fetchTags();
    }, []);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        setPrompts([]);
        fetchPrompts(true);
    }, [query, selectedTags]);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref.current, hasMore, loading]);

    useEffect(() => {
        if (page === 1) return;
        fetchPrompts();
    }, [page]);

    return (
        <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">🔍 Khám phá Prompt</h1>
                <p className="text-muted-foreground">
                    Khám phá các ý tưởng prompt sáng tạo từ cộng đồng. Nhấn vào từng prompt để xem chi tiết.
                </p>
            </header>

            <SearchPrompt query={query} setQuery={setQuery} />

            <div className="flex gap-3 items-baseline">
                <DropdownList
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    list={tagsData}
                    label="Tags filter"
                />
                <div className="flex w-full flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                        <Badge key={tag}>{tag.toUpperCase()}</Badge>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {prompts.map((post: Prompt) => (
                    <PromptCard key={post.id} prompt={post} />
                ))}
                {loading && <PromptCardsSkeleton />}
            </div>

            <div ref={ref} className="h-10" />
            {!hasMore && (
                <p className="text-center text-sm text-muted-foreground">— Hết prompt —</p>
            )}
        </section>
    );
}
