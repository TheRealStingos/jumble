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
import { Button } from "./ui/button"

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
    <nav className="bg-card flex items-center justify-around border-b-2 px-8">
      <Link href={"/"} className="flex">
        <h1 className="text-primary text-4xl font-bold text-shadow-black text-shadow-xs">
          J
        </h1>
        <h1 className="text-secondary text-4xl font-bold text-shadow-black text-shadow-xs">
          umble
        </h1>
      </Link>
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
          <Button asChild className="mt-3 ml-3">
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
