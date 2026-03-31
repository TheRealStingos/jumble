"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.log(error)
      return
    }
    if (!data.user) {
      return
    }
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      username,
    })
    if (profileError) {
      console.log(profileError)
    } else {
      // TODO: show error to user instead of console.log
      console.log(data)
      router.push("/")
      router.refresh()
    }
  }

  return (
    <section className="flex flex-col items-center justify-center flex-1">
      <form className="flex flex-col bg-card rounded-lg p-3">
        <label htmlFor="signup-username">Username:</label>

        <input
          type="text"
          id="signup-username"
          name="username"
          placeholder="MediaManiac"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="signup-email">Email Address:</label>
        <input
          type="email"
          id="signup-email"
          name="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="signup-password">Password:</label>
        <input
          type="password"
          id="signup-password"
          name="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
      </form>
    </section>
  )
}
