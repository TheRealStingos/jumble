"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import MediaSearch from "./search/MediaSearch"
import Image from "next/image"

export default function Navbar({
  isLoggedIn,
  username,
  avatar,
}: {
  isLoggedIn: boolean
  username: string | null
  avatar: string | null
}) {
  const router = useRouter()
  async function handleClick() {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <nav className="flex justify-between items-center bg-card px-8">
      <Image
        src={"/jumble_logo_puzzle.svg"}
        alt="jumble logo"
        width={300}
        height={200}
      />
      <div className="flex">
        <MediaSearch />
        {isLoggedIn ? (
          <div className="pl-8">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={avatar ?? "profile"} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => router.push(`/${username}`)}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => router.push(`/${username}/log`)}
                >
                  Log
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={handleClick}>Sign Out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link
            href="/signin"
            className="bg-primary flex items-center rounded-lg p-3 ml-6 hover:bg-primary/90 active:scale-95 text-primary-foreground shadow-md font-semibold"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
