"use client"

import { Activity } from "lucide-react"

export default function ActivityFeed({ activities = [] }: any) {
  return (
    <div className="border border-[#1a1a1a] rounded-xl p-6 bg-[#0e0e0e]">

      <h2 className="text-lg font-semibold mb-6">
        Activity Feed
      </h2>

      {activities.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-12 text-center">

          <Activity className="text-zinc-500 mb-3" size={28} />

          <p className="text-sm text-zinc-400">
            No activity yet
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            Your AI activity will appear here
          </p>

        </div>

      ) : (

        <div className="space-y-4">
          {activities.map((activity: any) => (
            <div key={activity.id}>
              {activity.text}
            </div>
          ))}
        </div>

      )}

    </div>
  )
}