import { Prompt } from "@/type";
import { Card, CardContent } from "./ui/card";


export default function PromptCard(props: { prompt: Prompt }) {
    const { prompt } = props;
    return <Card className="hover:shadow-md transition-all cursor-pointer">
        <CardContent className="space-y-2 p-4">
            <h3 className="text-lg font-semibold line-clamp-1">{prompt.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{prompt.body}</p>
            <p className="text-xs text-gray-500">👤 Người đăng: user-{prompt.userId}</p>
        </CardContent>
    </Card>
}