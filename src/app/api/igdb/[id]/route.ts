import fetchGameById from "@/lib/igdb/fetchGameById"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!id) {
    return Response.json({ error: "Game ID required" }, { status: 400 })
  }

  const game = await fetchGameById(id)
  return Response.json(game)
}
