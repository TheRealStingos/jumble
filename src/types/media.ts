export type MediaType = "game" | "movie" | "music" | "book" | "tv"

export interface MediaResult {
    id: string;
    title: string;
    type: MediaType;
    coverUrl: string;
    releaseYear: number;
}