import { IGDBInvolvedCompany } from "@/lib/igdb/igdbTypes";

export type MediaType = "game" | "movie" | "music" | "book" | "tv"

export interface MediaResult {
    id: number;
    title: string;
    type: MediaType;
    coverUrl: string | null;
    releaseDate: string;
}

export interface GameResult extends MediaResult {
    involved_companies: IGDBInvolvedCompany[];
    genres: { name:string }[];
    platforms: {name:string }[];
    summary: string | null
}
