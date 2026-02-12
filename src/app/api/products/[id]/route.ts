import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  const { id } = await params;

  console.log("[API /products/:id] Request received", {
    productId: id,
    timestamp: new Date().toISOString(),
  });

  try {
    const url = `https://dummyjson.com/products/${id}`;
    console.log("[API /products/:id] Fetching from dummyjson", { url });

    const response = await fetch(url);
    
    if (!response.ok) {
      const duration = Date.now() - startTime;
      console.warn("[API /products/:id] Product not found", {
        productId: id,
        status: response.status,
        duration: `${duration}ms`,
      });

      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    const data = await response.json();

    const duration = Date.now() - startTime;
    console.log("[API /products/:id] Success", {
      productId: id,
      productTitle: data.title,
      duration: `${duration}ms`,
    });

    return NextResponse.json(data);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[API /products/:id] Error", {
      productId: id,
      error: error instanceof Error ? error.message : "Unknown error",
      duration: `${duration}ms`,
    });

    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
