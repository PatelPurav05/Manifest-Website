"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function saveDraft(input: {
  id: string
  name?: string
  email?: string
  year?: string
  focus?: string
  team_size?: string
  brief?: string
  problem?: string
  progress?: string
  links?: string
  apply_elevate?: boolean
  elevate_video?: string | null
}) {
  const supabase = await getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { success: false as const, error: "Not authenticated" }

  const { error } = await supabase
    .from("applications")
    .update({
      name: input.name,
      email: input.email,
      year: input.year,
      focus: input.focus,
      team_size: input.team_size,
      brief: input.brief,
      problem: input.problem,
      progress: input.progress,
      links: input.links,
      apply_elevate: input.apply_elevate,
      elevate_video: input.elevate_video,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id)
  if (error) return { success: false as const, error: error.message }
  return { success: true as const }
}

export async function submitApplication(applicationId: string) {
  const supabase = await getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { success: false as const, error: "Not authenticated" }

  // Mark submitted
  const { data, error } = await supabase
    .from("applications")
    .update({ submitted_at: new Date().toISOString() })
    .eq("id", applicationId)
    .select("id")
    .single()
  if (error) return { success: false as const, error: error.message }
  revalidatePath("/apply")
  return { success: true as const, appId: data.id as string }
}
