# NXTFLIX

A movie browsing and discovery app. Sign in, browse a catalog of 50 titles through
auto-scrolling carousels and a genre-filtered grid, open any title for full details,
and save what you want to watch to a Watch Later list that survives a refresh.

## Tech stack

| Tool             | Version | Used for                                  |
| ---------------- | ------- | ----------------------------------------- |
| React            | 19      | UI                                        |
| React Router DOM | 7       | Routing and route protection              |
| Vite             | 7       | Dev server and build                      |
| js-cookie        | 3       | Reading/writing the `jwt_token` cookie    |
| Plain CSS        | –       | Global tokens + one stylesheet per folder |

No CSS framework and no component library — styling is hand-written CSS driven by
custom properties declared in `src/index.css`.

## Getting started

Requires Node 22.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production bundle -> build/
npm run preview  # serve the production bundle locally
npm run lint     # oxlint
```

### Test credentials

| Field    | Value               |
| -------- | ------------------- |
| Email    | `admin@example.com` |
| Password | `admin123`          |

## Routes

| Route          | Access    | Page                                       |
| -------------- | --------- | ------------------------------------------ |
| `/login`       | Public    | Sign In — redirects to `/` if already authed |
| `/`            | Protected | Home — hero, carousels, genre filter, grid  |
| `/movies/:id`  | Protected | Movie Details                               |
| `/watch-later` | Protected | Watch Later list                            |
| `/not-found`   | Public    | 404                                         |
| `*`            | Public    | 404 catch-all                               |

The header is rendered by the three protected pages themselves, which is what keeps
it off the Sign In and 404 pages.

## Project structure

```
src/
├─ api/auth.js                  signIn() + token extraction
├─ components/
│  ├─ GenreFilter/              filter chips
│  ├─ Header/                   sticky nav + Watch Later badge + logout
│  ├─ MovieCard/                poster, rating badge, hover play overlay
│  ├─ MovieCarousel/            auto-scrolling infinite strip
│  └─ ProtectedRoute/           cookie gate
├─ context/WatchLaterContext.jsx
├─ data/movies.js               static catalog (50) + GENRES
├─ pages/                       Home, Login, MovieDetails, NotFound, WatchLater
├─ App.jsx                      route table
├─ main.jsx                     Router + WatchLaterProvider
└─ index.css                    design tokens, reset, shared .movie-grid
```

Each component and page lives in its own folder as `index.jsx` + `index.css`.

## How things work

**Authentication.** `src/api/auth.js` POSTs to the sign-in endpoint and either returns
the parsed body or throws with the API's own `message`. It deliberately knows nothing
about cookies — the Login page decides what to do with the result. On success the token
is stored in a `jwt_token` cookie with a 7 day expiry.

**Route protection.** `ProtectedRoute` checks for that cookie and otherwise renders
`<Navigate to="/login" replace />`. This is a convenience guard, not real security:
the cookie lives in the browser and can be set by hand. In a real app the server would
reject unauthenticated requests.

**Movie data.** The catalog is static — imported straight from `src/data/movies.js`,
no API and no API key. Note `rating` is a string and `year` is a number, so ratings go
through `Number()` before being compared.

**Derived lists.** Trending Now is the catalog sorted by rating descending, first 16.
The array is copied before sorting because `Array.sort` mutates in place and the import
is shared by every page. Fresh Releases is everything from 2015 onward, first 16.

**Carousels.** The list is rendered twice and the track animates from `0` to `-50%`,
so the second copy lands exactly where the first began and the loop is seamless.
Spacing uses `margin-right` rather than `gap`, because a gap only sits *between* items
and would leave the two copies half a gap out of alignment. Hover or keyboard focus
pauses the animation.

**Watch Later.** `WatchLaterContext` holds the list, seeds it from `localStorage`
(falling back to an empty list if the stored value is not valid JSON), and writes back
on every change. It stores whole movie objects rather than ids so the Watch Later page
can render cards without searching the catalog again. Adding and removing both happen
on the Movie Details page — there is no separate remove button on the list.

**Movie lookup.** Route params arrive as strings while catalog ids are numbers, so the
details page compares `item.id === Number(id)`. An unknown id redirects to `/not-found`.

## Storage

| Data             | Where        | Key                   |
| ---------------- | ------------ | --------------------- |
| Auth token       | Cookie       | `jwt_token` (7 days)  |
| Watch Later list | localStorage | `nxtflix_watch_later` |

## Deployment note

`vercel.json` and `public/_redirects` rewrite all paths to `index.html`. Without them a
hard refresh on a deep link such as `/watch-later` would 404 on a static host, because
the routing is client-side. Build output is `build/`, not Vite's default `dist/`.
