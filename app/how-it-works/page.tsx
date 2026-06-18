"use client"

import Link from "next/link"
import { ArrowLeft, Upload, Search, RefreshCw, MessageSquare, ShieldCheck } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 group transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">
            How StyleSwitch Works
          </h1>
          <p className="text-xl text-muted-foreground">
            Swapping outfits is simple. No buying, no selling, just pure lifestyle exchanges.
          </p>
        </div>

        {/* The Core 4-Step Grid Flow */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          {/* Step 1 */}
          <div className="flex gap-4 p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1">Step One</span>
              <h3 className="text-lg font-bold text-foreground mb-1">Upload Your Pre-loved Fits</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Take bright, crisp photos of clean clothes you no longer wear. Specify the brand, size, precise condition, location, and its approximate fair value to build your catalog.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1">Step Two</span>
              <h3 className="text-lg font-bold text-foreground mb-1">Discover Matches Locally</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use our deep filters to sort items by category, condition, size, and nearby locations. Find exactly what fits your wardrobe's next look.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1">Step Three</span>
              <h3 className="text-lg font-bold text-foreground mb-1">Propose an Equal-Value Swap</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Found something you like? Tap "Request Swap" and select an item from *your own* listed catalog to offer back in return. Our system displays estimated value indicators to ensure trades are balanced.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 p-6 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1">Step Four</span>
              <h3 className="text-lg font-bold text-foreground mb-1">Chat & Coordinate Handover</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Once the other user accepts your swap offer, an instant direct message window unlocks. Discuss meet-up locations, trade parameters, or delivery tracking terms cleanly and securely.
              </p>
            </div>
          </div>

        </div>

        {/* Safety Measures Alert Block */}
        <div className="p-6 bg-muted/40 rounded-3xl border border-border flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-1">Trading Securely with StyleSwitch Safety Guidelines</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              To keep our community safe, monetary monetization or cash sales are strictly forbidden. Always use the built-in app chat system to record your exchange parameters, check user verifications, and choose well-lit, public environments when executing local swap items face-to-face.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}