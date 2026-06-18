"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Sparkles,
  ArrowRight,
  Leaf,
  Heart,
  RefreshCw,
  MapPin,
  MessageCircle,
  Users,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">StyleSwitch</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse
            </Link>
            <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Browse
              </Link>
              <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                How it Works
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/login">
                  <Button variant="ghost" className="w-full rounded-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-8">
          <Leaf className="w-4 h-4" />
          <span>Sustainable Fashion Revolution</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
          Good fits don&apos;t{" "}
          <span className="text-primary">gatekeep</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          Swap clothes with your community. Discover new styles. Reduce waste. All without spending a dime.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/signup">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg animate-pulse-glow">
              Start Swapping <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/browse">
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2">
              Browse Fits
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "10K+", label: "Active Swappers" },
            { number: "50K+", label: "Items Listed" },
            { number: "25K+", label: "Successful Swaps" },
            { number: "100T", label: "CO2 Saved" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.number}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = [
    {
      icon: RefreshCw,
      title: "Swap, Don't Shop",
      description: "Exchange clothes directly with other users. No money involved, just pure style sharing.",
      color: "bg-primary",
    },
    {
      icon: MapPin,
      title: "Local Matches",
      description: "Find swappers near you for easy meetups. Or ship nationwide for rare finds.",
      color: "bg-secondary",
    },
    {
      icon: MessageCircle,
      title: "Chat & Negotiate",
      description: "Connect directly with other swappers. Discuss details, negotiate fair trades.",
      color: "bg-accent",
    },
    {
      icon: Heart,
      title: "Value Calculator",
      description: "Our smart algorithm suggests fair swaps based on brand, condition, and style.",
      color: "bg-primary",
    },
  ]

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            How StyleSwitch Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Three simple steps to refresh your wardrobe sustainably
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedItems() {
  const items = [
    {
      id: 1,
      name: "Classic Nike Tshirt",
      brand: "Nike",
      size: "M",
      condition: "Excellent",
      value: 2200,
      image: "https://images.unsplash.com/photo-1666910800969-9b68cd1ac34e?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: "Anaya S.",
      location: "Chennai",
    },
    {
      id: 2,
      name: "Oversized Grey Sweatshirt",
      brand: "H&M",
      size: "S",
      condition: "Like New",
      value: 1500,
      image: "https://images.unsplash.com/photo-1692558588426-3d0b83ccaabe?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: "Soumya P.",
      location: "Bengaluru",
    },
    {
      id: 3,
      name: "Printed Anarkali Kurta set",
      brand: "FabIndia",
      size: "M",
      condition: "Good",
      value: 2500,
      image: "https://images.unsplash.com/photo-1669196582366-8ddd42222370?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: "Shikha R.",
      location: "Hyderabad",
    },
    {
      id: 4,
      name: "Cargo Pants",
      brand: "Roadster",
      size: "L",
      condition: "Excellent",
      value: 2500,
      image: "https://images.unsplash.com/photo-1766575694179-e159f786d2e3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: "Noah V.",
      location: "New Delhi",
    },
    {
  id: 5,
  name: "Classic Leather Jacket",
  brand: "ZARA",
  size: "L",
  condition: "Like New",
  value: 3200,
  image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  user: "Taraksh K.",
  location: "Mumbai",
},
{
  id: 6,
  name: "Cropped Black Blazer",
  brand: "Uniqlo",
  size: "S",
  condition: "Excellent",
  value: 4100,
  image: "https://images.unsplash.com/photo-1702904651130-817572ca1ab7?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  user: "Deshna M.",
  location: "Nagpur",
}
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
              Fresh Drops
            </h2>
            <p className="text-muted-foreground">Recently listed items ready to swap</p>
          </div>
          <Link href="/browse">
            <Button variant="outline" className="rounded-full">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/item/${item.id}`}>
              <div className="group bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                    ~₹{item.value.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-1 truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.brand} · {item.size}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {item.condition}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CommunitySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>Join 10,000+ Swappers</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Be Part of the Movement
          </h2>
          <p className="text-xl text-muted-foreground mb-10 text-pretty">
            Every swap is a small act of rebellion against fast fashion. Together, we&apos;re building a more sustainable future, one outfit at a time.
          </p>
          <Link href="/signup">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
              Join StyleSwitch Today <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StyleSwitch</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Good fits don&apos;t gatekeep. Join the sustainable fashion revolution.
            </p>
          </div>
      </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/browse" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Browse Items</Link></li>
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-foreground text-sm transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div className="mt-4">
  <h4 className="font-bold text-foreground mb-4">Legal</h4>
  <ul className="space-y-2">
    <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</Link></li>
    <li><Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms of Service</Link></li>
  </ul>
</div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">About Us</Link></li>
          
            </ul>
          </div>

        

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; 2026 StyleSwitch. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="TikTok">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
