import UserProfile from "@/components/UserProfile";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function ProfilePage() {
  // Make sure user already login

  // /user/me
  // => valid => show user profike
  // invalid => go to login page

  //  id: 'user-1', username: "admin002", password: "123456789", name: "Admin"

  // bookmarked section: list all topic => need an api

  // 18:30 | 21:30
  // get token from cookie?
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    verifyToken(token);
  } catch {
    redirect("/login");
  }

  return <UserProfile />;
}
