import { GameResult } from "@/types/media"
import MediaDetailLayout from "./MediaDetailLayout"

interface GameDetailProps {
  result: GameResult
}

export default function GameDetail({ result }: GameDetailProps) {
  const devs = result.involved_companies.filter((c) => c.developer)
  const pubs = result.involved_companies.filter((c) => c.publisher)

  return (
    <MediaDetailLayout result={result}>
      <section className="">
        <div className="flex gap-20">
          <div className="flex flex-col">
            <p className="text-primary font-semibold">Developers:</p>
            {devs.map((c) => (
              <p className="text-secondary font-semibold" key={c.company.name}>
                {c.company.name}
              </p>
            ))}
          </div>

          <div className="flex flex-col">
            <p className="text-primary font-semibold">Publishers:</p>
            {pubs.map((c) => (
              <p className="text-secondary font-semibold" key={c.company.name}>
                {c.company.name}
              </p>
            ))}
          </div>
          <div>
            <p className="text-primary font-semibold">Genre(s):</p>
            {result.genres.map((genre) => (
              <p className="text-secondary font-semibold" key={genre.name}>
                {genre.name}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="text-primary font-semibold">Platforms:</p>
          <div className="grid grid-cols-2">
            {result.platforms.map((platform) => (
              <p className="text-secondary font-semibold" key={platform.name}>
                {platform.name}
              </p>
            ))}
          </div>
        </div>
        <p className="mt-6 font-semibold">{result.summary}</p>
      </section>
    </MediaDetailLayout>
  )
}
