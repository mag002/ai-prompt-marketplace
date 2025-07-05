export const users = [
    { id: 'user-1', username: "admin002", password: "123456789", name: "Admin" },
];


export function findUser(username: string, password: string) {
    return users.find((u) => u.username === username && u.password === u.password);
}