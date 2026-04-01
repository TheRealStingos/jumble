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
          className="flex flex-col bg-card rounded-lg p-4 min-w-50 items-center"
        >
          <Badge>
            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
          </Badge>
          <div className="flex justify-around">
            <h2 className="font-semibold truncate">
              {entry.title} (
              {entry.release_date
                ? new Date(entry.release_date).getFullYear()
                : null}
              )
            </h2>
          </div>
          <Image
            src={entry.cover ?? ""}
            alt={`${entry.title}`}
            width={200}
            height={200}
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
