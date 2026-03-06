import Sidebar from "@/components/dashboard/sidebar";
import Navbar from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-black text-white flex overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-black">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex flex-1 flex-col">

        {/* Top Navbar */}
        <div className="h-16 border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-50">
          <Navbar />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-black to-neutral-950">
          <div className="p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>

      </div>

    </div>
  );
}