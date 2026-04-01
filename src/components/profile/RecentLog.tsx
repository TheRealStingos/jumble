"use client"
import { LoggedMedia } from "@/types/media"
import { Badge } from "../ui/badge"
import Image from "next/image"
import { Rating } from "react-simple-star-rating"

export default function RecentLog({ entries }: { entries: LoggedMedia[] }) {
  return (
    <div className="flex flex-row gap-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-card flex w-48 flex-col items-center overflow-hidden rounded-lg p-4"
        >
          <Badge>
            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
          </Badge>
          <h2 className="w-full truncate text-center font-semibold">
            {entry.title} (
            {entry.release_date
              ? new Date(entry.release_date).getFullYear()
              : null}
            )
          </h2>
          <Image
            src={entry.cover ?? ""}
            alt={`${entry.title}`}
            width={200}
            height={200}
            className="h-auto w-full"
          />
          <div className="flex flex-row">
            <Rating
              readonly
              initialValue={entry.user_rating ?? 0}
              SVGstyle={{ display: "inline" }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
