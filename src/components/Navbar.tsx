"use client"

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
    const router = useRouter()
    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const supabase = createClient()

        const {error} = await supabase.auth.signOut()

        if (error) {
            console.log(error)
        } else {
            router.push("/")
        }
    }

    return (
        <nav>
            <button onClick={handleClick}>Sign Out</button>
        </nav>
    )
}