import getValidToken from "@/app/lib/igdb/token"

if (!process.env.TWITCH_CLIENT_ID) throw new Error("Missing TWITCH_CLIENT_ID")
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    if (!query) {
        return Response.json({ error: "Query is required"}, {status: 400})
    }
    const token = await getValidToken()
    try {
        const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Client-ID": TWITCH_CLIENT_ID,
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain"
        },
        body: `search "${query}"; fields name, cover;`
        })

        if(!igdbResponse.ok) {
        throw new Error(`Response Status: ${igdbResponse.status}`)
        }

   
        const igdbSearchData = await igdbResponse.json()

        return Response.json(igdbSearchData)

    } catch {
        return Response.json({ error: "Something went wrong"}, { status:500 })
    }
}