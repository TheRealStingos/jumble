interface IGDBCover {
    image_id: string
}

export interface IGDBInvolvedCompany {
    company: {
        name: string
    }
    publisher: boolean
    developer: boolean
}

export interface IGDBGame {
    id: number
    name: string
    first_release_date: number
    cover?: IGDBCover
}

export interface IGDBGameDetail extends IGDBGame{
    involved_companies: IGDBInvolvedCompany[]
    genres: {
        name: string
    }[]
    platforms: {
        name: string
    }[]
    summary?: string
}