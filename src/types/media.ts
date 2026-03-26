import { IGDBInvolvedCompany } from "@/lib/igdb/igdbTypes";

export type MediaType = "game" | "movie" | "music" | "book" | "tv"


// Types for incoming data from external apis
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

// type for internal data coming from Supabase
export interface LoggedMedia {
    media_id: string,
    id: string, 
    title: string, 
    cover: string | null, 
    release_date: string | null, 
    type: MediaType, 
    user_rating: number | null, 
    logged_at: string
}