"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Conversation, Message, sampleConversations } from "@/lib/types"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { ChatArea } from "@/components/chat-area"

export default function Home() {
    const [selectedDoc, setSelectedDoc] = useState("React Documentation")
    const [conversations, setConversations] = useState<Conversation[]>(sampleConversations)
    const [currentConversation, setCurrentConversation] = useState<Conversation>(conversations[0])
    const [input, setInput] = useState("")

    const handleNewChat = () => {
        const newConversation: Conversation = {
            id: conversations.length + 1,
            title: "New Chat",
            messages: [],
        }
        setConversations([newConversation, ...conversations])
        setCurrentConversation(newConversation)
    }

    const handleTrainModel = async (url: string) => {
        // Implement training logic here
        await new Promise(resolve => setTimeout(resolve, 2000))
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const newMessage: Message = {
            id: currentConversation.messages.length + 1,
            content: input,
            role: "user",
        }

        const updatedConversation = {
            ...currentConversation,
            messages: [...currentConversation.messages, newMessage],
            title: currentConversation.messages.length === 0 ? input : currentConversation.title,
        }

        setCurrentConversation(updatedConversation)
        setConversations(
            conversations.map((conv) =>
                conv.id === currentConversation.id ? updatedConversation : conv
            )
        )
        setInput("")

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: updatedConversation.messages.length + 1,
                content: `This is a sample response to: "${input}"`,
                role: "assistant",
            }
            const conversationWithAiResponse = {
                ...updatedConversation,
                messages: [...updatedConversation.messages, aiResponse],
            }
            setCurrentConversation(conversationWithAiResponse)
            setConversations(
                conversations.map((conv) =>
                    conv.id === currentConversation.id ? conversationWithAiResponse : conv
                )
            )
        }, 1000)
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                conversations={conversations}
                currentConversation={currentConversation}
                onSelectConversation={setCurrentConversation}
                onNewChat={handleNewChat}
            />

            <div className="flex-1 flex flex-col">
                <Navbar
                    selectedDoc={selectedDoc}
                    onSelectDoc={setSelectedDoc}
                    onTrainModel={handleTrainModel}
                />

                <ChatArea messages={currentConversation.messages} />

                <div className="p-4 border-t border-border">
                    <form onSubmit={handleSendMessage} className="flex gap-2 max-w-3xl mx-auto">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={
                                currentConversation.messages.length === 0
                                    ? `Ask a question about ${selectedDoc}`
                                    : "Type your message..."
                            }
                            className="flex-grow"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
