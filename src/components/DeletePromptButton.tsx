"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function DeletePromptButton({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        await fetch(`https://dummyjson.com/posts/${id}`, {
            method: "DELETE",
        });

        router.push("/explore");
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">🗑️ Xoá Prompt</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xoá prompt này?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Thao tác này không thể hoàn tác. Bạn có chắc chắn muốn xoá không?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Huỷ</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Đồng ý</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}