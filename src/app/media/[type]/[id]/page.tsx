import GameDetail from "@/components/detail/GameDetail"
import fetchGameById from "@/lib/igdb/fetchGameById"
import fetchMovieById from "@/lib/tmdb/fetchMovieById"
import { notFound } from "next/navigation"
import MovieDetail from "@/components/detail/MovieDetail"

export default async function Page({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const { type, id } = await params

  if (type === "game") {
    const data = await fetchGameById(id)
    return <GameDetail result={data} />
  }

  if (type === "movie") {
    const data = await fetchMovieById(id)
    return <MovieDetail result={data} />
  }

  return notFound()
}
