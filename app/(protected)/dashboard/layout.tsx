import Sidebar from "@/components/dashboard/sidebar"
import Navbar from "@/components/dashboard/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<div className="flex h-screen text-white relative bg-[#050505]">

  {/* background glow */}

  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-40 left-40 w-[500px] h-[500px] bg-purple-600/20 blur-[200px]" />
    <div className="absolute bottom-40 right-40 w-[500px] h-[500px] bg-cyan-600/20 blur-[200px]" />
  </div>

  <Sidebar />

  <div className="flex flex-col flex-1 relative">

    <Navbar />

    <main className="flex-1 overflow-y-auto p-10">
      {children}
    </main>

  </div>

</div>
  )
}