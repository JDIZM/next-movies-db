# next movies db

A demo app to display movies data built with Next.js, React, Redux, and TypeScript.

This will use the Next.js API routes to create a backend for the app and will use the `app` router folder structure for React Server Components and server side logic.

## Tech Stack

Frontend:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Recharts](https://recharts.org/en-US/)

API:

- [The Movie Database API](https://www.themoviedb.org/documentation/api)
- [Next.js API Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

Styling:

- [Tailwind CSS](https://tailwindcss.com/)
- [Daisy UI](https://daisyui.com/)

Tooling:

- [Volta.sh](https://volta.sh/)
- [pnpm](https://pnpm.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Zod](https://zod.dev/) _not implemented yet_

## Getting Started

This project uses Volta.sh to manage npm versions. If you don't have it installed please see the [Volta.sh](https://volta.sh/) website for installation instructions.

copy the `.env.example` file to `.env` and add your API key from [The Movie Database API](https://www.themoviedb.org/documentation/api).

```
# install dependencies
pnpm install

# start dev server
pnpm dev

# build for production
pnpm build

# run the production build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Resources

- https://redux-toolkit.js.org/usage/nextjs
- https://github.com/vercel/next.js/tree/canary/examples/with-redux/app
