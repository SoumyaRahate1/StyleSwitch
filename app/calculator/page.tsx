"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calculator, Sparkles, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CalculatorPage() {
  const router = useRouter()
  const [originalPrice, setOriginalPrice] = useState("")
  const [brandTier, setBrandTier] = useState("mid") // budget, mid, luxury
  const [condition, setCondition] = useState("Good")
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null)

  const calculateValue = (e: React.FormEvent) => {
    e.preventDefault()
    const basePrice = parseFloat(originalPrice) || 1500

    // Condition multiplier
    let conditionMultiplier = 0.6
    if (condition === "Like New") conditionMultiplier = 0.8
    else if (condition === "Excellent") conditionMultiplier = 0.7
    else if (condition === "Good") conditionMultiplier = 0.5
    else if (condition === "Fair") conditionMultiplier = 0.3

    // Brand tier multiplier bonus
    let brandBonus = 1.0
    if (brandTier === "luxury") brandBonus = 1.3
    else if (brandTier === "budget") brandBonus = 0.8

    const result = Math.round(basePrice * conditionMultiplier * brandBonus)
    setEstimatedValue(result > 0 ? result : 250)
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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Swap Value Calculator</h1>
          <p className="text-muted-foreground">Estimate your item&apos;s fair trade value instantly before listing</p>
        </div>

        <div className="p-6 sm:p-8 bg-card border border-border rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Fair Trade Valuation</h2>
              <p className="text-sm text-muted-foreground">Based on brand tier and wear condition</p>
            </div>
          </div>

          <form onSubmit={calculateValue} className="space-y-6">
            {/* Original Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Original Purchase Price (₹ approx)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                <Input
                  type="number"
                  placeholder="e.g. 2000"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="h-12 rounded-xl pl-8"
                  required
                />
              </div>
            </div>

            {/* Brand Tier */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Brand Tier</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "budget", label: "Budget / Fast Fashion", desc: "Zara, H&M, etc." },
                  { id: "mid", label: "Mid-Range", desc: "Levi's, Nike, etc." },
                  { id: "luxury", label: "Designer / Luxury", desc: "Gucci, Armani, etc." },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setBrandTier(tier.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      brandTier === tier.id
                        ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm">{tier.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Condition</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Like New", "Excellent", "Good", "Fair"].map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setCondition(cond)}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      condition === cond
                        ? "bg-secondary text-secondary-foreground font-semibold ring-1 ring-secondary-foreground/20"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2">
              Calculate Estimated Value <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Result Display Box */}
          {estimatedValue !== null && (
            <div className="mt-6 p-5 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Recommended Swap Value</p>
                  <h3 className="text-2xl font-bold text-foreground">₹{estimatedValue}</h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Fair Match
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}