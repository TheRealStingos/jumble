import getValidToken from "@/lib/igdb/token"
import { IGDBGameDetail } from "@/lib/igdb/igdbTypes"
import { MediaType } from "@/types/media"

if (!process.env.TWITCH_CLIENT_ID) throw new Error("Missing TWITCH_CLIENT_ID")
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID

export default async function fetchGameById(id: string) {

    const token = await getValidToken()
        try {
            const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                "Client-ID": TWITCH_CLIENT_ID,
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain"
            },
            body: 
            `fields name, cover.image_id, first_release_date, summary, genres.name, platforms.name, involved_companies.company.name, involved_companies.publisher, involved_companies.developer; where id = ${id};`
            })
    
            if (!igdbResponse.ok) {
                throw new Error(`IGDB Request Failed:${igdbResponse.status}`)
            }
    
            const gameData = await igdbResponse.json()
    
            const game: IGDBGameDetail = gameData[0]
    
            const normalized = {
                id: game.id,
                title: game.name,
                coverUrl: game.cover?.image_id 
                    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`
                    : null,
                releaseDate: new Date(game.first_release_date * 1000).toISOString(),
                type: "game" as MediaType,
                involved_companies: game.involved_companies,
                genres: game.genres,
                platforms: game.platforms,
                summary: game.summary ?? null
            }
    
            return normalized
        } catch {
            throw new Error("Failed Fetch from IGDB")
        }

}