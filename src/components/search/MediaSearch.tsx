"use client"

import useDebounce from "@/hooks/useDebounce";
import type { MediaResult } from "@/types/media";
import { useEffect, useState } from "react";
import MediaCard from "./MediaCard";


export default function MediaSearch() {
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<MediaResult[]>([])
    const [error, setError] = useState<string | null>(null)

    const debouncedQuery = useDebounce(query, 300)

    useEffect(() =>{
        if (!debouncedQuery || debouncedQuery === "") {
            return
        }

        async function search() {
            setError(null)
            setLoading(true)
            try {
                const apiResponse = await fetch(`/api/igdb/search?query=${debouncedQuery}`)
                if (!apiResponse.ok) {
                    throw new Error (`Response Status: ${apiResponse.status}`)
                }
                const data =  await apiResponse.json()
                setResults(data)
            } catch {
                setError("Sorry, something went wrong")
            } finally {
                setLoading(false)

            }
        }

        search()
    }, [debouncedQuery])


    return (
    <div>
        <input type="text" id="search" name="search" placeholder="search" value={query} onChange={(e) => setQuery(e.target.value)}></input>
        {error && <p>{error}</p>}
        {loading &&<p>Loading...</p>}
        {debouncedQuery && results.length === 0 && !loading && <p>No results found</p>}
        {results.map((result) => (
            <MediaCard key={result.id} result={result} />
        ))}
    </div>
    )
}