export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

export interface CategoryInfo {
  name: string;
  count: number;
}

export interface ProductMetrics {
  averagePrice: number;
  topLowStockHighRated: Product[];
  topCategories: CategoryInfo[];
  totalProducts: number;
}

export function calculateProductMetrics(products: Product[]): ProductMetrics {
  if (products.length === 0) {
    return {
      averagePrice: 0,
      topLowStockHighRated: [],
      topCategories: [],
      totalProducts: 0,
    };
  }

  // Calculate average price
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = totalPrice / products.length;

  // Get top 3 low stock products with rating >= 4.5
  const topLowStockHighRated = products
    .filter((product) => product.rating >= 4.5)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 3);

  // Get top 3 categories by product count
  const categoryMap = new Map<string, number>();
  products.forEach((product) => {
    const count = categoryMap.get(product.category) || 0;
    categoryMap.set(product.category, count + 1);
  });

  const topCategories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    averagePrice,
    topLowStockHighRated,
    topCategories,
    totalProducts: products.length,
  };
}
