import { TvResult } from "@/types/media"
import MediaDetailLayout from "./MediaDetailLayout"

interface TvDetailProps {
  result: TvResult
  isLoggedIn: boolean
}

export default function TvDetail({ result, isLoggedIn }: TvDetailProps) {
  return (
    <MediaDetailLayout result={result} isLoggedIn={isLoggedIn}>
      <section className="">
        <div className="flex justify-between">
          <div>
            <h2 className="text-primary font-semibold">
              Creator:{" "}
              <h2 className="text-secondary font-semibold">{result.creator}</h2>
            </h2>
          </div>
          <div>
            <h2 className="text-primary font-semibold">
              Seasons:{" "}
              <h2 className="text-secondary font-semibold">{result.seasons}</h2>
            </h2>
          </div>
          <div></div>

          <div>
            <p className="text-primary font-semibold">Genre(s):</p>
            {result.genres.map((genre) => (
              <p className="text-secondary font-semibold" key={genre}>
                {genre}
              </p>
            ))}
          </div>
        </div>
        <p className="mt-6 font-semibold">{result.overview}</p>
      </section>
    </MediaDetailLayout>
  )
}
