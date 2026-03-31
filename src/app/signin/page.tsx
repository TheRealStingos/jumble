"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
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
    <section className="flex flex-col items-center justify-center flex-1">
      <form className="flex flex-col bg-card rounded-lg p-3">
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
        <div className="flex justify-center">
          <Button onClick={handleSubmit}>Sign in</Button>
        </div>
      </form>
      <p className="text-muted-foreground text-sm">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-primary font-semibold hover:text-accent"
        >
          Sign up
        </Link>
      </p>
    </section>
  )
}
