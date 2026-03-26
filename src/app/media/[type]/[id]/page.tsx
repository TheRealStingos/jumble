import GameDetail from "@/components/detail/GameDetail"
import fetchGameById from "@/lib/igdb/fetchGameById"
import { notFound } from "next/navigation"

export default async function Page({
  params,
}: {
  params: Promise<{ type: string, id: string }>
}) {
  const { type, id } = await params

  if (type === "game") {

      const data = await fetchGameById(id)
      return (
        <GameDetail result={data}/>
      )

  }
  
  return notFound()
  

}