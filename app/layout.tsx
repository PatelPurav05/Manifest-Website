import type React from "react"
import type { Viewport } from "next"
import { Geist } from "next/font/google"
import { Providers } from "@/context"
import { MeshGradientComponent } from "@/components/mesh-gradient"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
})

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Darker blue colors for a more sophisticated look
  const darkBlueColors = [
    "#0a1628", // Very dark navy
    "#1e3a8a", // Dark blue
    "#1e40af", // Medium dark blue
    "#0f172a", // Almost black navy
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased max-w-screen min-h-svh bg-slate-1 text-slate-12`}>
        <Providers defaultTheme="dark" forcedTheme="dark">
          <MeshGradientComponent
            colors={darkBlueColors}
            speed={2.5}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <div className="w-full relative z-[1] flex flex-col min-h-screen">
            <div className="w-full flex flex-col flex-1">
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
