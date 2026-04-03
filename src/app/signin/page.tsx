"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("Incorrect Email or Password")
      return
    } else {
      console.log(data)
      router.push("/")
      router.refresh()
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <form className="bg-card flex flex-col rounded-lg p-3">
        <label htmlFor="signin-email">E-Mail:</label>
        <input
          type="email"
          id="signin-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
        />

        <label htmlFor="signin-password">Password:</label>
        <input
          type="password"
          id="signin-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*****"
        />
        <div className="flex flex-col justify-center">
          {error && <p className="text-primary">{error}</p>}
          <Button onClick={handleSubmit}>Sign in</Button>
        </div>
      </form>
      <p className="text-muted-foreground text-sm">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-primary hover:text-accent font-semibold"
        >
          Sign up
        </Link>
      </p>
    </section>
  )
}
