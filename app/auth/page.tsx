"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Step = "request" | "verify"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const next = useMemo(() => searchParams.get("next") ?? "/apply", [searchParams])

  const [step, setStep] = useState<Step>("request")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const envMissing = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  async function sendCode(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    try {
      setSending(true)
      const supabase = getSupabaseClient()
      // Sends an email with a one-time code (ensure "Email OTP" is enabled in Supabase Auth settings)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // auto-create on first sign in
        },
      })
      if (error) throw error
      setStep("verify")
    } catch (err: any) {
      setError(err?.message ?? "Failed to send code")
    } finally {
      setSending(false)
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      setVerifying(true)
      // Verify on the server so the SSR cookie is set for Server Components/Actions
      const res = await fetch("/auth/verify-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, token: code }),
      })
      if (!res.ok) {
        const { error: errMsg } = await res.json().catch(() => ({ error: "Failed to verify code" }))
        throw new Error(errMsg ?? "Failed to verify code")
      }
      // Success: navigate to next page
      router.push(next)
      router.refresh()
    } catch (err: any) {
      setError(err?.message ?? "Invalid code")
    } finally {
      setVerifying(false)
    }
  }

  function backToEmail() {
    setStep("request")
    setCode("")
    setError(null)
  }

  return (
    <div className="min-h-screen py-12 px-5">
      <div className="max-w-md mx-auto">
        <Card className="border border-slate-6 bg-slate-1">
          <CardHeader>
            <CardTitle>{step === "request" ? "Sign in" : "Enter one-time code"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {envMissing && (
              <p className="text-sm text-[#ff3b30]">
                Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
              </p>
            )}

            {step === "request" ? (
              <form onSubmit={sendCode} className="space-y-3">
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
                <Button type="submit" className="w-full" disabled={sending || envMissing}>
                  {sending ? "Sending..." : "Send code"}
                </Button>
                <p className="text-xs text-slate-10">
                  We’ll email a 6-digit code. Enter it here to finish signing in.
                </p>
              </form>
            ) : (
              <form onSubmit={verifyCode} className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm text-slate-11">One-time code</label>
                  <input
                    id="code"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="123456"
                    className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12 placeholder:text-slate-9 tracking-widest"
                    value={code}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 6)
                      setCode(digits)
                    }}
                    aria-label="6 digit code"
                    autoFocus
                  />
                  <p className="text-xs text-slate-10">
                    Code sent to <span className="text-slate-12 font-medium">{email}</span>
                  </p>
                </div>
                {error && <p className="text-sm text-[#ff3b30]">{error}</p>}
                <div className="flex gap-2">
                  <Button type="button" variant="secondary" className="w-1/3" onClick={backToEmail} disabled={verifying}>
                    Back
                  </Button>
                  <Button type="submit" className="w-2/3" disabled={verifying || code.length !== 6}>
                    {verifying ? "Verifying..." : "Verify & continue"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-10">Didn’t get it?</span>
                  <button
                    type="button"
                    onClick={sendCode}
                    className="text-xs text-slate-12 underline underline-offset-2 disabled:opacity-50"
                    disabled={sending}
                  >
                    Resend code
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
