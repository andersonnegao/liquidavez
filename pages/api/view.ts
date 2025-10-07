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
  const view = searchParams.get('view') as string;

  const response = await supabase.from(view).select();

  const jsonResponse = NextResponse.json(response, { status: 200 });

  res.cookies.getAll().forEach((cookie) => {
    jsonResponse.cookies.set(cookie);
  });

  return jsonResponse;
}
