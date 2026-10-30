# LoL Death Map — Home Page

Landing page with a search bar that redirects to the results page. It makes no API calls.

On submit it redirects to `<VITE_RESULTS_URL>/?riotId=<name>&tag=<tag>&region=<region>`.

## Setup

```bash
npm install
cp .env.example .env
# set VITE_RESULTS_URL in .env (http or https only; validated at build time)
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — typecheck + production build (fails if `VITE_RESULTS_URL` is missing or invalid)
- `npm run preview` — preview the production build
- `npm run lint` — oxlint
- `npm run test` — vitest
- `npm run typecheck` — tsc -b

## Deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Set `VITE_RESULTS_URL` in the site's environment variables.
- Security headers come from `public/_headers`.

## Tech stack

React, TypeScript, Vite, Vitest, Oxlint.

> LoL Death Map isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.