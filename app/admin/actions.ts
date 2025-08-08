"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function addAdminComment(applicationId: string, comment: string) {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false as const, error: "Not authenticated" }

  // Insert comment (RLS ensures only admins can)
  const { error } = await supabase
    .from("admin_comments")
    .insert({ application_id: applicationId, admin_id: user.id, comment })
  if (error) return { success: false as const, error: error.message }
  revalidatePath(`/admin/applications/${applicationId}`)
  return { success: true as const }
}

export async function setAdminSelection(applicationId: string, selection: "yes" | "maybe" | "no") {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false as const, error: "Not authenticated" }

  // Upsert vote for this admin/application
  const { error } = await supabase
    .from("admin_votes")
    .upsert({ application_id: applicationId, admin_id: user.id, selection })
  if (error) return { success: false as const, error: error.message }
  revalidatePath(`/admin/applications/${applicationId}`)
  revalidatePath(`/admin`)
  return { success: true as const }
}
