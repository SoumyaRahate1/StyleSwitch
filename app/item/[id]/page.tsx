"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Sparkles,
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Star,
  MessageCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { sampleItems, type ClothingItem } from "@/lib/data"

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [selectedSwapItem, setSelectedSwapItem] = useState<string | null>(null)

  const itemId = params?.id as string

  // Fetch the item directly from sampleItems array safely
  const item = sampleItems.find((i) => i.id === itemId)

  // Filter items by matching the item owner string safely
  const userItems = item 
    ? sampleItems.filter((i) => i.user === item.user && i.id !== item.id) 
    : []

  // Dynamic profile metadata configuration
  const user = item
    ? {
        id: "mock-user-id",
        name: item.user || "Community Swapper",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user || "CS")}&background=random&color=fff&size=150`,
        location: item.location || "India",
        rating: 4.8,
        itemsListed: userItems.length + 1,
        successfulSwaps: 8,
      }
    : null

  // Link copy feature mechanism
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      alert("Product link copied to clipboard! Share it with your friends.")
    }
  }

  if (!item || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Item not found</h1>
          <p className="text-muted-foreground mb-4">This item may have been removed or doesn&apos;t exist.</p>
          <Link href="/browse">
            <Button className="rounded-full bg-[#ff007f] hover:bg-[#e00070] text-white">Browse Items</Button>
          </Link>
        </div>
      </div>
    )
  }

  const imagesArray = item.images && item.images.length > 0 ? item.images : [item.image]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesArray.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length)
  }

  // Ensures mock data is explicitly provided to prevent an empty selection loop
  const myItems = sampleItems.filter((i) => i.user !== item.user).length > 0
    ? sampleItems.filter((i) => i.user !== item.user).slice(0, 4)
    : sampleItems.slice(0, 3)

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#ff007f] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">StyleSwitch</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${isLiked ? "text-[#ff007f]" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              
              {/* FIXED: Added onClick share event handler */}
              <button 
                onClick={handleShareLink}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Share Item Link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
              <img src={imagesArray[currentImageIndex]} alt={item.name} className="w-full h-full object-cover" />
              {imagesArray.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center cursor-pointer">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center cursor-pointer">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{item.name}</h1>
                <div className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">
                  ~₹{item.estimatedValue.toLocaleString('en-IN')}
                </div>
              </div>
              <p className="text-lg text-muted-foreground">{item.brand}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-muted text-foreground font-medium">Size {item.size}</span>
              <span className="px-4 py-2 rounded-full bg-pink-500/10 text-[#ff007f] font-medium">{item.condition}</span>
              <span className="px-4 py-2 rounded-full bg-muted text-foreground font-medium">{item.category}</span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {(item as any).description || `A premium choice high-quality product from ${item.brand}. Offered in ${item.condition} shape for trade exchange.`}
              </p>
            </div>

            {/* Seller Info */}
            <div className="bg-card rounded-2xl border border-border p-4">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover shadow-inner" />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{user.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{user.location}</span>
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{user.rating}</span>
                  </div>
                </div>
                <Link href={`/profile/${encodeURIComponent(user.name)}`}>
                  <Button variant="outline" size="sm" className="rounded-full cursor-pointer">View Profile</Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{user.itemsListed}</div>
                  <div className="text-sm text-muted-foreground">Items Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{user.successfulSwaps}</div>
                  <div className="text-sm text-muted-foreground">Successful Swaps</div>
                </div>
              </div>
            </div>

            {/* Main Action Buttons Frame */}
            <div className="flex gap-3 relative z-40">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowSwapModal(true)
                }}
                type="button"
                className="flex-1 h-14 rounded-xl bg-[#ff007f] hover:bg-[#e00070] text-white text-lg font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] relative z-50"
                style={{ pointerEvents: 'auto' }}
              >
                <RefreshCw className="w-5 h-5" />
                Request Swap
              </button>
              
              <Link href={`/chat/${item.id}?item=${item.id}`} className="relative z-50">
                <Button variant="outline" className="h-14 rounded-xl px-6 cursor-pointer" type="button">
                  <MessageCircle className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Swap Modal Container */}
      {showSwapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
            onClick={() => setShowSwapModal(false)} 
          />
          
          <div className="relative bg-card rounded-3xl border border-border max-w-md w-full overflow-hidden shadow-2xl z-10">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Request a Swap</h2>
              <p className="text-sm text-muted-foreground mt-1">Select an item to offer in return for this listing.</p>
            </div>
            
            <div className="p-6 space-y-3 max-h-[350px] overflow-y-auto relative z-20">
              {myItems.map((myItem) => {
                const modalImg = myItem.images && myItem.images.length > 0 ? myItem.images[0] : myItem.image
                const isSelected = selectedSwapItem === myItem.id

                return (
                  <button
                    key={myItem.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedSwapItem(myItem.id)
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl border text-left cursor-pointer transition-all relative z-30 ${
                      isSelected ? "border-[#ff007f] bg-pink-500/5 ring-2 ring-[#ff007f]" : "border-border hover:border-pink-500/30"
                    }`}
                  >
                    <img src={modalImg} alt="" className="w-14 h-14 rounded-lg object-cover pointer-events-none" />
                    <div className="flex-1 pointer-events-none">
                      <h4 className="font-medium text-sm text-foreground truncate">{myItem.name}</h4>
                      <p className="text-xs text-muted-foreground">Value: ~₹{myItem.estimatedValue}</p>
                    </div>
                    <div className="flex items-center justify-center pr-2 pointer-events-none">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "bg-[#ff007f] border-[#ff007f]" : "border-muted-foreground"}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="p-4 bg-muted/40 border-t border-border flex gap-3 relative z-20">
              <button 
                type="button" 
                onClick={() => setShowSwapModal(false)} 
                className="flex-1 h-11 border border-border rounded-xl text-sm font-medium hover:bg-muted text-foreground bg-card transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedSwapItem}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowSwapModal(false)
                  window.location.assign(`/chat/${item.id}?item=${item.id}&offer=${selectedSwapItem}`)
                }}
                className={`flex-1 h-11 rounded-xl text-sm font-medium transition-all ${
                  selectedSwapItem 
                    ? "bg-[#ff007f] text-white hover:bg-[#e00070] cursor-pointer" 
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                }`}
              >
                Confirm Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}