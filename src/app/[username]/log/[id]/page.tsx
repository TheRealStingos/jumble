import { createClient } from "@/utils/supabase/server"
import DetailLogEntry from "@/components/log/DetailLogEntry"

export default async function FullEntry({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: entry } = await supabase
    .from("media_log")
    .select("*")
    .eq("id", id)
    .single()

  return <DetailLogEntry entry={entry} />
}
