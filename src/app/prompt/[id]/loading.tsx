import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    // Skeleton shadcn 18:10 | 21:10
    return <div className="rounded shadow p-3 mt-5">
        <div className="max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
            <div className="flex gap-3">
                <Skeleton className="h-[20px] w-[40px] rounded-full" />
                <Skeleton className="h-[20px] w-[40px] rounded-full" />
                <Skeleton className="h-[20px] w-[40px] rounded-full" />
            </div>
            <Skeleton className="h-[30px] w-[200px] rounded-full" />
            <Skeleton className="h-[30px] w-[250px] rounded-full" />

            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Skeleton className="h-[20px] w-[50px] rounded-full" />

                </div>
                <Skeleton className="h-[20px] w-[30px] rounded-full" />
            </div>
        </div>
    </div>
}