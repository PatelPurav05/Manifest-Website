import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import { AdminAppDetail } from "./ui"

export default async function AdminApplicationDetail({ params }: { params: { id: string } }) {
  const supabase = await getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("user_id", user.id)
    .maybeSingle()
  if (!profile || profile.role !== "admin") redirect("/")

  const { data: app, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", params.id)
    .single()
  if (error) return <div className="max-w-3xl mx-auto p-6">Failed to load: {error.message}</div>

  const { data: comments } = await supabase
    .from("admin_comments")
    .select("id, comment, selection, created_at, admin_id")
    .eq("application_id", params.id)
    .order("created_at", { ascending: false })

  const { data: myVote } = await supabase
    .from("admin_votes")
    .select("selection")
    .eq("application_id", params.id)
    .eq("admin_id", user.id)
    .maybeSingle()

  return (
    <AdminAppDetail
      app={app}
      comments={comments ?? []}
      myVote={myVote?.selection ?? null}
      adminId={user.id}
    />
  )
}
