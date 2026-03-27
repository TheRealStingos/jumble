"use client"

import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log(error)
    } else {
      // TODO: show error to user instead of console.log
      console.log(data)
      router.push("/")
      router.refresh()
    }
  }

  return (
    <section>
      <form>
        <input
          type="email"
          id="signin-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="signin-email">email</label>

        <input
          type="password"
          id="signin-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="signin-password">password</label>
        <button onClick={handleSubmit}>sign in</button>
      </form>
    </section>
  )
}
