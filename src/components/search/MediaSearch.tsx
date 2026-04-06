"use client"

import useDebounce from "@/hooks/useDebounce"
import type { MediaResult } from "@/types/media"
import { useEffect, useState } from "react"
import MediaCard from "./MediaCard"

export default function MediaSearch() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<MediaResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery === "") {
      setResults([])
      return
    }

    async function search() {
      setError(null)
      setLoading(true)
      try {
        const apiResponse = await fetch(
          `/api/igdb/search?query=${debouncedQuery}`
        )
        if (!apiResponse.ok) {
          throw new Error(`Response Status: ${apiResponse.status}`)
        }
        const data = await apiResponse.json()
        setResults(data)
      } catch {
        setError("Sorry, something went wrong")
      } finally {
        setLoading(false)
      }
    }

    search()
  }, [debouncedQuery])

  function handleResultClick() {
    setQuery("")
    setResults([])
  }

  return (
    <div className="relative mt-2">
      <input
        className="bg-background focus:bg-muted rounded-xl px-3 py-2"
        type="text"
        id="search"
        name="search"
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {query && results.length === 0 && !loading && <p>No results found</p>}
      {(loading || error || results.length > 0) && (
        <div className="bg-card border-border absolute top-8 z-50 w-full rounded-lg border p-2 shadow-md">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {results.map((result) => (
            <MediaCard
              key={result.id}
              result={result}
              onSelect={handleResultClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
