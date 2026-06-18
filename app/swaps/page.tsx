"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Sparkles,
  ArrowLeft,
  Check,
  X,
  Clock,
  RefreshCw,
  MessageCircle,
  ChevronRight,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { sampleItems, sampleUsers, type SwapRequest } from "@/lib/data"

// Extended sample swap requests for this page
const swapRequests: (SwapRequest & {
  fromUser: typeof sampleUsers[0]
  toUser: typeof sampleUsers[0]
  offeredItem: typeof sampleItems[0]
  requestedItem: typeof sampleItems[0]
})[] = [
  {
    id: "swap-1",
    fromUserId: "user-2",
    toUserId: "user-1",
    offeredItemId: "item-2",
    requestedItemId: "item-1",
    status: "pending",
    message: "Hey! Love your denim jacket. Would you be interested in swapping for my blazer?",
    createdAt: "2024-05-29",
    fromUser: sampleUsers[1],
    toUser: sampleUsers[0],
    offeredItem: sampleItems[1],
    requestedItem: sampleItems[0],
  },
  {
    id: "swap-2",
    fromUserId: "user-4",
    toUserId: "user-1",
    offeredItemId: "item-4",
    requestedItemId: "item-5",
    status: "pending",
    message: "That cashmere sweater is gorgeous! I have these cargo pants that might be a fair trade.",
    createdAt: "2024-05-28",
    fromUser: sampleUsers[3],
    toUser: sampleUsers[0],
    offeredItem: sampleItems[3],
    requestedItem: sampleItems[4],
  },
  {
    id: "swap-3",
    fromUserId: "user-1",
    toUserId: "user-3",
    offeredItemId: "item-1",
    requestedItemId: "item-3",
    status: "accepted",
    message: "Love the floral dress! Would you swap for my denim jacket?",
    createdAt: "2024-05-25",
    fromUser: sampleUsers[0],
    toUser: sampleUsers[2],
    offeredItem: sampleItems[0],
    requestedItem: sampleItems[2],
  },
  {
    id: "swap-4",
    fromUserId: "user-3",
    toUserId: "user-1",
    offeredItemId: "item-7",
    requestedItemId: "item-12",
    status: "completed",
    message: "Your linen pants would be perfect for summer! Want to swap for my crossbody bag?",
    createdAt: "2024-05-20",
    fromUser: sampleUsers[2],
    toUser: sampleUsers[0],
    offeredItem: sampleItems[6],
    requestedItem: sampleItems[11],
  },
  {
    id: "swap-5",
    fromUserId: "user-1",
    toUserId: "user-4",
    offeredItemId: "item-5",
    requestedItemId: "item-6",
    status: "rejected",
    message: "Would love to swap my cashmere for your vintage band tee!",
    createdAt: "2024-05-18",
    fromUser: sampleUsers[0],
    toUser: sampleUsers[3],
    offeredItem: sampleItems[4],
    requestedItem: sampleItems[5],
  },
]

type FilterType = "all" | "incoming" | "outgoing" | "pending" | "accepted" | "completed" | "rejected"

