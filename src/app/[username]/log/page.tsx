import { createClient } from "@/utils/supabase/server"
import LogEntry from "@/components/log/LogEntry"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table"

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
    .order("completed_at", { ascending: false })

  if (logError) {
    console.log(logError)
    return
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Cover</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Released</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Review</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {log.map((entry) => (
          <LogEntry key={entry.id} entry={entry} username={username} />
        ))}
      </TableBody>
    </Table>
  )
}
