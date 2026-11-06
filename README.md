# Sunora Components

B2B website for Sunora components OÜ, a distributor of solar PV systems.

## Local setup

Requires Node.js 22 or newer.

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/en`.

## Commands

| Command             | Purpose                      |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start the development server |
| `npm run build`     | Build for production         |
| `npm run lint`      | Run ESLint                   |
| `npm run typecheck` | Check types                  |
| `npm test`          | Run tests                    |
| `npm run format`    | Format with Prettier         |

## Deployment

Every push to `main` runs the checks in `.github/workflows/deploy.yml` and publishes the static export to GitHub Pages.

The site has no server, so features that need one, such as logins or partner-only prices, require a different host.

## Adding a language

1. Add the locale code to `src/i18n/routing.ts`.
2. Copy `messages/en.json` to `messages/<code>.json` and translate it.

The language switcher in the header appears once there are two locales.

## Where things live

- `src/lib/site.ts`: company details
- `src/lib/nav.ts`: header and footer navigation
- `src/app/globals.css`: design tokens for light and dark mode
- `messages/`: interface text. Search for `TODO:` to find text to replace.
