import { NextResponse } from "next/server";

export async function GET() {
  const startTime = Date.now();

  console.log("[API /categories] Request received", {
    timestamp: new Date().toISOString(),
  });

  try {
    const url = "https://dummyjson.com/products/categories";
    console.log("[API /categories] Fetching from dummyjson", { url });

    const response = await fetch(url);
    const data = await response.json();

    const duration = Date.now() - startTime;
    console.log("[API /categories] Success", {
      categoryCount: Array.isArray(data) ? data.length : 0,
      duration: `${duration}ms`,
    });

    return NextResponse.json(data);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[API /categories] Error", {
      error: error instanceof Error ? error.message : "Unknown error",
      duration: `${duration}ms`,
    });

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
