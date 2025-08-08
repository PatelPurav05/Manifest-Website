"use client"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const envMissing = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      setSent(true)
    } catch (err: any) {
      setError(err?.message ?? "Failed to send magic link")
    }
  }

  return (
    <div className="min-h-screen py-12 px-5">
      <div className="max-w-md mx-auto">
        <Card className="border border-slate-6 bg-slate-1">
          <CardHeader>
            <CardTitle>Sign in to continue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {envMissing ? (
              <p className="text-sm text-[#ff3b30]">
                Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
              </p>
            ) : sent ? (
              <p className="text-sm text-slate-11">
                Magic link sent to <span className="font-medium text-slate-12">{email}</span>. Check your inbox.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-slate-11">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@uci.edu"
                    className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12 placeholder:text-slate-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-[#ff3b30]">{error}</p>}
                <Button type="submit" className="w-full">Send magic link</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
