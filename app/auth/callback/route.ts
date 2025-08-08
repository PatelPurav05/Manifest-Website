import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const next = searchParams.get("next") ?? "/apply"
  const supabase = await getSupabaseServer()
  // Sets the session cookie if the code is valid
  await supabase.auth.exchangeCodeForSession(request.url)
  return NextResponse.redirect(new URL(next, origin))
}
