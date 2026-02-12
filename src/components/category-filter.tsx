"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";

interface Category {
  slug: string;
  name: string;
  url: string;
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Category:</span>
        <Skeleton className="h-9 w-48" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-muted-foreground">Category:</span>
      <select
        value={selectedCategory || ""}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        className="border rounded-md px-3 py-2 bg-background text-sm min-w-[200px]"
      >
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      {selectedCategory && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCategoryChange(null)}
          className="h-8 px-2 text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
