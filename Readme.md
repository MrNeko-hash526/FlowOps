hello new stuff 123456

## Backend MySQL / Prisma setup

To enable the MySQL-backed user store with Prisma:

1. Install Prisma client in the backend folder:

```powershell
cd D:\FlowOps\backend
npm install @prisma/client
```

2. Set your `DATABASE_URL` in `backend/.env`, for example:

```
DATABASE_URL="mysql://user:password@localhost:3306/flowops"
```

3. Generate Prisma client and push the schema:

```powershell
npx prisma generate
npx prisma db push
```

4. Start the backend (it will automatically use Prisma if DATABASE_URL is present):

```powershell
node index.js
```

If you prefer SQLite for local dev instead of MySQL, update `prisma/schema.prisma` datasource provider to `sqlite` and use `file:./dev.db` as the URL, then run `npx prisma db push`.
