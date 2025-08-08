import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const { email, token } = await req.json()
    if (!email || !token) {
      return NextResponse.json({ error: "Missing email or token" }, { status: 400 })
    }

    const supabase = getSupabaseServer()
    // Verify the 6-digit code and set the auth cookies for SSR
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 })
  }
}
