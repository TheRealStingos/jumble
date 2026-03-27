import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

export default async function MediaLog({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single()

  if (error) {
    console.log(error)
    return
  }

  const userId = data.id

  const { data: log, error: logError } = await supabase
    .from("media_log")
    .select(
      "title, cover, user_rating, user_review, completed_at, media_id, type, release_date, logged_at, id"
    )
    .eq("user_id", userId)

  if (logError) {
    console.log(logError)
    return
  }
  return (
    <div>
      {log.map((entry) => (
        <div key={entry.id}>
          <div>
            <img src={entry.cover} />{" "}
            {/* TODO: Change to Image during styling */}
          </div>
          <p>{entry.type}</p>
          <Link href={`/media/${entry.type}/${entry.media_id}`}>
            <p>{entry.title}</p>
          </Link>
          <p>
            {entry.release_date
              ? new Date(entry.release_date).getFullYear()
              : "Unknown"}
          </p>
          <p>{entry.user_rating}</p>
          <p>{entry.user_review}</p>
          <p>{entry.logged_at}</p>
        </div>
      ))}
    </div>
  )
}
