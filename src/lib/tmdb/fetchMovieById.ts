import { MediaType } from "@/types/media"
import { TMDBCastMember, TMDBCrewMember, TMDBGenre } from "./tmdbTypes"
import { error } from "console"

if (!process.env.TMDB_API_KEY) throw new Error("Missing TMDB_API_KEY")

export default async function fetchMovieById(id: string) {
  try {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    )

    if (!tmdbResponse.ok) {
      throw new Error(`TMDB Response failed:${tmdbResponse}`)
    }

    const movieData = await tmdbResponse.json()

    const movie = movieData

    const normalized = {
      id: movie.id,
      title: movie.title,
      coverUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      runtime: movie.runtime ?? null,
      genres: movie.genres.map((g: TMDBGenre) => g.name),
      director:
        movie.credits.crew.find((c: TMDBCrewMember) => c.job === "Director") ??
        null,
      overview: movie.overview ?? null,
      cast: movie.credits.cast.slice(0, 3).map((c: TMDBCastMember) => c.name),
      type: "movie" as MediaType,
      releaseDate: movie.release_date,
    }

    return normalized
  } catch {
    console.error("fetchMovieById error:", error)
    throw new Error("Failed Fetch from TMDB")
  }
}
