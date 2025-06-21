import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PromptLayout({ children }: { children: ReactNode }) {

    // get token from cookie?
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        redirect('/login');
    }

    try {
        verifyToken(token);
    } catch {
        redirect('/login');
    }

    // !token => redirect login

    // token => verifyToken => true|false=>redirect

    // 18:37 | 21:37

    return <>
        <h1>FROM LAYOUT WITH LOVE</h1>
        {children}
    </>
}


/**
 * Debounce
 * SSR | SGR
 * DOCKER
 * Deploy
 * Axios
 * Redux
 * 
 * Target:full project first then others
 */