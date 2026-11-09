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

## Server (Docker)

The production server builds the site into a Docker image and serves it with nginx. The server's `nginx-proxy` container routes `sunoracomponents.eu` to it, and `acme-companion` issues the HTTPS certificate. Both find the site through the `VIRTUAL_HOST` and `LETSENCRYPT_HOST` variables in `docker-compose.yml`, so the proxy needs no config changes.

| File                                  | Purpose                                                     |
| ------------------------------------- | ----------------------------------------------------------- |
| `Dockerfile`                          | Builds the static export, then serves it with nginx         |
| `deploy/nginx/site.conf`              | nginx inside the site container, including the www redirect |
| `docker-compose.yml`                  | Runs the container on the `webproxy` network                |
| `.github/workflows/deploy-server.yml` | Deploys after the checks pass on `main`                     |

### First setup on the server

1. Point the DNS A records for `sunoracomponents.eu` and `www.sunoracomponents.eu` to the server, and wait until they resolve. The certificate can only be issued after that.
2. Clone and start the site next to the other sites:

   ```bash
   cd ~/sites
   git clone https://github.com/companyyyy/sunora-components.git sunora
   cd sunora
   docker compose up -d --build
   ```

3. Follow the certificate: `docker logs -f nginx-proxy-acme`. Then open https://sunoracomponents.eu.

### Automatic deploys

Add to the GitHub repository settings:

- Secrets: `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY` (a private key whose public half is in the server user's `~/.ssh/authorized_keys`), and `SERVER_PORT` if SSH is not on port 22.
- Variable: `DEPLOY_PATH`, the folder from step 2, for example `/root/sites/sunora`. Deploys stay off until it is set.

After that, every push to `main` that passes the checks is pulled on the server and rebuilt.

## Adding a language

1. Add the locale code to `src/i18n/routing.ts`.
2. Copy `messages/en.json` to `messages/<code>.json` and translate it.

The language switcher in the header appears once there are two locales.

## Where things live

- `src/lib/site.ts`: company details
- `src/lib/nav.ts`: header and footer navigation
- `src/app/globals.css`: design tokens for light and dark mode
- `messages/`: interface text. Search for `TODO:` to find text to replace.
