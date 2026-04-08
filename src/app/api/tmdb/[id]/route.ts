import fetchMovieById from "@/lib/tmdb/fetchMovieById"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!id) {
    return Response.json({ error: "Movie ID required" }, { status: 400 })
  }

  const movie = await fetchMovieById(id)
  return Response.json(movie)
}
