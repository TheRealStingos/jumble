import type { MediaResult } from "@/types/media"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

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
        <h3 className="text-lg font-semibold text-center">{result.title}</h3>
        {result.coverUrl && (
          <Image
            src={result.coverUrl}
            alt={`${result.title} cover art`}
            width={90}
            height={120}
          />
        )}
        <Badge variant="default" className="my-1">
          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
        </Badge>
        <p className="font-semibold">{releaseYear}</p>
      </Link>
    </div>
  )
}
