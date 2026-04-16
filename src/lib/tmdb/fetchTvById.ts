import { MediaType } from "@/types/media"
import { TMDBCastMember, TMDBGenre } from "./tmdbTypes"

if (!process.env.TMDB_API_KEY) throw new Error("Missing TMDB_API_KEY")

export default async function fetchTvById(id: string) {
  try {
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    })

    if (!tmdbResponse.ok) {
      throw new Error(`TMDB Response failed:${tmdbResponse}`)
    }

    const tvData = await tmdbResponse.json()

    const tv = tvData

    const normalized = {
      id: tv.id,
      title: tv.name,
      coverUrl: tv.poster_path
        ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
        : null,
      genres: tv.genres.map((g: TMDBGenre) => g.name),
      creator: tv.created_by[0]?.name ?? null,
      overview: tv.overview ?? null,
      type: "tv" as MediaType,
      releaseDate: tv.first_air_date,
      seasons: tv.seasons.length,
    }

    return normalized
  } catch {
    console.error("fetchTvById error:", Error)
    throw new Error("Failed Fetch from TMDB")
  }
}
