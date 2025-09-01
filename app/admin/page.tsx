import { AdminAppsTable } from "./apps-table"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"

export default async function AdminDashboardPage() {
  const supabase = await getSupabaseServer()
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
    .select("id, name, email, year, focus, submitted_at, created_at, updated_at, apply_elevate")
    .not('submitted_at', 'is', null)
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

        <AdminAppsTable apps={apps ?? []} counts={counts} />
      </div>
    </div>
  )
}
