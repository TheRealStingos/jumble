"use client"

import { MediaResult } from "@/types/media"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { Rating } from "react-simple-star-rating"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

interface LogMediaProps {
  result: MediaResult
}

export default function LogMedia({ result }: LogMediaProps) {
  const supabase = createClient()
  const router = useRouter()

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
    <div className="flex flex-col">
      {/* top */}
      <div className="flex h-full">
        <div className="flex flex-col">
          <label htmlFor="user-review" className="text-secondary font-semibold">
            Review:
          </label>
          <textarea
            name="user-review"
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder="What did you think?"
            className="bg-card m-2 min-h-50"
          ></textarea>
        </div>
        <div className="flex flex-col justify-center gap-10">
          <div className="flex">
            <label
              htmlFor="is-complete"
              className="text-secondary m-4 font-semibold"
            >
              Finished?
            </label>
            <input
              name="is-complete"
              type="checkbox"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            ></input>
          </div>
          <div className="m-4">
            <input
              name="completedAt"
              type="date"
              value={completedAt}
              onChange={(e) => setCompletedAt(e.target.value)}
            ></input>
          </div>
        </div>
      </div>

      {/* bot */}
      <div className="flex flex-col items-center">
        <div>
          <Rating
            onClick={handleRating}
            initialValue={userRating}
            allowFraction
            SVGstyle={{ display: "inline" }}
          />
        </div>

        <Button onClick={handleSubmit}>Log</Button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  )
}
