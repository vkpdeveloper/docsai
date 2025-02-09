import { Button } from "@/components/ui/button"
import { Conversation } from "@/lib/types"
import { Plus } from "lucide-react"

interface SidebarProps {
    conversations: Conversation[]
    currentConversation: Conversation
    onSelectConversation: (conversation: Conversation) => void
    onNewChat: () => void
}

export function Sidebar({
    conversations,
    currentConversation,
    onSelectConversation,
    onNewChat,
}: SidebarProps) {
    return (
        <div className="w-64 bg-muted/50 flex flex-col h-full border-r border-border">
            <div className="p-4">
                <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={onNewChat}
                >
                    <Plus className="mr-2" />
                    New Chat
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {conversations.map((conv) => (
                    <div
                        key={conv.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground ${currentConversation.id === conv.id
                            ? "bg-accent text-accent-foreground"
                            : "bg-card"
                            }`}
                        onClick={() => onSelectConversation(conv)}
                    >
                        <h3 className="font-medium text-sm mb-1">{conv.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {conv.messages[conv.messages.length - 1].content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
