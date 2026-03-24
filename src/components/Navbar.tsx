"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Navbar( { isLoggedIn }: {isLoggedIn: boolean }) {
    const router = useRouter()
    async function handleClick() {
        const supabase = createClient()

        const {error} = await supabase.auth.signOut()

        if (error) {
            console.log(error)
        } else {
            router.refresh()
            router.push("/")
        }
    }

    return (
        <nav>
          { isLoggedIn ? (
            <button onClick={handleClick}>Sign Out</button>
          ) : (
            <Link href="/signin">Sign In</Link>
          )
          }
        </nav>
    )
}