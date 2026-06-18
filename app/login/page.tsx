"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sampleUsers } from "@/lib/data" 

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const inputEmail = email.trim().toLowerCase()
      const user = sampleUsers.find((u: any) => u.email.trim().toLowerCase() === inputEmail)

      if (user) {
        // Save session locally
        localStorage.setItem("loggedInUser", JSON.stringify(user))
        
        // Fail-safe routing fallback trigger
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard"
        } else {
          router.replace("/dashboard")
        }
      } else {
        setError("This email address is not registered with StyleSwitch.")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Routing connection error. Please use localhost:3000")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-[#ff007f] flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">StyleSwitch</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Log in to continue swapping fits</p>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl text-black"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 rounded-xl text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#ff007f] hover:bg-[#e00070] text-white text-lg flex items-center justify-center cursor-pointer transition-all"
            >
              {isLoading ? "Logging in..." : "Log In"} 
              {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>
        </div>
      </div>

       {/* Right side - Image/Gradient */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200')] bg-cover bg-center mix-blend-overlay opacity-50" />
        <div className="relative flex items-center justify-center p-12">
          <div className="text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4 text-balance">Good fits don&apos;t gatekeep</h2>
            <p className="text-xl opacity-90">Join 10,000+ swappers refreshing their wardrobes sustainably</p>
          </div>
        </div>
      </div>
    </div>
  )
}