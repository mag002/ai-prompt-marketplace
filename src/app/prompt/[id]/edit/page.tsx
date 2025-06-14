import { PromptForm } from "@/components/PromptForm";
import { notFound } from "next/navigation";


// meta data
// fetch 
export default async function EditPromptPage({ params }: { params: { id: string } }) {
    // Implement form 18:35 | 21: 35

    await new Promise(resolve => setTimeout(resolve, 3000))
    const { id } = await params;
    const res = await fetch('https://dummyjson.com/posts/' + id)
    if (!res.ok) {
        return notFound();
    }
    const data = await res.json();

    return <div>
        <h2>Edit Prompt</h2>
        <PromptForm initialValue={{ ...data, id, content: data.body }} isEdit={true} />
    </div>
}