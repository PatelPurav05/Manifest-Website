"use client"

import * as React from "react"
import Link from "next/link"

export function AdminAppsTable({ apps, counts }: { apps: any[]; counts: Map<string, { yes: number; maybe: number; no: number }> }) {
  const [query, setQuery] = React.useState('')
  const [onlyElevate, setOnlyElevate] = React.useState(false)
  const [sortBy, setSortBy] = React.useState<'created' | 'name' | 'votes'>('created')
  const [asc, setAsc] = React.useState(false)

  const filtered = React.useMemo(() => {
    let list = apps.filter(a => {
      const q = query.toLowerCase()
      const matches = (a.name || '').toLowerCase().includes(q) || (a.email || '').toLowerCase().includes(q)
      const elevateOk = !onlyElevate || !!a.apply_elevate
      return matches && elevateOk
    })
    list.sort((a, b) => {
      if (sortBy === 'name') {
        return (a.name || a.email || '').localeCompare(b.name || b.email || '') * (asc ? 1 : -1)
      }
      if (sortBy === 'votes') {
        const va = (counts.get(a.id)?.yes ?? 0) - (counts.get(a.id)?.no ?? 0)
        const vb = (counts.get(b.id)?.yes ?? 0) - (counts.get(b.id)?.no ?? 0)
        return (va - vb) * (asc ? 1 : -1)
      }
      const da = new Date(a.created_at).getTime()
      const db = new Date(b.created_at).getTime()
      return (da - db) * (asc ? 1 : -1)
    })
    return list
  }, [apps, counts, query, onlyElevate, sortBy, asc])

  return (
    <div className="rounded-xl border border-slate-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between p-3 bg-slate-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email"
          className="h-9 w-full md:w-64 rounded-md border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12"
        />
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-11 flex items-center gap-2">
            <input type="checkbox" checked={onlyElevate} onChange={(e) => setOnlyElevate(e.target.checked)} />
            Elevate only
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 rounded-md border border-slate-6 bg-slate-1 px-2 text-sm text-slate-12"
          >
            <option value="created">Newest</option>
            <option value="name">Name</option>
            <option value="votes">Votes (Yes-No)</option>
          </select>
          <button
            onClick={() => setAsc((v) => !v)}
            className="h-9 rounded-md border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12"
          >
            {asc ? 'Asc' : 'Desc'}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 bg-slate-2 p-3 text-sm text-slate-11">
        <div className="col-span-4">Applicant</div>
        <div className="col-span-2">Year</div>
        <div className="col-span-2">Focus</div>
        <div className="col-span-2">Submitted</div>
        <div className="col-span-2 text-right">Votes</div>
      </div>
      <div className="divide-y divide-slate-6">
        {filtered.map((a) => {
          const c = counts.get(a.id) ?? { yes: 0, maybe: 0, no: 0 }
          return (
            <Link key={a.id} href={`/admin/applications/${a.id}`} className="grid grid-cols-12 p-3 hover:bg-slate-2 transition-colors">
              <div className="col-span-4">
                <div className="text-slate-12 font-medium flex items-center gap-2">
                  {a.name || a.email}
                  {a.apply_elevate && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-12 text-slate-1">Elevate</span>}
                </div>
                <div className="text-slate-10 text-xs">{a.email}</div>
              </div>
              <div className="col-span-2">{a.year || '—'}</div>
              <div className="col-span-2">{a.focus || '—'}</div>
              <div className="col-span-2">{new Date(a.submitted_at as any).toLocaleDateString()}</div>
              <div className="col-span-2 text-right text-sm">
                <span className="mr-2">✅ {c.yes}</span>
                <span className="mr-2">🤔 {c.maybe}</span>
                <span>❌ {c.no}</span>
              </div>
            </Link>
          )
        })}
        {!filtered.length && <div className="p-4 text-slate-11">No applications match.</div>}
      </div>
    </div>
  )
}


