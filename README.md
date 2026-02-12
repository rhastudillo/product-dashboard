# Product Dashboard

A simple product dashboard using the [dummyjson API](https://dummyjson.com/products) to display products with metrics, filtering, and pagination.

**Live Demo:** [https://product-dashboard-liart.vercel.app/](https://product-dashboard-liart.vercel.app/)

---

## Features

- **Key Metrics Dashboard**: Average price, low stock alerts for high-rated products, top categories
- **Products Table**: Paginated table with product details, thumbnails, and stock indicators
- **Category Filter**: Filter products by category with metrics recalculation
- **Product Detail Page**: Individual product view with full details

---

## Reasoning

### Technical Decisions

- **Next.js 16 (App Router)**: Modern React framework with built-in routing and API routes
- **shadcn/ui**: Standard, accessible UI components (Table, Card, Badge, Button)
- **TanStack Query**: Clean data fetching with automatic caching and shared state between components
- **Simple folder structure**: Separation of API routes, business logic (`lib/`), and UI components

### Product Thinking

1. **Key metrics first**: Stakeholders need main insights at a glance, not just a table of products
2. **Full data access**: Users can access all products with pagination (10, 20, 50, 100 per page)
3. **Category filter consistency**: Filter aligns with Top Categories card for exploring different product segments

For detailed reasoning, see [REASONING.md](./REASONING.md).

---

## Bonus Tasks

Additional features implemented beyond the core requirements, in order of priority:

### 1. Category Filter
- Implemented `/api/categories` endpoint to fetch all categories from dummyJSON
- Added category dropdown filter that updates both metrics and table
- **Why first?** Consistency with the "Top Categories" insight card - users can explore the categories they see in the metrics

### 2. Deployment
- Deployed to Vercel with live URL
- **Why?** Better to have a working deployed app than just local development - enables real-world testing and easy sharing

### 3. Observability
- Added structured logging in all API routes (`/api/products`, `/api/products/:id`, `/api/categories`)
- **Why?** Enables debugging and monitoring in Vercel's log viewer for production issues

### 4. CI/CD Pipeline
- Implemented GitHub Actions workflow (`.github/workflows/ci.yml`)
- Runs linting on every push to catch common issues
- **Why?** Visibility into typical warnings and errors (unused vars, image optimization, etc.) before deployment

---

## Current Limitations

1. **Fetching all products**: Currently fetches all products at once (`limit=0`) instead of using server-side pagination with dummyJSON's `skip` and `limit` parameters
2. **Single filter**: Only category filter is implemented; no search, price range, or rating filters
3. **Direct deployment**: Deployed directly to main branch without PR review process
4. **No authentication**: No auth or role-based access control implemented

---

## Future Improvements

With more time, I would implement:

1. **Server-side filtering & pagination**: Use dummyJSON query parameters (`q`, `skip`, `limit`, `select`) for efficient data fetching instead of loading all products
2. **Additional filters and ordering**: Search by name, filter and order data in table by price range, rating, etc
3. **PR workflow & documentation**: Proper branching, PR templates, code review process, and comprehensive documentation
4. **Database implementation**: Replace dummyJSON with a real database (PostgreSQL/MongoDB) for data persistence and custom queries
5. **Authentication & roles**: Implement user auth with role-based permissions (admin, viewer, etc.)
6. **Testing**: Unit tests, integration tests

---

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js 16](https://nextjs.org) - React framework
- [TanStack Query](https://tanstack.com/query) - Data fetching & caching
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [TypeScript](https://www.typescriptlang.org) - Type safety

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
