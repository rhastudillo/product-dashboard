import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");

    let url = "https://dummyjson.com/products?limit=0";
    
    // If category is specified, use the category endpoint
    if (category) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=0`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
