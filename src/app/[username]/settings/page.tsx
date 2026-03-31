import ProfileSettings from "@/components/settings/ProfileSettings"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("username, bio, avatar")
    .eq("id", user.id)
    .single()

  if (error) {
    console.log(error)
    return
  }
  const verifiedUsername = data.username

  if (username !== verifiedUsername) {
    redirect("/")
  }

  return (
    <div className="flex flex-1">
      <ProfileSettings
        username={data.username}
        bio={data.bio}
        avatar={data.avatar}
      />
    </div>
  )
}
