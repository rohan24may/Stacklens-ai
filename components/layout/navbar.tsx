"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">

<nav className="flex items-center gap-8 border border-white/10 bg-black/70 backdrop-blur-xl px-6 py-3 rounded-full text-white text-sm shadow-[0_0_40px_rgba(255,255,255,0.08)]">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-light.png"
            alt="StackLens"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">

          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>

          <Link href="/analyze" className="hover:text-gray-300">
            Analyze
          </Link>

          <Link href="/docs" className="hover:text-gray-300">
            Docs
          </Link>

        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-4">

          <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm transition">
            Contact
          </button>

<Link
  href="/sign-up"
className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_16px_rgba(255,255,255,0.3)] transition"
>
  Get Started
</Link>

          <UserButton afterSignOutUrl="/" />

        </div>

      </nav>

    </div>
  );
}