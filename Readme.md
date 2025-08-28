## FlowOps

Modern full‑stack app with a Node.js backend and a Next.js (App Router) frontend. Includes rich form validation, file uploads, contact/user modules, and a sidebar layout with URL‑synced navigation.

### Project Structure

```
FlowOps/
  backend/               # Express server, routes, controllers, uploads
  frontend/              # Next.js (App Router) app
  Readme.md
```

### Prerequisites

- Node.js 18+ and npm
- PNPM (optional) if you prefer over npm
- MySQL (optional, only if you choose to use Prisma/MySQL)

---

## Backend

Express API providing authentication, contact registration, file uploads, and contact data persistence.

### Install & Run

```powershell
cd backend
npm install
npm run dev   # or: npm start
```

By default the API runs on `http://localhost:5000`.

### Notable Endpoints

- POST `/api/contact/register` – Create a contact (expects fields like `type`, `firstName`, `lastName`, `emails`, `addressLines`, etc.)
- POST `/api/upload` – Upload files (see `uploadRoutes.js`)
- POST `/api/auth/...` – Auth related (see `routes/auth.js`)

See `backend/routes/*` and `backend/controllers/*` for details.

### File Uploads

Uploads are saved to `backend/uploads/`. The folder is git‑ignored. Ensure the directory exists when running locally.

### Optional: Prisma + MySQL

If you want to back contacts/users with a database:

1) Install Prisma client
```powershell
cd backend
npm install @prisma/client prisma
```

2) Configure database URL in `backend/.env`:
```
DATABASE_URL="mysql://user:password@localhost:3306/flowops"
```

3) Generate and push schema
```powershell
npx prisma generate
npx prisma db push
```

You can also switch the datasource in `backend/prisma/schema.prisma` to SQLite for simple local dev.

---

## Frontend

Next.js (App Router) app with Tailwind/Shadcn UI components and client‑side form validation.

### Install & Run

```powershell
cd frontend
npm install    # or: pnpm install
npm run dev
```

App runs at `http://localhost:3000`.

### Key Pages & Components

- `app/dashboard/page.tsx` – Main dashboard entry
- `components/convergence-layout.tsx` – Shell with header + sidebar and in‑page module rendering
- `components/contact-registration.tsx` – Contact registration form with manual validations
- `components/user-registration.tsx` – User registration form with manual validations

### Sidebar Navigation (URL‑Synced)

The sidebar inside `convergence-layout.tsx` updates the URL query and restores the active module on reload:

- Clicks push `?module=<id>` to the URL using Next.js navigation
- On load, the active module is read from `?module=` so reloading keeps the same view
- Parent menus auto‑expand for nested items (e.g., Manage User)
- Re‑clicking the same item forces a content remount so internal effects re‑run

Example: `http://localhost:3000/dashboard?module=manage-user`

### Form Validation

All required fields show inline error messages (no browser popups). Highlights:

- Email: RFC‑like regex validation, inline errors below the input
- Phone (cell/office): digit filtering with length rules, inline errors on blur
- Names: allow letters, spaces, apostrophes, and hyphens; disallow digits
- Address Line 1, City, State, Zip: required with inline errors

### Environment Configuration

Frontend expects the backend at `http://localhost:5000`. If you change the backend port or host, update fetch URLs in the frontend components (e.g., `contact-registration.tsx`).

---

## Common Workflows

### Start Everything (two terminals)

```powershell
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

### Linting

Use your editor’s TypeScript/ESLint integration. The project is configured so that newly added validations and UI edits lint cleanly.

---

## Troubleshooting

- Frontend can’t reach backend: ensure backend runs on `http://localhost:5000` or update URLs
- Sidebar URL doesn’t persist selection: confirm `ConvergenceLayout` wraps the page being navigated (e.g., `/dashboard`) and that the URL contains `?module=`
- File uploads failing: ensure `backend/uploads/` exists and your request uses the correct field name
- Prisma errors: verify `DATABASE_URL` and run `npx prisma generate` and `npx prisma db push`

---

## Scripts Reference

Backend (`backend/package.json`):
- `npm run dev` – start with nodemon (if configured)
- `npm start` – start server

Frontend (`frontend/package.json`):
- `npm run dev` – Next.js dev server
- `npm run build` – production build
- `npm start` – start production server

---

## License

Proprietary – internal use.