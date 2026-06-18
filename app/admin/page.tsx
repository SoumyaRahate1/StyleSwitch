"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Sparkles,
  Users,
  Package,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Search,
  MoreVertical,
  Eye,
  Ban,
  Trash2,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Activity,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sampleUsers, sampleItems } from "@/lib/data"

// Admin stats
const stats = {
  totalUsers: 10542,
  activeUsers: 8231,
  totalListings: 52847,
  activeListings: 45123,
  totalSwaps: 28456,
  pendingSwaps: 342,
  reportedItems: 12,
  reportedUsers: 3,
}

// Fixed reported items configuration with robust property-level fallback guards
const reportedItems = [
  {
    id: "report-1",
    item: sampleItems?.[0] || { id: "err-1", name: "Loading...", images: ["/placeholder.jpg"], userName: "" },
    reporter: sampleUsers?.[1] || { id: "u-err-1", name: "User" },
    reason: "Misleading photos",
    description: "The item condition appears much worse than described in the listing.",
    date: "2024-05-29",
    status: "pending",
  },
  {
    id: "report-2",
    item: sampleItems?.[2] || { id: "err-2", name: "Loading...", images: ["/placeholder.jpg"], userName: "" },
    reporter: sampleUsers?.[3] || { id: "u-err-2", name: "User" },
    reason: "Counterfeit item",
    description: "This appears to be a fake designer item being sold as authentic.",
    date: "2024-05-28",
    status: "pending",
  },
  {
    id: "report-3",
    item: sampleItems?.[5] || { id: "err-3", name: "Loading...", images: ["/placeholder.jpg"], userName: "" },
    reporter: sampleUsers?.[2] || { id: "u-err-3", name: "User" },
    reason: "Inappropriate content",
    description: "Item description contains inappropriate language.",
    date: "2024-05-27",
    status: "resolved",
  },
]

type TabType = "overview" | "users" | "listings" | "reports"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [reports, setReports] = useState(reportedItems)

  const handleResolveReport = (reportId: string) => {
    setReports(prev =>
      prev.map(r => r.id === reportId ? { ...r, status: "resolved" } : r)
    )
  }

  const handleDismissReport = (reportId: string) => {
    setReports(prev =>
      prev.map(r => r.id === reportId ? { ...r, status: "dismissed" } : r)
    )
  }

  // Safe fallback to an empty array if data fails to fetch or import as expected
  const safeUsers = sampleUsers || []
  const safeItems = sampleItems || []

  const filteredUsers = safeUsers.filter(user =>
    searchQuery === "" ||
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredItems = safeItems.filter(item =>
    searchQuery === "" ||
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">StyleSwitch</span>
              </Link>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-border mb-8">
          {[
            { value: "overview", label: "Overview", icon: Activity },
            { value: "users", label: "Users", icon: Users },
            { value: "listings", label: "Listings", icon: Package },
            { value: "reports", label: "Reports", icon: AlertTriangle, badge: reports.filter(r => r.status === "pending").length },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as TabType)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.value
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-secondary font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12%
                  </span>
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Package className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <span className="text-xs text-secondary font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8%
                  </span>
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.totalListings.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Listings</div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <span className="text-xs text-secondary font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +15%
                  </span>
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.totalSwaps.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Completed Swaps</div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.reportedItems + stats.reportedUsers}</div>
                <div className="text-sm text-muted-foreground">Pending Reports</div>
              </div>
            </div>

            {/* Activity Chart Placeholder */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">Platform Activity</h2>
                <select className="bg-muted rounded-lg px-3 py-1.5 text-sm text-foreground">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-xl">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Activity chart would render here</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">Recent Users</h2>
                <div className="space-y-4">
                  {safeUsers.slice(0, 4).map((user: any) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.location}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{user.joinedAt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">Recent Listings</h2>
                <div className="space-y-4">
                  {safeItems.slice(0, 4).map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item?.images?.[0] || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand} · ${item.estimatedValue}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.createdAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-11 rounded-full bg-muted border-0"
                />
              </div>
              <Button variant="outline" className="rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">User</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Location</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Items</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Swaps</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Rating</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Joined</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user: any) => (
                      <tr key={user.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-medium text-foreground">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.location}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{user.itemsListed}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{user.successfulSwaps}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{user.rating}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinedAt}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="View user">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Ban user">
                              <Ban className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="More options">
                              <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-11 rounded-full bg-muted border-0"
                />
              </div>
              <Button variant="outline" className="rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item?.images?.[0] || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button className="p-1.5 rounded-lg bg-background/80 hover:bg-background transition-colors" aria-label="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-background/80 hover:bg-background text-destructive transition-colors" aria-label="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand} · ${item.estimatedValue}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={item.userAvatar}
                        alt={item.userName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-muted-foreground">{item.userName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                Pending Reports ({reports.filter(r => r.status === "pending").length})
              </h2>
              <Button variant="outline" className="rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className={`bg-card rounded-2xl border p-6 ${
                    report.status === "pending" ? "border-destructive/30" : "border-border"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={report.item?.images?.[0] || "/placeholder.jpg"}
                      alt={report.item?.name || "Reported Item"}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-bold text-foreground">{report.item?.name || "Unknown Item"}</h3>
                          <p className="text-sm text-muted-foreground">
                            Listed by {(report.item as any)?.userName || "Unknown"} · Reported by {report.reporter?.name || "Anonymous"}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : report.status === "resolved"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </div>
                      <div className="mb-3">
                        <span className="text-sm font-medium text-destructive">{report.reason}</span>
                        <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                        {report.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDismissReport(report.id)}
                              className="rounded-full"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Dismiss
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleResolveReport(report.id)}
                              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Take Action
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {reports.filter(r => r.status === "pending").length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending reports to review</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}