"use client"

import Image from "next/image"
import getBadgeColor from "@/utils/mediaBadge"
import { Badge } from "@/components/ui/badge"
import { Rating } from "react-simple-star-rating"
import { LoggedMedia } from "@/types/media"

export default function DetailLogEntry({ entry }: { entry: LoggedMedia }) {
  return (
    <section className="mt-20 flex h-fit w-screen justify-center">
      <div className="bg-card flex max-w-300 gap-20 rounded-lg p-4">
        <div className="flex flex-col items-center gap-2">
          <Badge className={getBadgeColor(entry.type)}>
            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
          </Badge>
          <Image
            src={entry.cover ?? ""}
            alt="cover art"
            height={200}
            width={200}
          />
        </div>
        <div>
          <p className="text-md text-accent mb-2 text-shadow-sm">
            {new Date(entry.completed_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <div className="flex gap-6">
            <h2 className="text-primary text-xl font-semibold text-shadow-md">
              {entry.title}
            </h2>
            <h2 className="text-secondary text-xl text-shadow-md">
              {new Date(entry.release_date ?? "").getFullYear()}
            </h2>
          </div>
          <div>
            <Rating
              readonly
              initialValue={entry.user_rating ?? 0}
              SVGstyle={{ display: "inline" }}
            />
            <p>{entry.user_review}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
