import { ProductsTable } from "@/components/products-table";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">
            Products
          </h1>
          <p className="text-muted-foreground mt-2">
            Browse all available products from the catalog.
          </p>
        </div>
        <div className="rounded-lg border bg-white dark:bg-zinc-900 p-4">
          <ProductsTable />
        </div>
      </main>
    </div>
  );
}
