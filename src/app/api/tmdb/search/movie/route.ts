import { TMDBMovie } from "@/lib/tmdb/tmdbTypes"

if (!process.env.TMDB_API_KEY) throw new Error("Missing TMDB_API_KEY")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  if (!query) {
    return Response.json({ error: "Query is required" }, { status: 400 })
  }

  try {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    )
    if (!tmdbResponse.ok) {
      const body = await tmdbResponse.text()
      console.error("TMDB error:", tmdbResponse.status, body)
      throw new Error(`Response Status: ${tmdbResponse.status}`)
    }

    const tmdbSearchData = await tmdbResponse.json()

    const normalized = tmdbSearchData.results
      .slice(0, 5)
      .map((movie: TMDBMovie) => ({
        id: movie.id,
        title: movie.title,
        coverUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        releaseDate: movie.release_date,
        type: "movie",
      }))

    return Response.json(normalized)
  } catch (error) {
    console.error("TMDB search error:", error)
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
