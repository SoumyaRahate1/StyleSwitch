"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Send, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sampleItems } from "@/lib/data"

export default function ChatDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const chatId = params?.id as string
  const targetItemId = searchParams?.get("item")
  const offeredItemId = searchParams?.get("offer")

  // Find target swap item if it exists
  const targetItem = sampleItems.find((i) => i.id === targetItemId)
  const offeredItem = sampleItems.find((i) => i.id === offeredItemId)

  const partnerName = targetItem?.user || "Community Swapper"
  const partnerAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(partnerName)}&background=random&color=fff&size=100`

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "them",
      text: targetItem 
        ? `Hey there! I saw your interest in my ${targetItem.name}. Are you down to swap?`
        : "Hey there! Are you down to swap?",
      time: "4:15 PM"
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "me",
        text: newMessage,
        time: "4:17 PM"
      }
    ])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-1 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <img src={partnerAvatar} alt="" className="w-10 h-10 rounded-full" />
            <div>
              <h1 className="font-bold text-foreground text-sm sm:text-base">{partnerName}</h1>
              <p className="text-xs text-green-500 font-medium">Online</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
          </Link>
        </div>
      </header>

      {/* Contextual Swap Offer Card Banner */}
      {targetItem && (
        <div className="bg-muted/40 border-b border-border p-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex items-center -space-x-2 flex-shrink-0">
                <img src={targetItem.images?.[0] || targetItem.image} alt="" className="w-10 h-10 rounded-lg object-cover ring-2 ring-background" />
                {offeredItem && (
                  <img src={offeredItem.images?.[0] || offeredItem.image} alt="" className="w-10 h-10 rounded-lg object-cover ring-2 ring-background" />
                )}
              </div>
              <div className="text-xs sm:text-sm truncate">
                <span className="font-medium text-foreground">Swap Proposed:</span>{" "}
                <span className="text-muted-foreground">
                  {offeredItem ? `${offeredItem.name} for ${targetItem.name}` : targetItem.name}
                </span>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center gap-1 whitespace-nowrap">
              <RefreshCw className="w-3 h-3" /> Proposed
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-5xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.sender === "me" 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-card border border-border text-foreground rounded-tl-none"
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[10px] block text-right mt-1 ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input Field */}
      <div className="p-4 bg-background border-t border-border">
        <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your swap terms message..."
            className="rounded-xl h-12"
          />
          <Button type="submit" size="icon" className="h-12 w-12 rounded-xl flex-shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}