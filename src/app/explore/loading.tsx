import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4].map(item => {
            return <Card key={`skeleton_${item}_${Math.random()}`} className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="space-y-2 p-4">
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                </CardContent>
            </Card>
        })}
    </div>
}