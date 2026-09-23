# LoL Death Map — Home Page

Landing/marketing page for **LoL Death Map**, a League of Legends death heatmap tool that visualizes where a summoner dies most frequently on Summoner's Rift across recent matches.

This is the front-facing entry point of the project — a hero section, a "how it works" explainer, and a search bar that hands off a Riot ID + region to the main app for the actual heatmap results.

## Tech stack

- React + TypeScript
- Vite (build tool/dev server)
- Oxlint (linting)

## Relationship to the main app

This is a **separate project** from the main LoL Death Map app (the vanilla JS/Express app that renders the heatmap). This page links out to that app once a search is submitted — it does not render the map/results itself.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```