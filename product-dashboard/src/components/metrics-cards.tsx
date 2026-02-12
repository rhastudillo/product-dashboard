"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateProductMetrics, Product } from "@/lib/product-utils";
import { DollarSign, Star, Tag, AlertTriangle } from "lucide-react";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20 mb-1" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
}

export function MetricsCards() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>
    );
  }

  const metrics = calculateProductMetrics(data?.products ?? []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${metrics.averagePrice.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Across {metrics.totalProducts} products
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Low Stock & High Rated
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {metrics.topLowStockHighRated.length > 0 ? (
              metrics.topLowStockHighRated.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate max-w-[180px]" title={product.title}>
                    {product.title}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="text-amber-600 font-medium">
                      {product.stock} left
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No products found</p>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Products with rating 4.5+ sorted by lowest stock
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Categories</CardTitle>
          <Tag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {metrics.topCategories.map((category, index) => (
              <div
                key={category.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="capitalize flex items-center gap-2">
                  <span className="text-muted-foreground">{index + 1}.</span>
                  {category.name}
                </span>
                <span className="text-muted-foreground">
                  {category.count} products
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Categories with most products
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
