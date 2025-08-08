"use client"

import { useTransition, useState } from "react"
import { Button } from "@/components/ui/button"
import { addAdminComment, setAdminSelection } from "@/app/admin/actions"
import { Loader2 } from 'lucide-react'

type Comment = { id: string; comment: string; selection: "yes" | "maybe" | "no" | null; created_at: string; admin_id: string }

export function AdminAppDetail({
  app,
  comments,
  myVote,
}: {
  app: any
  comments: Comment[]
  myVote: "yes" | "maybe" | "no" | null
}) {
  const [text, setText] = useState("")
  const [pending, start] = useTransition()
  const [vote, setVote] = useState<"yes" | "maybe" | "no" | null>(myVote)

  return (
    <div className="min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-medium">{app.name || app.email}</h1>
          <p className="text-slate-11">{app.email}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-6 p-4 space-y-2">
            <h3 className="text-slate-12 font-medium">Profile</h3>
            <Row k="Year" v={app.year || "—"} />
            <Row k="Focus" v={app.focus || "—"} />
            <Row k="Team size" v={app.team_size || "—"} />
            <Row k="Links" v={app.links || "—"} />
          </div>
          <div className="rounded-xl border border-slate-6 p-4 space-y-2">
            <h3 className="text-slate-12 font-medium">Project</h3>
            <Row k="Idea" v={app.brief || "—"} multiline />
            <Row k="Problem" v={app.problem || "—"} multiline />
            <Row k="Progress" v={app.progress || "—"} multiline />
          </div>
        </div>

        <div className="rounded-xl border border-slate-6 p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-12 font-medium">Your selection:</span>
            {(["yes", "maybe", "no"] as const).map((s) => (
              <Button
                key={s}
                variant={vote === s ? "default" : "secondary"}
                onClick={() => start(async () => {
                  await setAdminSelection(app.id, s)
                  setVote(s)
                })}
                disabled={pending}
              >
                {s === "yes" ? "✅ Yes" : s === "maybe" ? "🤔 Maybe" : "❌ No"}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-6 p-4 space-y-4">
          <h3 className="text-slate-12 font-medium">Comments</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!text.trim()) return
              start(async () => {
                await addAdminComment(app.id, text)
                setText("")
                // Optimistic UI left minimal for brevity
                window.location.reload()
              })
            }}
            className="space-y-3"
          >
            <textarea
              rows={3}
              placeholder="Leave feedback for the board..."
              className="w-full rounded-lg border border-slate-6 bg-slate-1 p-3 text-sm text-slate-12 placeholder:text-slate-9"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" disabled={pending}>
              {pending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Posting...</> : "Post comment"}
            </Button>
          </form>

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="rounded-lg border border-slate-6 p-3">
                <div className="text-sm text-slate-10 mb-1">{new Date(c.created_at).toLocaleString()}</div>
                <div className="text-slate-12 whitespace-pre-wrap">{c.comment}</div>
              </div>
            ))}
            {!comments.length && <div className="text-slate-11 text-sm">No comments yet.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ k, v, multiline }: { k: string; v: string; multiline?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-3 text-sm">
      <div className="text-slate-10">{k}</div>
      <div className={`col-span-2 ${multiline ? "whitespace-pre-wrap" : ""}`}>{v}</div>
    </div>
  )
}
