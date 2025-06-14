import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(6, "Username phải từ 3 ký tự"),
    password: z.string().min(8, "Password phải từ 10 ký tự"),
});

export type LoginSchema = z.infer<typeof loginSchema>;