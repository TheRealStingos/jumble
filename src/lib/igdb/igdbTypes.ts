interface IGDBCover {
    image_id: string
}

export interface IGDBGame {
    id: number
    name: string
    first_release_date: number
    cover?: IGDBCover
}