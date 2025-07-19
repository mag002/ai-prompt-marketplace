import { readDB } from "./mock/json-db";
export interface User { id: string, username: string, password: string, name: string, avatar?:string }

export function checkUser(username: string, password: string) {
    const users:User[] = readDB("users");
    return users.find((u) => u.username === username && u.password === password);
}

export function findUser(userId: string){
        const users:User[] = readDB("users");
        return users.find(u=>u.id === userId)
}