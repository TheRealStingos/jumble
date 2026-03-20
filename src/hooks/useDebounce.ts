import { useEffect, useState } from "react";

export default function useDebounce<T>(query: T, delay: number) {
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query)
        }, delay)

        return () => {
            clearTimeout(timeout)
        }
    }, [query, delay])
    
    return debouncedQuery
}