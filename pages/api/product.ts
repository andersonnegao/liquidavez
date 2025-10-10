import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const { searchParams } = new URL(req.url);
  const sku = searchParams.get('sku');

  const response = await supabase
    .from('products')
    .select(
      'sku, name, price, description, unit, size, origins, ingredients, nutrition, claims, shelf(name, slug, aisle(name, slug, department(name, slug)))'
    )
    .eq('sku', sku)
    .single();

  const jsonResponse = NextResponse.json(response, { status: 200 });

  res.cookies.getAll().forEach((cookie) => {
    jsonResponse.cookies.set(cookie);
  });

  return jsonResponse;
}
