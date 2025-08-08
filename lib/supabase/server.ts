import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error("Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  }

  return createServerClient(
    url,
    anon,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookies().set({ name, value, ...options })
          } catch {
            // ignore in edge scenarios where headers sent
          }
        },
        remove(name: string, options: any) {
          try {
            cookies().set({ name, value: "", ...options, maxAge: 0 })
          } catch {
            // ignore
          }
        },
      },
    }
  )
}
