import RecentLog from "@/components/profile/RecentLog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, avatar, bio")
    .eq("username", username)
    .single()

  if (error) {
    console.log(error)
    return
  }

  const isOwner = user?.id === data.id

  const { data: recentLog } = await supabase
    .from("media_log")
    .select("id, title, cover, type, user_rating, logged_at, release_date")
    .eq("user_id", data.id)
    .order("logged_at", { ascending: false })
    .limit(5)

  return (
    <section className="flex flex-col border border-red-200 h-full w-full flex-1">
      <div className="flex border border-green-600">
        <Avatar>
          <AvatarImage src={data.avatar} />
        </Avatar>
        <div className="flex flex-col">
          <h1>{data.username}</h1>
          <p>{data.bio}</p>
        </div>
        {isOwner && (
          <Button asChild>
            <Link href={`/${username}/settings`}>Edit</Link>
          </Button>
        )}
      </div>

      <div>
        <div>
          <h1>Recent Activity</h1>
          <Button asChild>
            <Link href={`/${username}/log`}>View Log</Link>
          </Button>
          <div>
            <RecentLog entries={recentLog ?? []} />
          </div>
        </div>
      </div>
    </section>
  )
}
