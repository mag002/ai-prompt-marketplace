
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


export default function LoginPage() {
    const router = useRouter();
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (values: LoginSchema) => {
        const res = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify(values)
        })
        if (res.ok) {
            alert("Login successfully!");
            // redirect to prompt page
            router.push('/explore')
        } else {
            alert("Wrong username or password!");

        }
        console.log(process.env.JWT_SECRET)
    }
    return <div className="max-w-sm mx-auto py-10 space-y-4">
        <h1 className="text-xl font-bold">Login Page</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
            <Input placeholder="Username" {...form.register("username")} />
            <Input type="password" placeholder="Mật khẩu" {...form.register("password")} />
            <Button type="submit" className="w-full">Đăng nhập</Button>
        </form>
    </div>
}