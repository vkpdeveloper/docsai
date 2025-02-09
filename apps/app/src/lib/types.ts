export type Message = {
    id: number
    content: string
    role: "user" | "assistant"
}

export type Conversation = {
    id: number
    title: string
    messages: Message[]
}

export const sampleConversations: Conversation[] = [
    {
        id: 1,
        title: "Getting started with React",
        messages: [
            { id: 1, content: "How do I create a new React project?", role: "user" },
            {
                id: 2,
                content: "To create a new React project, you can use Create React App. Run the following command in your terminal: npx create-react-app my-app",
                role: "assistant",
            },
        ],
    },
    {
        id: 2,
        title: "Understanding hooks",
        messages: [
            { id: 1, content: "Can you explain useEffect?", role: "user" },
            {
                id: 2,
                content: "useEffect is a React Hook that lets you synchronize a component with an external system. It runs after every render by default, but you can customize when it runs.",
                role: "assistant",
            },
        ],
    },
]
