export interface TMDBMovie {
  id: number
  title: string
  release_date: string
  poster_path?: string
}

export interface TMDBTv {
  id: number
  name: string
  first_air_date: string
  poster_path?: string
}

export interface TMDBSeason {
  season_number: number
}

export interface TMDBTvDetail extends TMDBTv {
  created_by: TMDBCastMember[]
  genres: TMDBGenre[]
  seasons: number
  overview: string | null
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

export interface TMDBMovieDetail extends TMDBMovie {
  runtime: number | null
  overview: string | null
  director: string | null
  credits: TMDBCredits
  genres: TMDBGenre[]
}
