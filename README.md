# CivicPulse — Frontend

Frontend-only civic issue reporting and management interface for citizens,
officers and municipal administrators. No backend, database or persistence is
included — all data comes from mock files and all API access goes through a
single abstraction that can be pointed at a real backend later.

## Stack

- React + Vite (JavaScript)
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Leaflet + React Leaflet (maps)
- Recharts (admin charts)

## Getting started

```bash
npm install
cp .env.example .env   # optional, set VITE_API_URL when a backend exists
npm run dev
```

Open http://localhost:5173

## Project structure

```
src/
├── assets/
├── components/      common/ ui/ layout/ maps/ complaints/ dashboard/
├── pages/           auth/ citizen/ officer/ admin/ errors/
├── layouts/         PublicLayout, CitizenLayout, OfficerLayout, AdminLayout
├── routes/          AppRoutes.jsx  (all routing lives here)
├── services/        api.js  (fetch abstraction using VITE_API_URL)
├── context/         AuthContext.jsx, ThemeContext.jsx
├── hooks/
├── utils/
├── constants/
├── mock/            mockData.js
├── App.jsx
├── main.jsx
└── index.css
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Public landing page |
| `/login`, `/register`, `/forgot-password` | Authentication screens |
| `/citizen/dashboard`, `/citizen/report`, `/citizen/complaints`, `/citizen/complaints/:id`, `/citizen/profile` | Citizen workspace |
| `/officer/dashboard`, `/officer/complaints`, `/officer/complaints/:id`, `/officer/profile` | Officer workspace |
| `/admin/dashboard`, `/admin/complaints`, `/admin/complaints/:id`, `/admin/officers`, `/admin/departments`, `/admin/users`, `/admin/profile` | Admin workspace |

## Notes

- Authentication is a frontend-only mock stored in local storage
  (`src/context/AuthContext.jsx`). Replace the mock calls with real API calls
  when the backend is ready.
- `src/services/api.js` throws `API_NOT_CONFIGURED` when `VITE_API_URL` is not
  set — it never fakes persistence.
- The AI image analysis on the report page is a simulated UI placeholder.
- Light/dark mode is handled by `src/context/ThemeContext.jsx` and stored
  locally.
