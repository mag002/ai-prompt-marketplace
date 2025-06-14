"use client"

import { promptSchema, PromptSchema } from "@/schemas/prompt-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useRouter } from "next/navigation"
import { useTransition } from "react"


interface PromptFormProps { initialValue?: { id: string, title: string, content: string }, isEdit?: boolean }


// server component => ko co state
export function PromptForm({ initialValue, isEdit }: PromptFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const form = useForm<PromptSchema>({
        resolver: zodResolver(promptSchema),
        defaultValues: initialValue ? initialValue : {
            title: '',
            content: '',
            //tags
        }
    })

    const handleSubmit = (values: PromptSchema) => {
        // request to server to submit
        // test dummyjson
        // => use toast of shadcn(sonner) to inform the status
        console.log(values)
        if (isEdit) {
            console.log("CALL UPDATE")
        } else {
            // call api
            // submit => loading => result
            console.log("CALL CREATE")
            startTransition(async () => {
                await new Promise(resolve => setTimeout(resolve, 3000))
                const res = await fetch("/api/prompt", {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: { "Content-Type": "application/json" }
                })
                console.log()
                if (res.ok) {

                    alert("Create Prompt Successfully!");
                    form.reset(); // reset form
                } else {
                    alert("CREATE FAILED")
                }
            })
        }
        // CREATE => POST /posts
        // EDIT => PUT /posts/id
    }

    const handleCancel = () => {
        if (isEdit && initialValue) {
            router.push(`/prompt/${initialValue.id}`)
        } else {
            //
            router.push(`/explore`)
        }
    }

    // dropdown 3 options
    // navigate sang trang nafo => drop
    // momo/credit card/QR

    return <Form {...form} >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel />
                        <FormControl>
                            { /* Your form field */}
                            <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
                }
            />
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel />
                        <FormControl>
                            { /* Your form field */}
                            <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
                }
            />
            <div className="flex w-full mt-3 justify-end gap-5">
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                <Button disabled={isPending} type="submit">{isEdit ? 'Update' : 'Create'}</Button>
            </div>
        </form>
    </Form>
}