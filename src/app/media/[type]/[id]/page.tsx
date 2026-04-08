import GameDetail from "@/components/detail/GameDetail"
import fetchGameById from "@/lib/igdb/fetchGameById"
import fetchMovieById from "@/lib/tmdb/fetchMovieById"
import { notFound } from "next/navigation"
import MovieDetail from "@/components/detail/MovieDetail"
import { createClient } from "@/utils/supabase/server"

export default async function Page({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const { type, id } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (type === "game") {
    const data = await fetchGameById(id)
    return <GameDetail result={data} isLoggedIn={!!user} />
  }

  if (type === "movie") {
    const data = await fetchMovieById(id)
    return <MovieDetail result={data} isLoggedIn={!!user} />
  }

  return notFound()
}
