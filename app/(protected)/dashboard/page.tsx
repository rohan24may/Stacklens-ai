import ActionGrid from "@/components/dashboard/action-grid"
import StatsOverview from "@/components/dashboard/stats-overview"
import RecentProjects from "@/components/dashboard/recent-projects"
import ActivityFeed from "@/components/dashboard/activity-feed"

export default function DashboardPage() {

  const projects: any[] = []
  const activities: any[] = []

  return (
    <div className="space-y-10 max-w-7xl mx-auto">

      <ActionGrid />

      <StatsOverview />

      <div className="grid grid-cols-3 gap-6">

        <RecentProjects projects={projects} />

        <ActivityFeed activities={activities} />

      </div>

    </div>
  )
}