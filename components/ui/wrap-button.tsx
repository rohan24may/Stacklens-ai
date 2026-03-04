import React from "react"
import Link from "next/link"
import { ArrowRight, Globe } from "lucide-react"

import { cn } from "@/lib/utils"

interface WrapButtonProps {
  className?: string
  children: React.ReactNode
  href?: string
}

const WrapButton: React.FC<WrapButtonProps> = ({
  className,
  children,
  href,
}) => {
  return (
    <div className="flex items-center justify-center">
      {href ? (
        <Link href={href}>
          <div
            className={cn(
              "group cursor-pointer border group border-[#3B3A3A] bg-[#151515] gap-2  h-[64px] flex items-center p-[11px] rounded-full",
              className
            )}
          >
<div className="border border-white/20 bg-white text-black font-mono h-[43px] rounded-full flex items-center justify-center">
  <p className="font-medium tracking-tight mr-3 ml-2 flex items-center gap-2 justify-center">
    <Globe className="animate-spin text-black" size={16} />
    {children}
  </p>
</div>
<div className="text-white/70 group-hover:ml-2 transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-white/20">
              <ArrowRight
                size={18}
                className="group-hover:rotate-45 ease-in-out transition-all "
              />
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={cn(
            "group cursor-pointer border group border-[#3B3A3A] bg-[#151515] gap-2  h-[64px] flex items-center p-[11px] rounded-full",
            className
          )}
        >
<div className="border border-white/20 bg-white text-black font-mono h-[43px] rounded-full flex items-center justify-center">
            <Globe className="mx-2 animate-spin text-black" />
            <p className="font-medium tracking-tight mr-3">
              {children ? children : "Get Started"}
            </p>
          </div>
          <div className="text-white/70 group-hover:ml-2 transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-white/20">
            <ArrowRight
              size={18}
              className="group-hover:rotate-45 ease-in-out transition-all "
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default WrapButton