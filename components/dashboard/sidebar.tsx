"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Sparkles,
  Folder,
  BookOpen,
  Settings,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analyze Repo", href: "/dashboard/analyze", icon: Search },
  { name: "Architect", href: "/dashboard/architect", icon: Sparkles },
  { name: "Projects", href: "/dashboard/projects", icon: Folder },
  { name: "Docs", href: "/dashboard/docs", icon: BookOpen },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-white/10 px-8 py-4 bg-black">
      <div className="p-6 text-lg font-semibold">
        StackLens
      </div>

      <nav className="space-y-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
              ${
                active
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}