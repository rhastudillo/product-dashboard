# Product Dashboard - Reasoning

## Technical Decisions

### Template

- **Next.js 16 (App Router)**: Modern React framework with built-in routing, API routes, and server-side capabilities
- **TypeScript**: Type safety and better developer experience

### UI Components

- **shadcn/ui**: Standard, accessible components that are customizable and consistent
  - Cards for metrics display
  - Table for product listing with proper semantics
  - Badges for categories
  - Buttons and form elements
- **Tailwind CSS**: Utility-first styling for rapid development and consistent design

### Data Fetching

- **TanStack Query (React Query)**: Clean data fetching with built-in caching
  - Automatic cache management per query key
  - Loading and error states out of the box
  - Shared cache between components (metrics and table use same data)
  - DevTools for debugging

### Folder Structure

Simple and scalable structure keeping concerns separated:

```
src/
├── app/
│   ├── api/              # API routes (backend logic)
│   │   ├── products/
│   │   │   ├── route.ts        # GET /api/products
│   │   │   └── [id]/route.ts   # GET /api/products/:id
│   │   └── categories/
│   │       └── route.ts        # GET /api/categories
│   ├── product/
│   │   └── [id]/page.tsx       # Product detail page
│   ├── page.tsx                # Home page
│   └── layout.tsx              # Root layout with providers
├── components/
│   ├── ui/               # shadcn base components
│   ├── metrics-cards.tsx # Business component
│   ├── products-table.tsx
│   └── category-filter.tsx
├── lib/
│   ├── utils.ts          # General utilities (cn function)
│   └── product-utils.ts  # Business logic (metrics calculations)
└── providers/
    └── query-provider.tsx # TanStack Query setup
```

**Key principles:**
- API routes handle external data fetching (dummyjson)
- Business logic isolated in `lib/product-utils.ts`
- UI components are presentation-focused
- Providers wrap the app at the layout level

---

## Product Thinking

### 1. Key Metrics First

**Stakeholders need to see main insights, not scroll through a table.**

The dashboard leads with three metric cards:
- **Average Price**: Quick understanding of product pricing landscape
- **Low Stock & High Rated**: Critical alert for popular products running low - these need immediate attention to avoid lost sales
- **Top Categories**: Understanding of inventory distribution

This follows the principle of **progressive disclosure** - show the most important information first, details on demand.

### 2. Full Data Access

**If users want details, they need access to all data, not just a few items.**

- Default API call uses `limit=0` to fetch all products (~194 items)
- Client-side pagination allows flexible viewing (10, 20, 50, 100 items per page)
- Product detail page provides complete information for any single product
- No arbitrary data truncation - users can always access everything

This respects user autonomy and supports different use cases:
- Quick scanning (paginated table)
- Deep analysis (all data available)
- Individual focus (detail page)

### 3. Filter by Category

**Consistency with top categories card - users can see the impact of different product types.**

The category filter:
- Reflects the categories shown in the "Top Categories" metric card
- Updates both metrics AND table simultaneously
- Allows stakeholders to answer questions like:
  - "What's the average price for beauty products?"
  - "Which smartphones are running low on stock?"
  - "How do groceries compare to electronics?"

This creates a cohesive experience where the metrics card insights can be explored further through filtering.


