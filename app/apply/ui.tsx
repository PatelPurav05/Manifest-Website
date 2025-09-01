"use client"

import { getSupabaseClient } from "@/lib/supabase/client"

export function LogoutButton() {
  async function onLogout() {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    window.location.href = "/auth"
  }
  return (
    <button
      onClick={onLogout}
      className="h-9 rounded-md border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12 hover:bg-slate-2"
    >
      Log out
    </button>
  )
}


