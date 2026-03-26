import { createClient } from "@/utils/supabase/server"
import Link from "next/link"


export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, avatar, bio")
    .eq("username", username)
    .single()

    if (error) {
        console.log(error)
        return
    }



    return (
        <div>
            <img src={data.avatar ?? ""} />
            <p>{data.username}</p>
            <p>{data.bio}</p>
            <Link href={`/${username}/log`}><p>Media Log</p></Link> 
            <Link href={`/${username}/settings`}><p>profile settings</p></Link>
        </div>
    )
}