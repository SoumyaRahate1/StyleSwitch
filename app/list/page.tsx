"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Upload,
  X,
  Camera,
  ArrowLeft,
  Plus,
  Tag,
  Ruler,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type ClothingItem } from "@/lib/data"

const categories: ClothingItem["category"][] = [
  "Tops",
  "Bottoms",
  "Dresses",
  "Outerwear",
  "Ethnic"
]

const conditions: ClothingItem["condition"][] = [
  "Like New",
  "Excellent",
  "Good",
  "Fair",
]

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "5", "6", "7", "8", "9", "10", "11", "12"]

export default function ListItemPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "" as ClothingItem["category"] | "",
    size: "",
    condition: "" as ClothingItem["condition"] | "",
    estimatedValue: "",
    description: "",
    tags: "",
  })

  // FIXED: Compress images before converting to Base64 to prevent QuotaExceededError
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const img = new Image()
          img.src = event.target?.result as string
          img.onload = () => {
            const canvas = document.createElement("canvas")
            const MAX_WIDTH = 500
            const MAX_HEIGHT = 500
            let width = img.width
            let height = img.height

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }

            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext("2d")
            ctx?.drawImage(img, 0, 0, width, height)
            
            // Compressed data url
            const dataUrl = canvas.toDataURL("image/jpeg", 0.7)
            setImages(prev => [...prev, dataUrl].slice(0, 5))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.category || !formData.condition) {
      alert("Please select a category and condition before listing!")
      return
    }
    
    setIsSubmitting(true)
    
    const newItem = {
      id: "item-" + Date.now(),
      userId: "user-1",
      user: "You (Current User)",
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      size: formData.size,
      condition: formData.condition,
      estimatedValue: Number(formData.estimatedValue) || 0,
      description: formData.description,
      images: images,
      image: images[0] || "",
      createdAt: new Date().toISOString(),
    }

    try {
      const existingItems = JSON.parse(localStorage.getItem("user_custom_items") || "[]")
      localStorage.setItem("user_custom_items", JSON.stringify([newItem, ...existingItems]))
    } catch (error) {
      alert("Storage is full! Please clear some old items.")
      setIsSubmitting(false)
      return
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    
    router.push("/dashboard?listed=true")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">StyleSwitch</span>
            </Link>
            <div className="w-16" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">List an Item</h1>
          <p className="text-muted-foreground">Share your clothes with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Photos (up to 5)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                  <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-xs">Add Photo</span>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Item Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Vintage Denim Jacket"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="brand" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Brand
              </label>
              <Input
                id="brand"
                placeholder="e.g., Levi's, Zara, Vintage"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="h-12 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Category & Size */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      formData.category === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="size" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Size
              </label>
              <select
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full h-12 rounded-xl border border-input bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              >
                <option value="">Select size</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Condition</label>
            <div className="flex flex-wrap gap-2">
              {conditions.map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => setFormData({ ...formData, condition: cond })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.condition === cond
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Value */}
          <div className="space-y-2">
            <label htmlFor="value" className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="font-semibold text-sm">₹</span>
              Estimated Swap Value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
              <Input
                id="value"
                type="number"
                placeholder="0"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                className="h-12 rounded-xl pl-8"
                min="1"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Info className="w-3 h-3" />
              This helps match you with fair swaps. Check similar items for reference.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Tell swappers about your item - fit, wear history, styling tips..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tags (comma separated)
            </label>
            <Input
              id="tags"
              placeholder="e.g., vintage, denim, 90s, streetwear"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>

          {/* Submit Action Block */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 h-12 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || images.length === 0}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? "Listing..." : "List Item"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}