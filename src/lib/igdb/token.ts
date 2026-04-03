import { createClient } from "@supabase/supabase-js"

if (!process.env.SUPABASE_URL) throw new Error("Missing SUPABASE_URL")
if (!process.env.SUPABASE_SECRET_KEY)
  throw new Error("Missing SUPABASE_SECRET_KEY")
if (!process.env.TWITCH_CLIENT_ID) throw new Error("Missing TWITCH_CLIENT_ID")
if (!process.env.TWITCH_CLIENT_SECRET)
  throw new Error("Missing TWITCH_CLIENT_SECRET")
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function getValidToken() {
  const { data, error } = await supabase
    .from("twitch_token")
    .select("token, expires_at")
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }
  // Buffer of 5 minutes to avoid token expiry mid request
  if (
    !data ||
    Date.now() > new Date(data.expires_at).getTime() - 1000 * 60 * 5
  ) {
    const twitchRes = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    })

    const twitchData = await twitchRes.json()

    const expiresAt = new Date(Date.now() + twitchData.expires_in * 1000)

    const twitchToken = twitchData.access_token

    const { error: upsertError } = await supabase.from("twitch_token").upsert(
      {
        id: 1, // Only ever need 1 row in this table, thus 1 is hardcoded
        token: twitchToken,
        expires_at: expiresAt,
      },
      { onConflict: "id" }
    )
    if (upsertError) throw new Error(upsertError.message)

    return twitchToken
  }

  return data.token
}
