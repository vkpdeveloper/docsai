import { ChevronDown, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface NavbarProps {
    selectedDoc: string
    onSelectDoc: (doc: string) => void
    onTrainModel: (url: string) => Promise<void>
}

export function Navbar({ selectedDoc, onSelectDoc, onTrainModel }: NavbarProps) {
    const [trainingUrl, setTrainingUrl] = useState("")
    const [isTraining, setIsTraining] = useState(false)

    const handleTrain = async () => {
        setIsTraining(true)
        await onTrainModel(trainingUrl)
        setIsTraining(false)
        setTrainingUrl("")
    }

    return (
        <nav className="bg-card shadow-sm px-4 py-3 flex justify-between items-center border-b border-border">
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            {selectedDoc}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                        <DropdownMenuItem onClick={() => onSelectDoc("React Documentation")}>
                            React Documentation
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSelectDoc("Next.js Documentation")}>
                            Next.js Documentation
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSelectDoc("Tailwind CSS Documentation")}>
                            Tailwind CSS Documentation
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon" variant="outline" className="h-9 w-9">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Train on New Documentation</DialogTitle>
                            <DialogDescription>
                                Add a new documentation source to enhance the AI&apos;s knowledge base.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Enter documentation URL..."
                                value={trainingUrl}
                                onChange={(e) => setTrainingUrl(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleTrain}
                                disabled={!trainingUrl || isTraining}
                                className="w-full sm:w-auto"
                            >
                                {isTraining ? "Training..." : "Start Training"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">John Doe</span>
                <Avatar>
                    <AvatarFallback>
                        <User className="h-5 w-5" />
                    </AvatarFallback>
                </Avatar>
            </div>
        </nav>
    )
}
