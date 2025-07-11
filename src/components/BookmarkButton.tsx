"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"


export default function BookmarkButton({ promptId }: { promptId: string }) {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // call api to check bookmark
        fetchBookmarkStatus();

    }, [])

    const fetchBookmarkStatus = async () => {
        const res = await fetch("http://localhost:3000/api/bookmark/check/" + promptId);
        const json = await res.json();
        setSaved(json.bookmarked)
    }

    const handleClick = async () => {
        const res = await fetch("/api/bookmark", {
            method: "POST",
            body: JSON.stringify({ promptId })
        })
        if (res.ok) {
            setSaved(true)
        } else {
            alert("ERROR!")
        }
    }
    return <Button variant="outline" onClick={handleClick}>
        {saved ? <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
            <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"></path>
        </svg> : <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"></path>
        </svg>}
    </Button>
}