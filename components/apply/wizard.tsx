"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { saveDraft, submitApplication } from "@/app/apply/actions"
import { Loader2, CheckCircle2 } from 'lucide-react'

type ApplicationData = {
  id: string
  name: string
  email: string
  year: string
  focus: string
  teamSize: string
  brief: string
  problem: string
  progress: string
  links: string
  applyElevate?: boolean
  elevateVideo?: string
  submitted?: boolean
}

export function ApplyWizard({ initialData }: { initialData: ApplicationData }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<ApplicationData>(initialData)
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [submitting, startSubmit] = useTransition()
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const progress = useMemo(() => Math.round(((step + 1) / 4) * 100), [step])

  // Autosave (debounced)
  useEffect(() => {
    if (data.submitted) return
    const handle = setTimeout(async () => {
      try {
        setStatus("saving")
        const res = await saveDraft({
          id: data.id,
          name: data.name,
          email: data.email,
          year: data.year,
          focus: data.focus,
          brief: data.brief,
          problem: data.problem,
          progress: data.progress,
          links: data.links,
          apply_elevate: Boolean(data.applyElevate),
          elevate_video: data.elevateVideo || null,
        })
        if (!res.success) {
          setStatus("error")
        } else {
          setStatus("saved")
          setTimeout(() => setStatus("idle"), 800)
        }
      } catch {
        setStatus("error")
      }
    }, 600)
    return () => clearTimeout(handle)
  }, [data])

  const canSubmit =
    data.name &&
    data.email &&
    data.year &&
    data.focus &&
    data.brief &&
    data.problem &&
    data.progress &&
    (!data.applyElevate || !!data.elevateVideo)

  function next() {
    setStep((s) => Math.min(3, s + 1))
  }
  function back() {
    setStep((s) => Math.max(0, s - 1))
  }

  if (data.submitted || submittedId) {
    return (
      <div className="min-h-screen py-12 px-5">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-slate-6 bg-slate-1">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2 text-xl">
                <CheckCircle2 className="w-6 h-6" />
                Application submitted
              </div>
              <p className="text-slate-11">
                Thanks for applying! We’ll be in touch within 48 hours.
              </p>
              {submittedId && (
                <div className="text-sm text-slate-11">
                  Application ID: <span className="font-mono text-slate-12">{submittedId}</span>
                </div>
              )}
              <div>
                <a href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-slate-12 text-slate-1 px-4 text-sm font-medium hover:bg-slate-11">
                  Go to homepage
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10 md:py-14 px-5">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-medium text-slate-12">Application Portal</h1>
            <p className="text-slate-11 text-sm md:text-base">
              Your progress is autosaved.
            </p>
          </div>
          <div className="text-xs text-slate-10">
            {status === "saving" ? "Saving..." : status === "saved" ? "Saved" : ""}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 w-full" />
          <span className="text-xs text-slate-10 tabular-nums">{progress}%</span>
        </div>

        <Card className="border border-slate-6 bg-slate-1">
          <CardContent className="pt-6 space-y-6">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-xl font-medium text-slate-12">1. Your info</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Full name" id="name" value={data.name} onChange={(v) => setData((d) => ({ ...d, name: v }))} placeholder="Jane Doe" />
                  <Field label="Email" id="email" type="email" value={data.email} onChange={(v) => setData((d) => ({ ...d, email: v }))} placeholder="jane@uci.edu" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <SelectField
                    label="Year"
                    id="year"
                    value={data.year}
                    onChange={(v) => setData((d) => ({ ...d, year: v }))}
                    options={[
                      { value: "", label: "Select year", disabled: true },
                      { value: "freshman", label: "Freshman" },
                      { value: "sophomore", label: "Sophomore" },
                      { value: "junior", label: "Junior" },
                      { value: "senior", label: "Senior" },
                      { value: "grad", label: "Graduate" },
                    ]}
                  />
                  <SelectField
                    label="Focus"
                    id="focus"
                    value={data.focus}
                    onChange={(v) => setData((d) => ({ ...d, focus: v }))}
                    options={[
                      { value: "", label: "Select focus", disabled: true },
                      { value: "engineering", label: "Engineering" },
                      { value: "design", label: "Design" },
                      { value: "product", label: "Product" },
                      { value: "business", label: "Business/GTM" },
                      { value: "research", label: "Research" },
                    ]}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-1">
                    <label className="text-sm text-slate-11">Apply to Elevate?</label>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setData((d) => ({ ...d, applyElevate: !d.applyElevate }))}
                        className={`h-6 w-11 rounded-full transition-colors ${data.applyElevate ? 'bg-slate-12' : 'bg-slate-6'}`}
                        aria-pressed={Boolean(data.applyElevate)}
                        aria-label="Toggle Elevate application"
                      >
                        <span
                          className={`block h-5 w-5 bg-slate-1 rounded-full translate-x-[3px] transition-transform ${data.applyElevate ? 'translate-x-[22px]' : ''}`}
                        />
                      </button>
                      <span className="text-sm text-slate-11">{data.applyElevate ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  {data.applyElevate && (
                    <div className="md:col-span-2">
                      <Field
                        label="1-min intro video link (required for Elevate)"
                        id="elevateVideo"
                        value={data.elevateVideo || ''}
                        onChange={(v) => setData((d) => ({ ...d, elevateVideo: v }))}
                        placeholder="https://..."
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-medium text-slate-12">2. What you're building</h2>
                <TextAreaField label="Idea / product (2–4 sentences)" id="brief" rows={5} value={data.brief} onChange={(v) => setData((d) => ({ ...d, brief: v }))} placeholder="What are you building or hoping to build?" />
                <TextAreaField label="Problem and who it helps" id="problem" rows={4} value={data.problem} onChange={(v) => setData((d) => ({ ...d, problem: v }))} placeholder="Explain the user, pain point, and why now." />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-medium text-slate-12">3. Progress</h2>
                <TextAreaField label="Progress and next milestone" id="progress" rows={5} value={data.progress} onChange={(v) => setData((d) => ({ ...d, progress: v }))} placeholder="What have you shipped? Any users or traction? What's next in 2–4 weeks?" />
                <Field label="Links (portfolio, GitHub, product, etc.) — optional" id="links" value={data.links} onChange={(v) => setData((d) => ({ ...d, links: v }))} placeholder="https://github.com/username, https://product.com" />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-medium text-slate-12">4. Review</h2>
                <ReviewBlock title="Contact">
                  <ReviewRow label="Name" value={data.name} />
                  <ReviewRow label="Email" value={data.email} />
                  <ReviewRow label="Year" value={data.year} />
                  <ReviewRow label="Focus" value={data.focus} />
                  <ReviewRow label="Applying to Elevate" value={data.applyElevate ? 'Yes' : 'No'} />
                  {data.applyElevate && (
                    <ReviewRow label="Elevate intro video" value={data.elevateVideo || '—'} />
                  )}
                </ReviewBlock>
                <ReviewBlock title="Project">
                  <ReviewRow label="Idea / product" value={data.brief} multiline />
                  <ReviewRow label="Problem" value={data.problem} multiline />
                  <ReviewRow label="Progress" value={data.progress} multiline />
                  <ReviewRow label="Links" value={data.links || "—"} multiline />
                </ReviewBlock>
              </div>
            )}

            {error && <p className="text-sm text-[#ff3b30]">{error}</p>}

            <div className="flex items-center justify-between pt-2">
              <div />
              <div className="ml-auto flex gap-2">
                {step > 0 && (
                  <Button variant="secondary" onClick={back}>
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button onClick={next}>Next</Button>
                ) : (
                  <Button
                    onClick={() =>
                      startSubmit(async () => {
                        setError(null)
                        if (!canSubmit) {
                          setError("Please complete all required fields.")
                          return
                        }
                        const res = await submitApplication(data.id)
                        if (res.success) {
                          setSubmittedId(res.appId ?? null)
                        } else {
                          setError(res.error ?? "Failed to submit")
                        }
                      })
                    }
                    disabled={!canSubmit || submitting}
                  >
                    {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</> : "Submit application"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SelectField({
  label,
  id,
  value,
  onChange,
  options,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  options: Array<{ value: string; label: string; disabled?: boolean }>
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-slate-11">{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-slate-11">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12 placeholder:text-slate-9"
      />
    </div>
  )
}

function TextAreaField({
  label,
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-slate-11">{label}</label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-6 bg-slate-1 p-3 text-sm text-slate-12 placeholder:text-slate-9"
      />
    </div>
  )
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-6 p-4">
      <h3 className="text-slate-12 font-medium mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
function ReviewRow({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-3 text-sm">
      <div className="text-slate-10">{label}</div>
      <div className={`col-span-2 ${multiline ? "whitespace-pre-wrap" : ""}`}>{value}</div>
    </div>
  )
}
