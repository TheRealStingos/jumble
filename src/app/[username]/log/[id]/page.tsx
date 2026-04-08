import { createClient } from "@/utils/supabase/server"
import DetailLogEntry from "@/components/log/DetailLogEntry"

export default async function FullEntry({
  params,
}: {
  params: Promise<{ id: string; username: string }>
}) {
  const { id } = await params
  const { username } = await params
  const supabase = await createClient()
  const { data: entry } = await supabase
    .from("media_log")
    .select("*")
    .eq("id", id)
    .single()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isOwner = user?.id === entry?.user_id

  return <DetailLogEntry entry={entry} isOwner={isOwner} username={username} />
}
