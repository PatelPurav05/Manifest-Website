'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// Constants for sizing
const LINK_WIDTH = 90
const PADDING = 24
const BACKGROUND_PADDING = 20

// NavbarLink component
export const NavbarLink = ({
  href,
  children,
  isActive,
  onSelect,
}: {
  href: string
  children: React.ReactNode
  isActive?: boolean
  onSelect?: (href: string) => void
}) => {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={`relative text-sm font-medium py-1 px-3 transition-colors duration-200 text-slate-12 w-[90px] flex items-center justify-center
        ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
      onClick={() => onSelect?.(href)}
    >
      {children}
    </Link>
  )
}

// NavbarLinkBackground component
export const NavbarLinkBackground = ({ activeIndex }: { activeIndex: number }) => {

  return (
    <div
      className={clsx(
        'absolute transition-all duration-200 ease-in-out h-7 rounded-full bg-slate-3'
      )}
      style={{
        width: `90px`,
        left: `calc((${activeIndex} * 90px) + 4px)`,
      }}
    />
  )
}
