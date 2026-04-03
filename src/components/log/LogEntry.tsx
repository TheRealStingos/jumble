"use client"

import { LoggedMedia } from "@/types/media"
import getBadgeColor from "@/utils/mediaBadge"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Rating } from "react-simple-star-rating"
import { TableCell, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"

export default function LogEntry({
  entry,
  username,
}: {
  entry: LoggedMedia
  username: string
}) {
  const router = useRouter()

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/${username}/log/${entry.id}`)}
    >
      <TableCell>
        {new Date(entry.completed_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>
        <Badge className={getBadgeColor(entry.type)}>
          {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>
        <Image
          src={entry.cover ?? ""}
          alt={entry.title}
          width={50}
          height={70}
        />
      </TableCell>
      <TableCell className="text-lg font-semibold">{entry.title}</TableCell>
      <TableCell>
        {entry.release_date ? new Date(entry.release_date).getFullYear() : null}
      </TableCell>
      <TableCell>
        <Rating
          readonly
          initialValue={entry.user_rating ?? 0}
          SVGstyle={{ display: "inline" }}
        />
      </TableCell>
      <TableCell className="max-w-48 truncate">{entry.user_review}</TableCell>
    </TableRow>
  )
}
