"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:border-cyan-400/30",
        className
      )}
    >
      {/* spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(56,189,248,0.25), transparent 40%)`,
        }}
      />

      {/* card content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}