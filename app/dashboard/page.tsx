"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sampleItems, ClothingItem } from "../../lib/data";

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Safe client-side check
    const userSession = localStorage.getItem("loggedInUser");
    if (!userSession) {
      router.replace("/login");
    } else {
      try {
        setCurrentUser(JSON.parse(userSession));
      } catch (e) {
        localStorage.removeItem("loggedInUser");
        router.replace("/login");
      }
    }
  }, [router]);

  // Prevent SSR hydration mismatch and wait until mounted
  if (!mounted || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-8 h-8 border-4 border-[#ff007f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {currentUser.name}!</h1>
          <p className="text-sm text-gray-500">{currentUser.email}</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            router.replace("/login");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </header>

      <main>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Items for Swap</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleItems.map((item: ClothingItem) => (
            <div 
              key={item.id} 
              onClick={() => router.push(`/item/${item.id}`)}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded mb-2">
                  {item.category}
                </span>
                <h3 className="font-semibold text-gray-800 text-base truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.brand} • Size {item.size}</p>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                  <span className="text-sm font-bold text-blue-600">₹{item.estimatedValue}</span>
                  {/* SAFE FALLBACK FOR USER PROPERTY */}
                  <span className="text-xs text-gray-400 truncate max-w-[120px]">
                    By {typeof item.user === 'object' && item.user ? (item.user as any).name : String(item.user || 'User')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}