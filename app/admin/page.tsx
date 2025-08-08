import Link from "next/link"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"

export default async function AdminDashboardPage() {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth")

  // Check admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("user_id", user.id)
    .maybeSingle()
  if (!profile || profile.role !== "admin") {
    redirect("/") // not authorized
  }

  const { data: apps, error } = await supabase
    .from("applications")
    .select("id, name, email, year, focus, submitted_at, created_at, updated_at")
    .order("created_at", { ascending: false })
  if (error) {
    return <div className="max-w-4xl mx-auto p-6">Failed to load applications: {error.message}</div>
  }

  // Fetch votes to compute summary
  const { data: votes } = await supabase
    .from("admin_votes")
    .select("application_id, selection")

  const counts = new Map<string, { yes: number; maybe: number; no: number }>()
  votes?.forEach(v => {
    const c = counts.get(v.application_id) ?? { yes: 0, maybe: 0, no: 0 }
    if (v.selection === "yes") c.yes++
    if (v.selection === "maybe") c.maybe++
    if (v.selection === "no") c.no++
    counts.set(v.application_id, c)
  })

  return (
    <div className="min-h-screen py-10 px-5">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Admin Portal</h1>
          <div className="text-slate-11 text-sm">Signed in as {profile.full_name ?? user.email}</div>
        </div>

        <div className="rounded-xl border border-slate-6 overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-2 p-3 text-sm text-slate-11">
            <div className="col-span-4">Applicant</div>
            <div className="col-span-2">Year</div>
            <div className="col-span-2">Focus</div>
            <div className="col-span-2">Submitted</div>
            <div className="col-span-2 text-right">Votes</div>
          </div>
          <div className="divide-y divide-slate-6">
            {apps?.map((a) => {
              const c = counts.get(a.id) ?? { yes: 0, maybe: 0, no: 0 }
              return (
                <Link key={a.id} href={`/admin/applications/${a.id}`} className="grid grid-cols-12 p-3 hover:bg-slate-2 transition-colors">
                  <div className="col-span-4">
                    <div className="text-slate-12 font-medium">{a.name || a.email}</div>
                    <div className="text-slate-10 text-xs">{a.email}</div>
                  </div>
                  <div className="col-span-2">{a.year || "—"}</div>
                  <div className="col-span-2">{a.focus || "—"}</div>
                  <div className="col-span-2">{a.submitted_at ? new Date(a.submitted_at as any).toLocaleDateString() : "Draft"}</div>
                  <div className="col-span-2 text-right text-sm">
                    <span className="mr-2">✅ {c.yes}</span>
                    <span className="mr-2">🤔 {c.maybe}</span>
                    <span>❌ {c.no}</span>
                  </div>
                </Link>
              )
            })}
            {!apps?.length && <div className="p-4 text-slate-11">No applications yet.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
