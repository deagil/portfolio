import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata = {
  title: "Dylan Gilchrist",
  description:
    "Software engineer. Writing about design, engineering, and craft.",
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", geist.variable, geistMono.variable)}
    >
      <body>
        <ThemeProvider>
          <SiteHeader />
          {children}
          {modal}
        </ThemeProvider>
      </body>
    </html>
  )
}
