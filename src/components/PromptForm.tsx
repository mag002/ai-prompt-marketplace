"use client"

import { promptSchema, PromptSchema } from "@/schemas/prompt-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"



// server component => ko co state
export function PromptForm() {
    const form = useForm<PromptSchema>({
        resolver: zodResolver(promptSchema),
        defaultValues: {
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
    }

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
                <Button variant="secondary">Cancel</Button>
                <Button type="submit">Create</Button>
            </div>
        </form>
    </Form>
}