import type { MediaResult } from "@/types/media";
import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
    result: MediaResult
}

export default function MediaCard({ result }: MediaCardProps) {
    return (
        <div>
            <Link href={`/media/${result.type}/${result.id}`}>
                <h3>{result.title}</h3>
                {result.coverUrl && <Image 
                src = {result.coverUrl}
                alt = {`${result.title} cover art`}
                width={90}
                height={120}
                />}
                <p>{result.type}</p>
                <p>{result.releaseDate}</p>
            </Link>
        </div>
    )
}