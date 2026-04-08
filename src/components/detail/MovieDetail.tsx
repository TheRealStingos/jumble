import { MovieResult } from "@/types/media"
import MediaDetailLayout from "./MediaDetailLayout"

interface MovieDetailProps {
  result: MovieResult
}

export default function MovieDetail({ result }: MovieDetailProps) {
  return (
    <MediaDetailLayout result={result}>
      <section className="">
        <div className="flex justify-between">
          <div>
            <h2 className="text-primary font-semibold">
              Director:{" "}
              <h2 className="text-secondary font-semibold">
                {result.director}
              </h2>
            </h2>
          </div>
          <div>
            <h2 className="text-primary font-semibold">
              Cast:{" "}
              <h2 className="text-secondary font-semibold">
                {result.cast.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </h2>
            </h2>
          </div>
          <div>
            <h2 className="text-primary font-semibold">
              Runtime:{" "}
              <h2 className="text-secondary font-semibold">
                {result.runtime} minutes
              </h2>
            </h2>
          </div>

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
