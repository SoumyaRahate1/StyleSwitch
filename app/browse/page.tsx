"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, SlidersHorizontal, Grid, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sampleItems } from "@/lib/data"

export default function BrowsePage() {
  // 1. State Managers for Interactive Controls
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Newest First")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Ethnic"]

  // 2. Filter Logic
  const filteredItems = sampleItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // 3. Sorting Logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "Value: Low to High") {
      return a.estimatedValue - b.estimatedValue
    }
    if (sortBy === "Value: High to Low") {
      return b.estimatedValue - a.estimatedValue
    }
    // Default: Newest First (Fallback safe array reverse or ID matching)
    return Number(b.id) - Number(a.id)
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Navigation */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">StyleSwitch</span>
          </Link>
          
          {/* Dynamic Interactive Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search by name, brand, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-4 rounded-full bg-muted border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link 
  href="/list" 
  className="px-4 py-2 bg-[#ff007f] text-white rounded-full text-sm font-medium hover:bg-[#e00070] transition-colors"
>
  List Item
</Link>
            <Link href="/dashboard"><Button size="sm" variant="ghost">Dashboard</Button></Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Pills Slider */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Toolbar Controls */}
        <div className="flex items-center justify-between my-4 relative">
          <Button variant="outline" className="rounded-xl flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </Button>

          <div className="text-sm text-muted-foreground font-medium">
            {sortedItems.length} items found
          </div>

          {/* Custom Interactive Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-xl flex items-center gap-2 hover:bg-secondary/80"
            >
              {sortBy} <span className="text-xs">▼</span>
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
                {["Newest First", "Value: Low to High", "Value: High to Low"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option)
                      setShowSortDropdown(false)
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-muted font-medium transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Clothes Grid */}
        {sortedItems.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border mt-4">
            <p className="text-muted-foreground font-medium">No clothes match your selected filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {sortedItems.map((item) => (
              <Link href={`/item/${item.id}`} key={item.id} className="group cursor-pointer">
                <div className="bg-card rounded-2xl border border-border overflow-hidden transition-all group-hover:shadow-md">
                  <div className="relative aspect-[3/4] bg-muted">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 px-2.5 py-1 bg-background/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground">
                      ~₹{item.estimatedValue.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-foreground truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.brand} · Size {item.size}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}