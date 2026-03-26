"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Navbar( { isLoggedIn, username, avatar }: { isLoggedIn: boolean, username: string | null, avatar: string | null }) {
    const router = useRouter()
    async function handleClick() {
        const supabase = createClient()

        const {error} = await supabase.auth.signOut()

        if (error) {
            console.log(error)
        } else {
            router.push("/")
            router.refresh()
        }
    }

    return (
        <nav>
          { isLoggedIn ? (
            <div>
                <Link href={`/${username}`}><img src={avatar ?? "profile"} /></Link>
                <button onClick={handleClick}>Sign Out</button>
             </div>
          ) : (
            <Link href="/signin">Sign In</Link>
          )
          }
        </nav>
    )
}