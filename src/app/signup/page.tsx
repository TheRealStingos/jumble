"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)
  const router = useRouter()
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (!email || !password || !username) {
      setError("Please fill in all fields")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (error) {
      setError(error.message)
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
      setProfileError(profileError.message)
    } else {
      // TODO: show error to user instead of console.log
      console.log(data)
      router.push("/")
      router.refresh()
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <form className="bg-card flex flex-col rounded-lg p-3">
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
        <div className="flex flex-col justify-center">
          {error && <p className="text-primary">{error}</p>}
          {profileError && <p className="text-primary">{profileError}</p>}
          <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
      </form>
    </section>
  )
}
