# Todo App using nextjs

## Setup locally

- Git Pull

- open the folder then create file called `.env` in the root folder write this code:
```
  DATABASE_URL=postgres://yoururl
  JWT_SECRET=your_secret_key
  API_URL=http://localhost:3000
```

for DATABASE_URL you can create one for free on Vercel, for this project I use Neon Serverless Postgres.

- run `npm install`
- run `npx prisma generate`
- run `npm run dev`

also for this project I set Register_API** to be protected, you can free it by removing the `/api/auth/register`. from `middleware.ts`



## Prisma
- after setting the .env for the database you need to generate migrate data

  `npx prisma migrate dev --name init`


## Notes
** this can litle bit prevent spaming by other when deployed on public domain. as for the login I still need to figure it out.

A little story, I use firestore on the other project (just simple learning project), I open the API Get data for home, and deploy the project with public domain, then in day 2 my billing is just overflow, so for now all API required authentication. some API still spam by other but the billing not affected for now. also I change to spark plan to be more safer.