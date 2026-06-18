import {
  Navbar,
  HeroSection,
  FeaturesSection,
  FeaturedItems,
  CommunitySection,
  Footer,
} from "@/components/landing-components"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FeaturedItems />
      <CommunitySection />
      <Footer />
    </main>
  )
}
