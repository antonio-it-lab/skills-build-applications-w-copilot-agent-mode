# OctoFit Tracker Frontend

## Environment configuration

The frontend must define `VITE_CODESPACE_NAME` when running in GitHub Codespaces. Create a `.env.local` file in this folder with a value like:

```bash
VITE_CODESPACE_NAME=my-codespace
```

When `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000` instead of producing a broken `https://undefined-8000...` URL.

## API base URL

The frontend builds API requests as:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

This exposes the backend routes:

- `/api/users/`
- `/api/activities/`
- `/api/teams/`
- `/api/leaderboard/`
- `/api/workouts/`
