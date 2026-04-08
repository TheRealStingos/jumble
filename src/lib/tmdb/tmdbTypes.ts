export interface TMDBMovie {
  id: number
  title: string
  release_date: string
  poster_path?: string
}

export interface TMDBGenre {
  id: number
  name: string
}

export interface TMDBCastMember {
  name: string
  profile_path: string | null
}

export interface TMDBCrewMember {
  name: string
  job: string
}

export interface TMDBCredits {
  cast: TMDBCastMember[]
  crew: TMDBCrewMember[]
}

export interface TMDBDetail extends TMDBMovie {
  runtime: number | null
  overview: string | null
  director: string | null
  credits: TMDBCredits
  genres: TMDBGenre[]
}
