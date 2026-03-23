import { GameResult } from "@/types/media";
import MediaDetailLayout from "./MediaDetailLayout";

interface GameDetailProps {
    result: GameResult
}


export default function GameDetail({result}: GameDetailProps) {
    const devs = result.involved_companies.filter(c => c.developer)
    const pubs = result.involved_companies.filter(c => c.publisher)

    return (
        <MediaDetailLayout result={result}>
            <div>
                <p>Developers:</p>
                {devs.map((c) => 
                <p key={c.company.name}>{c.company.name}</p>)}
            </div>

            <div>
                <p>Publishers:</p>
                {pubs.map((c) => (
                    <p key={c.company.name}>{c.company.name}</p>
                ))}
            </div>
            
            {result.genres.map((genre) =>(
                <p key={genre.name}>{genre.name}</p>
            ))}

            {result.platforms.map((platform) => (
                <p key={platform.name}>{platform.name}</p>
            ))}
            <p>{result.summary}</p>
        </MediaDetailLayout>
    )
}