My TODO app with docker-compose and prisma.

## Setup

```bash
docker compose -f docker/docker-compose.yml up
npx prisma db push
```

## Run

```bash
npm run dev
```

## Environment

```env
DATABASE_URL=DB_URL_HERE
```
