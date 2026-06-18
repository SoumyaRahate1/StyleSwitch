"use client"

import Link from "next/link"
import { ArrowLeft, Leaf, ShieldCheck, Users, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 group transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">
            About StyleSwitch
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are building a sustainable fashion revolution by turning your closet into your currency.
          </p>
        </div>

        {/* Deep Dive Section */}
        <div className="bg-card border border-border rounded-3xl p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">What is StyleSwitch?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            StyleSwitch is an online peer-to-peer clothing swap network created to stop fashion gatekeeping and break the cycle of fast fashion. Instead of spending thousands on outfits you might only wear a few times, our platform enables you to safely trade clothes you no longer wear for fresh, exciting pieces from nearby fashion enthusiasts.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By shifting from a transactional "buying and selling" ecosystem to a purely collaborative "swapping" network, we extend the active lifestyle lifecycle of high-quality clothing items, dramatically cut down on structural manufacturing waste, and democratize fashion.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-muted/30 border border-border rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Banknote className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">100% Cashless</h3>
            <p className="text-sm text-muted-foreground leading-normal">
              No credit cards, no sales tax, no hidden transactional balances. You trade item value for item value directly.
            </p>
          </div>

          <div className="p-6 bg-muted/30 border border-border rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Zero Eco Waste</h3>
            <p className="text-sm text-muted-foreground leading-normal">
              Every single swap diverts pre-loved clothing elements directly away from toxic chemical landfills and waste treatment streams.
            </p>
          </div>

          <div className="p-6 bg-muted/30 border border-border rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Community Driven</h3>
            <p className="text-sm text-muted-foreground leading-normal">
              Connect locally with style-matched users in your city, coordinate drop-offs securely, and build neighborhood relationships.
            </p>
          </div>
        </div>

        {/* CTA Area */}
        <div className="text-center bg-primary/5 rounded-3xl border border-primary/10 p-8">
          <h3 className="text-xl font-bold mb-2">Ready to clear your closet?</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of active swappers saving coins and reducing CO2 emissions right now.
          </p>
          <Link href="/browse">
            <Button size="lg" className="rounded-full px-8">Browse the Closet</Button>
          </Link>
        </div>

      </div>
    </div>
  )
}