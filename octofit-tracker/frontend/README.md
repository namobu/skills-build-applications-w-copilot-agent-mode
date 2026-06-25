# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit Tracker application.

## API Configuration

Define `VITE_CODESPACE_NAME` in `.env.local` when running the app in GitHub Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, the frontend calls:

```text
https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the frontend falls back to:

```text
http://localhost:8000/api/[component]/
```

## Scripts

```bash
npm run dev
npm run build
```
