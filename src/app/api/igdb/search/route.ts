import { IGDBGame } from "@/lib/igdb/igdbTypes"
import getValidToken from "@/lib/igdb/token"

if (!process.env.TWITCH_CLIENT_ID) throw new Error("Missing TWITCH_CLIENT_ID")
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  if (!query) {
    return Response.json({ error: "Query is required" }, { status: 400 })
  }
  const token = await getValidToken()
  try {
    const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
      body: `search "${query}"; fields name, cover.image_id, first_release_date; where version_parent = null;`,
    })

    if (!igdbResponse.ok) {
      throw new Error(`Response Status: ${igdbResponse.status}`)
    }

    const igdbSearchData = await igdbResponse.json()

    const normalized = igdbSearchData.map((game: IGDBGame) => ({
      id: game.id,
      title: game.name,
      coverUrl: game.cover?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`
        : null,
      releaseDate: new Date(game.first_release_date * 1000),
      type: "game",
    }))

    return Response.json(normalized)
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
