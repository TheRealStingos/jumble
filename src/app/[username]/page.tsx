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
    <section className="mt-12 flex h-full w-full flex-1 flex-col items-center">
      <div className="flex">
        <Avatar className="h-60 w-fit">
          <AvatarImage src={data.avatar} />
        </Avatar>
        <div className="flex flex-col justify-around">
          <h1 className="text-primary text-2xl font-semibold text-shadow-md">
            {data.username}
          </h1>
          <p className="bg-card max-w-100 rounded-lg p-4">{data.bio}</p>
        </div>
        {isOwner && (
          <Button asChild>
            <Link href={`/${username}/settings`}>Edit</Link>
          </Button>
        )}
      </div>

      <div>
        <div className="mt-16 flex flex-col items-center">
          <h1 className="text-secondary mb-4 text-xl font-bold text-shadow-md">
            Recent Activity
          </h1>
          <div className="flex justify-around">
            <RecentLog entries={recentLog ?? []} />
          </div>
          <Button asChild>
            <Link href={`/${username}/log`}>View Log</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
