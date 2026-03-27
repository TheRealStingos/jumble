"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

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
    <section>
      <form>
        <input
          type="text"
          id="signup-username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="signup-username">Username</label>

        <input
          type="email"
          id="signup-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="signup-email">Email Address</label>

        <input
          className="bg-blue-400"
          type="password"
          id="signup-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="signup-password">Password</label>

        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </section>
  )
}
