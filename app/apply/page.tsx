import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import { ApplyWizard } from "@/components/apply/wizard"

export const dynamic = "force-dynamic"

export default async function ApplyPage() {
  const supabase = await getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  // Fetch latest existing application or create a new draft for this user
  const { data: existing, error: selectError } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (selectError) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        Failed to load your application: {selectError.message}
      </div>
    )
  }

  let appRow = existing
  if (!existing) {
    const { data: inserted, error: insertError } = await supabase
      .from("applications")
      .insert({ user_id: user.id, email: user.email })
      .select("*")
      .single()
    if (insertError) {
      return (
        <div className="max-w-2xl mx-auto p-6">
          Couldn't initialize your application: {insertError.message}
        </div>
      )
    }
    appRow = inserted
  }

  return (
    <ApplyWizard
      initialData={{
        id: appRow!.id as any,
        name: appRow?.name ?? "",
        email: appRow?.email ?? user.email ?? "",
        year: appRow?.year ?? "",
        focus: appRow?.focus ?? "",
        teamSize: appRow?.team_size ?? "",
        brief: appRow?.brief ?? "",
        problem: appRow?.problem ?? "",
        progress: appRow?.progress ?? "",
        links: appRow?.links ?? "",
        submitted: Boolean(appRow?.submitted_at),
      }}
    />
  )
}
