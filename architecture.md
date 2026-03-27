# Project Structure & Reasoning

## /lib

Contains logic and types for various 3rd party data sources. No HTTP routes are found here, those are in /app/api instead.

Example:
/lib/igdb - contains all IGDB specific logic
/lib/igdb/igdbTypes.ts - contains all IGDB types

## /app/[type]/[id]

Routes the user to the correct detailed page for each media type. Media type is determined by URL parameters.

## /app/api

Contains HTTP route handlers and thin wrappers for lib functions.

Example:
/app/api/igdb/search/route.ts - fetches IGDB search query, fills in the token credentials using logic established in /lib/igdb/token.ts

## /types

Contains app-wide normalized types

Example:
/types/media.ts - Normalizes search results into MediaResult objects (read more about this in the Search Function section)

## /components

Contains all React components. Folders within this section house components dedicated to certain features. Components in root are feature agnostic

### /search

Components related to the search function. Uses MediaResult type for data.

### /detail

Components related to the detailed media page. For use when a user is navigated to a page dedicated to one piece of media. Uses extended MediaResult types for data.

## /hooks

Contains reusable custom React hooks.

Example:
useDebounce.ts - delays the execution of a function until a specified time has passed since the last call. Used in MediaSearch to prevent excessive API calls while the user is typing.

# Search Function

Hits multiple apis at once and returns MediaResult objects.
This object contains universally applicable data for all media types:

    id: number;
    title: string;
    type: MediaType;
    coverUrl: string | null;
    releaseDate: string;

Additionally, based on type the object can be extended for more specific data pertaining to that media type. For instance we have GameResult which also includes:

    involved_companies: IGDBInvolvedCompany[];
    genres: { name:string }[];
    platforms: {name:string }[];
    summary: string | null
