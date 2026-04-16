import { IGDBInvolvedCompany } from "@/lib/igdb/igdbTypes"

export type MediaType = "game" | "movie" | "music" | "book" | "tv"

// Types for incoming data from external apis
export interface MediaResult {
  id: number
  title: string
  type: MediaType
  coverUrl: string | null
  releaseDate: string
}

export interface GameResult extends MediaResult {
  involved_companies: IGDBInvolvedCompany[]
  genres: { name: string }[]
  platforms: { name: string }[]
  summary: string | null
}

export interface MovieResult extends MediaResult {
  genres: string[]
  overview: string | null
  cast: string[]
  director: string | null
  runtime: number | null
}

export interface TvResult extends MediaResult {
  creator: string | null
  overview: string | null
  genres: string[]
  seasons: number | null
}

// type for internal data coming from Supabase
export interface LoggedMedia {
  media_id?: string
  id: string
  title: string
  cover: string | null
  release_date: string | null
  type: MediaType
  user_rating: number | null
  logged_at: string
  completed_at: string
  user_review: string
}
