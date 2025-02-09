import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Message } from "@/lib/types"
import { Bot, User } from "lucide-react"

interface ChatAreaProps {
    messages: Message[]
}

export function ChatArea({ messages }: ChatAreaProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                >
                    <Avatar className="mt-1">
                        <AvatarFallback>
                            {message.role === "user" ? (
                                <User className="h-5 w-5" />
                            ) : (
                                <Bot className="h-5 w-5" />
                            )}
                        </AvatarFallback>
                    </Avatar>
                    <div
                        className={`flex-1 overflow-hidden rounded-lg p-4 ${message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                            }`}
                    >
                        <p className="leading-relaxed whitespace-pre-wrap break-words">
                            {message.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