export default function SwapsPage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [requests, setRequests] = useState(swapRequests)

  // Current user is user-1 (Sarah Kim)
  const currentUserId = "user-1"

  const filteredRequests = requests.filter(req => {
    if (filter === "all") return true
    if (filter === "incoming") return req.toUserId === currentUserId
    if (filter === "outgoing") return req.fromUserId === currentUserId
    return req.status === filter
  })

  const handleAccept = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: "accepted" as const } : req
      )
    )
  }

  const handleReject = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: "rejected" as const } : req
      )
    )
  }

  const handleComplete = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: "completed" as const } : req
      )
    )
  }

  const getStatusColor = (status: SwapRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-secondary text-secondary-foreground"
      case "rejected":
        return "bg-destructive/10 text-destructive"
    }
  }

  const getStatusIcon = (status: SwapRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "accepted":
        return <RefreshCw className="w-4 h-4" />
      case "completed":
        return <Check className="w-4 h-4" />
      case "rejected":
        return <X className="w-4 h-4" />
    }
  }

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "incoming", label: "Incoming" },
    { value: "outgoing", label: "Outgoing" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "completed", label: "Completed" },
  ]

  const stats = {
    pending: requests.filter(r => r.status === "pending" && (r.toUserId === currentUserId || r.fromUserId === currentUserId)).length,
    accepted: requests.filter(r => r.status === "accepted" && (r.toUserId === currentUserId || r.fromUserId === currentUserId)).length,
    completed: requests.filter(r => r.status === "completed" && (r.toUserId === currentUserId || r.fromUserId === currentUserId)).length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">StyleSwitch</span>
            </Link>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Swap Requests</h1>
          <p className="text-muted-foreground">Manage your incoming and outgoing swap requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="text-3xl font-bold text-foreground">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="text-3xl font-bold text-foreground">{stats.accepted}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="text-3xl font-bold text-foreground">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Swap Requests List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => {
              const isIncoming = request.toUserId === currentUserId
              const otherUser = isIncoming ? request.fromUser : request.toUser
              const theirItem = isIncoming ? request.offeredItem : request.requestedItem
              const myItem = isIncoming ? request.requestedItem : request.offeredItem

              return (
                <div
                  key={request.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={otherUser.avatar}
                          alt={otherUser.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{otherUser.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {isIncoming ? "wants to swap with you" : "received your request"}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{request.createdAt}</span>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>

                    {/* Items Comparison */}
                    <div className="flex items-center gap-4">
                      {/* Their Item */}
                      <Link href={`/item/${theirItem.id}`} className="flex-1 group">
                        <div className="bg-muted rounded-xl p-3 flex items-center gap-3 hover:bg-muted/80 transition-colors">
                          <img
                            src={theirItem.images[0]}
                            alt={theirItem.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">
                              {isIncoming ? "They offer" : "You want"}
                            </p>
                            <h4 className="font-medium text-foreground truncate">{theirItem.name}</h4>
                            <p className="text-sm text-muted-foreground">~₹{theirItem.estimatedValue.toLocaleString('en-IN')}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>

                      <RefreshCw className="w-5 h-5 text-muted-foreground flex-shrink-0" />

                      {/* My Item */}
                      <Link href={`/item/${myItem.id}`} className="flex-1 group">
                        <div className="bg-muted rounded-xl p-3 flex items-center gap-3 hover:bg-muted/80 transition-colors">
                          <img
                            src={myItem.images[0]}
                            alt={myItem.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">
                              {isIncoming ? "For your" : "You offer"}
                            </p>
                            <h4 className="font-medium text-foreground truncate">{myItem.name}</h4>
                            <p className="text-sm text-muted-foreground">~₹{myItem.estimatedValue.toLocaleString('en-IN')}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    </div>

                    {/* Message */}
                    {request.message && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-xl">
                        <p className="text-sm text-muted-foreground italic">&ldquo;{request.message}&rdquo;</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                      {request.status === "pending" && isIncoming && (
                        <>
                          <Button
                            onClick={() => handleAccept(request.id)}
                            className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleReject(request.id)}
                            className="flex-1 rounded-xl"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </>
                      )}
                      {request.status === "pending" && !isIncoming && (
                        <Button variant="outline" className="flex-1 rounded-xl" disabled>
                          <Clock className="w-4 h-4 mr-2" />
                          Waiting for response
                        </Button>
                      )}
                      {request.status === "accepted" && (
                        <>
                          <Link href={`/chat/${request.id}`} className="flex-1">
                            <Button variant="outline" className="w-full rounded-xl">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Chat
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleComplete(request.id)}
                            className="flex-1 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Mark Complete
                          </Button>
                        </>
                      )}
                      {request.status === "completed" && (
                        <div className="flex-1 text-center text-sm text-secondary font-medium">
                          Swap completed successfully!
                        </div>
                      )}
                      {request.status === "rejected" && (
                        <div className="flex-1 text-center text-sm text-muted-foreground">
                          This request was declined
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No swap requests</h3>
              <p className="text-muted-foreground mb-6">Start browsing to find items you love!</p>
              <Link href="/browse">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Browse Items
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
