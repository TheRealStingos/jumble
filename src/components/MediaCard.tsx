import type { MediaResult } from "@/types/media";
import Image from "next/image";

interface MediaCardProps {
    result: MediaResult
}

export default function MediaCard({ result }: MediaCardProps) {
    return (
        <div>
            <h3>{result.title}</h3>
            {result.coverUrl && <Image 
            src = {result.coverUrl}
            alt = {`${result.title} cover art`}
            width={90}
            height={120}
            />}
            <p>{result.type}</p>
            <p>{result.releaseYear}</p>
        </div>
    )
}