"use client"

import { Button } from "./ui/button"

export default function CopyButton({ promptBody }: { promptBody: string }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(promptBody)
    }
    return <Button onClick={handleCopy}>Copy propmt</Button>
}