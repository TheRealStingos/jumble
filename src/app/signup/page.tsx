"use client"

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        
        const supabase = createClient()
        
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            console.log(error)
        } else {
            console.log(data)
            router.push('/')
        }
    }   


    return (
        <section>
            <form>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="email">Email Address</label>

                <input className="bg-blue-400" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label htmlFor="password">Password</label>

               <button onClick={handleSubmit}>Sign Up</button>
            </form>
        </section>
    )
}

