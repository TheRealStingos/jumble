"use client"

import { createClient } from "@/utils/supabase/client"
import imageCompression from "browser-image-compression"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"

export default function ProfileSettings({
  username,
  bio,
  avatar,
}: {
  username: string
  bio: string | null
  avatar: string | null
}) {
  const oldBio = bio
  const [newBio, setNewBio] = useState("")
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
    imageCompression(file, options).then((compressed) => {
      setAvatarFile(compressed)
    })
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return
    }
    const userId = user?.id

    const { error: bioError } = await supabase
      .from("profiles")
      .update({ bio: newBio })
      .eq("id", userId)

    if (bioError) {
      return
    }

    if (avatarFile) {
      const { error: avatarError } = await supabase.storage
        .from("avatars")
        .upload(`${userId}/avatar.jpg`, avatarFile, {
          cacheControl: "3600",
          upsert: true,
        })
      console.log("user id:", userId)
      console.log("user:", user)

      if (avatarError) {
        console.log(avatarError)
        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(`${userId}/avatar.jpg`)

      await supabase
        .from("profiles")
        .update({ avatar: publicUrl })
        .eq("id", userId)

      setNewAvatar(publicUrl)
    }
  }

  return (
    <section className="flex items-center justify-center gap-12 flex-1 h-full w-full">
      <div className="flex bg-card rounded-lg">
        <form className="flex flex-col p-3">
          <label htmlFor="new-bio">Bio:</label>
          <textarea
            name="new-bio"
            id="new-bio"
            placeholder={oldBio ?? "Tell us about yourself!"}
            value={newBio ?? ""}
            onChange={(e) => setNewBio(e.target.value)}
            className="min-h-35"
          />
        </form>
      </div>

      <div className="rounded-lg bg-card flex flex-col p-6">
        <Image src={newAvatar ?? ""} alt="Avatar" width={300} height={300} />

        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        <Button onClick={handleSubmit}>Save?</Button>
      </div>
    </section>
  )
}
