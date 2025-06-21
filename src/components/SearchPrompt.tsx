"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"

export default function SearchPrompt({ query, setQuery }: { query: string, setQuery: (query: string) => void }) {
    const router = useRouter();
    const handleSearch = () => {
        console.log(query)
        router.push("/explore?query=" + query)
        // submit and redirect to new URL with query param
    }
    return <div className="flex items-center gap-2">
        <Input
            placeholder="Tìm kiếm prompt..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Tìm</Button>
    </div>
}