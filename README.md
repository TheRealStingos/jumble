# Jumble

[](https://github.com/TheRealStingos/jumble/blob/main/README.md#jumble)

An all-in-one social media logging app. Log, rate, and review your favorite video games, music, movies, television shows, books, comics, and manga.

Still under construction, check back soon.

For Architecture choices please see architecture.md

## Features

[](https://github.com/TheRealStingos/jumble/blob/main/README.md#features)

- User Account
- Search for games
- Log, rate, and review video games

### Planned

[](https://github.com/TheRealStingos/jumble/blob/main/README.md#planned)

- Other media types (Movies, Music, Television, Books)
- Friends and friend activity
- Curated and collaborative lists
- Upcoming release tracking
- Media consumption scheduling with calendar integration
- Backlog management

## Tech Stack

[](https://github.com/TheRealStingos/jumble/blob/main/README.md#tech-stack)

- Next.js (TypeScript)
- Supabase (PostgreSQL + Auth)
- Tailwind CSS
- Vercel (hosting)

## Getting Started

[](https://github.com/TheRealStingos/jumble/blob/main/README.md#getting-started)

### Prerequisites

[](https://github.com/TheRealStingos/jumble/blob/main/README.md#prerequisites)

- Node.js
- A Supabase account

### Installation

[](https://github.com/TheRealStingos/jumble/blob/main/README.md#installation)

1. Clone the repo
2. Run `npm install`
3. Add your environment variables to `.env.local`
4. Run `npm run dev`

## Environment Variables

[](https://github.com/TheRealStingos/jumble/blob/main/README.md#environment-variables)
NEXT_PUBLIC_SUPABASE_URL=
Found in your Supabase dashboard under Project Settings → API

NEXT_PUBLIC_SUPABASE_ANON_KEY=
Found in your Supabase dashboard under Project Settings → API → publishable key

SUPABASE*SECRET_KEY=
Found in your Supabase dashboard under Project Settings → API → secret key
Never expose this publicly or prefix with NEXT_PUBLIC*

TWITCH_CLIENT_ID=
Found in your Twitch Developers Console. Register Application → Client ID

TWITCH_CLIENT_SECRET=
Found in your Twitch Developers Console. Register Application → New Secret → Secret Key
