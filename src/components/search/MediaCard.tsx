import type { MediaResult } from "@/types/media"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import getBadgeColor from "@/utils/mediaBadge"

interface MediaCardProps {
  result: MediaResult
  onSelect: () => void
}

export default function MediaCard({ result, onSelect }: MediaCardProps) {
  const releaseYear = new Date(result.releaseDate).getFullYear()
  return (
    <div className="">
      <Link
        href={`/media/${result.type}/${result.id}`}
        onClick={onSelect}
        className="flex flex-col items-center"
      >
        <h3 className="w-full truncate px-2 text-center text-lg font-semibold">
          {result.title}
        </h3>
        {result.coverUrl && (
          <Image
            src={result.coverUrl}
            alt={`${result.title} cover art`}
            width={90}
            height={120}
          />
        )}
        <Badge
          variant="default"
          className={`${getBadgeColor(result.type)} my-1`}
        >
          {result.type === "tv"
            ? "TV"
            : result.type.charAt(0).toUpperCase() + result.type.slice(1)}
        </Badge>
        <p className="font-semibold">{releaseYear}</p>
      </Link>
    </div>
  )
}
