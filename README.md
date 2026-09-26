# LoL Death Map — Home Page

Landing/marketing page for **LoL Death Map**, a League of Legends death heatmap tool that visualizes where a summoner dies most frequently on Summoner's Rift across recent matches.

This is the front-facing entry point of the project — a hero section, a "how it works" explainer, and a search bar that fetches death data for a Riot ID + region and hands it off to the main app for the actual heatmap results.

## Tech stack

- React + TypeScript
- Vite (build tool/dev server)
- Oxlint (linting)

## Relationship to the main app

This is a **separate project** from the main LoL Death Map app (the vanilla JS/Express app that renders the heatmap). On search, this page fetches death data directly from the main app's Express server (CORS-enabled for cross-origin requests), caches it in `sessionStorage`, then redirects to the main app with `?riotId=&tag=&region=` in the URL — it does not render the map/results itself.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```