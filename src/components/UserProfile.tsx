"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Prompt } from "@/type";
import { Card, CardContent, CardHeader } from "./ui/card";
import { User } from "@/lib/users";
import { Button } from "./ui/button";
import { PencilIcon } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState<User>();
  const [bookmarkedPrompts, setBookmarkedPrompts] = useState([]);

  useEffect(() => {
    // call api to check bookmark
    fetchUserProfile();
    fetchBookmarked();
  }, []);

  const fetchUserProfile = async () => {
    const res = await fetch("http://localhost:3000/api/user/me/");
    const json = await res.json();
    setUser(json.user);
  };

  const fetchBookmarked = async () => {
    const res = await fetch("http://localhost:3000/api/bookmark/");
    const json = await res.json();
    setBookmarkedPrompts(json.bookmarkedPrompts);
  };

  // Make sure user already login

  // /user/me
  // => valid => show user profike
  // invalid => go to login page

  //  id: 'user-1', username: "admin002", password: "123456789", name: "Admin"

  // bookmarked section: list all topic => need an api

  // 18:30 | 21:30
  if (!user) {
    return <>Loading!</>;
  }
  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* {user && <p>{JSON.stringify(user)}</p>}
      {bookmarkedPrompts && <p>{JSON.stringify(bookmarkedPrompts)}</p>} */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-6">
        <div className="col-span-2 text-center">
          <Card>
            <CardHeader className="justify-center">
              <div className="relative profile-avatar">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                  className="w-[100px] h-[100px] rounded"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-gray-200 flex justify-center items-center">
                  <PencilIcon />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul>
                <li className="text-lg font-bold">{user.username}</li>
                <li>{user.name}</li>
              </ul>
              <Button className="mt-2">Logout</Button>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {bookmarkedPrompts.map((post: Prompt) => (
              <PromptCard key={post.id} prompt={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
