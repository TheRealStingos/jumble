"use client"

import { createClient } from "@/utils/supabase/client"
import imageCompression from "browser-image-compression"
import { useState } from "react"

export default function ProfileSettings( {username, bio, avatar}: { username: string, bio:string | null, avatar: string | null} ) {
    const [newBio, setNewBio] = useState(bio)
    const [newAvatar, setNewAvatar] = useState(avatar)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            fileType: "image/jpeg",
            useWebWorker: true,
        }
        if (!file) return
        imageCompression(file, options).then(compressed => {
         setAvatarFile(compressed)
        })
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const supabase = createClient()
        const {data: {user}} = await supabase.auth.getUser()
        if (!user) {
            return
        }
        const userId = user?.id

        const { error: bioError} = await supabase
            .from("profiles")
            .update({ bio: newBio })
            .eq("id", userId)

            if (bioError) {
                return
            }

        if (avatarFile) {
            const { error: avatarError } = await supabase
                .storage
                .from('avatars')
                .upload(`${userId}/avatar.jpg`, avatarFile, {
                cacheControl: '3600',
                upsert: true
                })
            console.log("user id:", userId)
            console.log("user:", user)

            if (avatarError) {
                console.log(avatarError)
                return
            }

            const { data: { publicUrl } } = supabase
                .storage
                .from('avatars')
                .getPublicUrl(`${userId}/avatar.jpg`)
            
            await supabase
                .from("profiles")
                .update({ avatar: publicUrl })
                .eq("id", userId)

            setNewAvatar(publicUrl)

        }
    }
    
    return (
        <div>
            <input type="text" name="new-bio" id="new-bio" placeholder="Tell us about yourself!" value={newBio ?? ""} onChange={(e) => setNewBio(e.target.value)}/>
            <label htmlFor="new-bio">Bio:</label>

            <img src={newAvatar ?? ""} />

            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <button onClick={handleSubmit}>Save?</button>
        </div>
    )
}