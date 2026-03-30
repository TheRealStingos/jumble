import type { Metadata } from "next"
import { Poppins, Merriweather, Space_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { createClient } from "@/utils/supabase/server"

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
})

const fontMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Jumble",
  description: "Your All In One Media Logging App",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("username, avatar")
        .eq("id", user.id)
        .single()
    : { data: null }

  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        {/* Pass user props to navbar */}
        <Navbar
          isLoggedIn={!!user}
          username={profile?.username}
          avatar={profile?.avatar}
        />
        {children}
      </body>
    </html>
  )
}
