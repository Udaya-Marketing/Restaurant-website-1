# Goodfire Burger Co.

A responsive restaurant website built with the Next.js App Router, TypeScript, and Tailwind CSS. The included Austin brand, menu, address, and contact information are sample content; update them in `lib/site.ts` and `data/menu.ts` before launch.

## Requirements

- Node.js 20.9 or newer
- npm

## Local setup

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public canonical origin, without a trailing slash. Used for metadata and the sitemap. |
| `RESEND_API_KEY` | For form delivery | Resend API key used by the reservation and mailing-list endpoints. |
| `RESEND_AUDIENCE_ID` | For newsletter signup | Resend Audience that receives newsletter subscribers. |
| `RESERVATION_TO_EMAIL` | For reservation requests | Inbox that receives reservation requests. |
| `MAIL_FROM_EMAIL` | For reservation requests | Verified sender identity, e.g. `Goodfire Burger Co. <orders@example.com>`. |

Form submissions are validated on both the client and server. Configure the Resend audience and verify the sender domain before enabling the newsletter and reservation forms in production. Until configured, the APIs report that delivery is unavailable rather than showing a false success.

## Brand and menu updates

- Update name, address, phone, hours, and site URL in `lib/site.ts`.
- Update typed dishes, prices, categories, and ingredients in `data/menu.ts`.
- Replace the editable SVG artwork and sample hero photograph in `public/images/` with final brand photography, retaining descriptive filenames and alt text or updating each item’s `imageAlt`.
- The sample Austin contact details, reviews, prices, offers, and map location are not real business information. Replace them before publishing.

## Useful commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run start
```

## Deploy to Vercel

1. Push the project to a Git provider and import it into Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS domain.
3. Configure `RESEND_API_KEY`, `RESERVATION_TO_EMAIL`, and `MAIL_FROM_EMAIL` after verifying your sending domain in Resend.
4. Deploy. Vercel detects the Next.js App Router and runs the production build.

The menu is a typed local data source. Cart contents are kept in browser local storage. The cart prepares an order request email for the restaurant; replace this flow with a POS or ordering-provider integration before accepting paid online orders.
