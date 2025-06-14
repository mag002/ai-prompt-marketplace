// Connect to DB
// prompts
export const prompts: any[] = [
    {
        id: 1,
        title: 'example',
        body: 'ok'
    }
];

export function addPrompt(data: any) {
    const newPrompt = { ...data, id: prompts.length + 1 };
    prompts.push(newPrompt);
    return newPrompt;
}

export function getPrompt(id: number) {
    return prompts.find(p => p.id === id);
}


// prompt/1
// prompt/2 
// prompt/[id]/route.ts