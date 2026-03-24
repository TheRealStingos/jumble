import { MediaResult } from "@/types/media";
import Image from "next/image";
import LogMedia from "../LogMedia";

interface MediaDetailLayoutProps {
    result: MediaResult
    children: React.ReactNode
}

export default function MediaDetailLayout({ result, children }: MediaDetailLayoutProps){
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
            <p>{result.releaseDate}</p>
            {children}
            <LogMedia result={result}></LogMedia>
        </div>
    )
}