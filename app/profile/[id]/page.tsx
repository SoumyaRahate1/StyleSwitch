"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sampleItems } from "@/lib/data"

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const profileId = params?.id as string

  const isMock = profileId === "mock-user-id"
  const userItem = sampleItems.find((item: any) => item.user) as any
  const userName = isMock ? (userItem?.user || "Sneha Rao") : decodeURIComponent(profileId)

  // Filter out listings belonging to this specific seller
  const userItems = sampleItems.filter((item: any) => item.user === userName)

  const profileData = {
    name: userName,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff&size=200`,
    location: (userItems[0] as any)?.location || "India",
    rating: 4.8,
    successfulSwaps: 8,
    bio: `Fashion enthusiast and active community swapper. Looking to trade premium items and promote sustainable fashion.`
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">StyleSwitch</span>
            </Link>
            <div className="w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <img src={profileData.avatar} alt={profileData.name} className="w-24 h-24 rounded-full object-cover shadow-inner" />
            <div className="flex-1 space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{profileData.name}</h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profileData.location}</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{profileData.rating} Rating</span>
              </div>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">{profileData.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border max-w-sm mx-auto sm:mx-0">
            <div className="text-center sm:text-left sm:border-r border-border">
              {/* FIXED DYNAMIC LENGTH CORRECTION HERE */}
              <div className="text-2xl font-bold text-foreground">{userItems.length}</div>
              <div className="text-sm text-muted-foreground">Items Listed</div>
            </div>
            <div className="text-center sm:pl-6">
              <div className="text-2xl font-bold text-foreground">{profileData.successfulSwaps}</div>
              <div className="text-sm text-muted-foreground">Successful Swaps</div>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">{profileData.name}&apos;s Closet</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {userItems.map((userItem: any) => {
              const imgSource = userItem.images && userItem.images.length > 0 ? userItem.images[0] : userItem.image
              return (
                <Link key={userItem.id} href={`/item/${userItem.id}`}>
                  <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all shadow-sm">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      <img src={imgSource} alt={userItem.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-background/90 text-foreground text-xs font-bold">
                        ~₹{userItem.estimatedValue.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-sm truncate">{userItem.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{userItem.brand} · {userItem.size}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}