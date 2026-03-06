import { GitBranch, Sparkles, Folder, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-10">

      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, Rohan 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Analyze repositories and architect new systems with AI.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium">
          + New Project
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/40 transition cursor-pointer">
          <GitBranch className="text-blue-400 mb-4" size={28} />
          <h3 className="font-semibold">Analyze GitHub Repo</h3>
          <p className="text-sm text-gray-400 mt-1">
            Paste a repository link and let AI explain the codebase.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/40 transition cursor-pointer">
          <Sparkles className="text-blue-400 mb-4" size={28} />
          <h3 className="font-semibold">Architect Project</h3>
          <p className="text-sm text-gray-400 mt-1">
            Turn your idea into a full system architecture.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/40 transition cursor-pointer">
          <Folder className="text-blue-400 mb-4" size={28} />
          <h3 className="font-semibold">Browse Projects</h3>
          <p className="text-sm text-gray-400 mt-1">
            View previous analyses and architectures.
          </p>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400">Projects Analyzed</p>
          <h2 className="text-2xl font-semibold mt-2">12</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400">Architectures Generated</p>
          <h2 className="text-2xl font-semibold mt-2">5</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-sm text-gray-400">Total AI Runs</p>
          <h2 className="text-2xl font-semibold mt-2">23</h2>
        </div>

      </div>

      {/* Recent Projects */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Recent Projects</h2>
          <Activity size={18} className="text-gray-400" />
        </div>

        <table className="w-full text-sm">

          <thead className="text-gray-400">
            <tr className="text-left border-b border-white/10">
              <th className="pb-3">Project</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-300">

            <tr className="border-b border-white/10">
              <td className="py-3">Next.js Repo</td>
              <td>Repo Analysis</td>
              <td className="text-green-400">Completed</td>
            </tr>

            <tr className="border-b border-white/10">
              <td className="py-3">SaaS Builder</td>
              <td>Architecture</td>
              <td className="text-green-400">Completed</td>
            </tr>

            <tr>
              <td className="py-3">Stripe System</td>
              <td>Architecture</td>
              <td className="text-yellow-400">Processing</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}