"use client"

import { MediaResult } from "@/types/media"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { Rating } from "react-simple-star-rating"
import { useRouter } from "next/navigation"

interface LogMediaProps {
  result: MediaResult
}

export default function LogMedia({ result }: LogMediaProps) {
  const supabase = createClient()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState("")
  const [isComplete, setIsComplete] = useState(true)
  const [completedAt, setCompletedAt] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [errorMessage, setErrorMessage] = useState("")

  const handleRating = (rate: number) => {
    setUserRating(rate)
  }

  async function handleSubmit() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      throw new Error("You must be signed in")
    }
    const { error } = await supabase.from("media_log").insert({
      user_id: user.id,
      media_id: result.id.toString(),
      title: result.title,
      release_date: result.releaseDate,
      type: result.type,
      cover: result.coverUrl,
      user_rating: userRating,
      user_review: userReview,
      is_complete: isComplete,
      completed_at: completedAt,
    })
    if (error) {
      setErrorMessage("something went wrong, please try again")
      return
    }
    router.push("/")
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Log</button>
      {isOpen && (
        <div>
          <label htmlFor="user-review">Review:</label>
          <input
            name="user-review"
            type="text"
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder="What did you think?"
          ></input>

          <label htmlFor="is-complete">Finished?</label>
          <input
            name="is-complete"
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          ></input>

          <input
            name="completedAt"
            type="date"
            value={completedAt}
            onChange={(e) => setCompletedAt(e.target.value)}
          ></input>

          <div>
            <Rating
              onClick={handleRating}
              initialValue={userRating}
              allowFraction
              SVGstyle={{ display: "inline" }}
            />
            <p>{userRating}</p>
          </div>

          <button onClick={handleSubmit}>Log</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  )
}
