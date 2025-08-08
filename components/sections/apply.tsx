"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

type ApplySectionProps = {
  onSubmit: (fd: FormData) => Promise<{ success: true } | { success: false; error: string }>
}

export function ApplySection({ onSubmit }: ApplySectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <section id="apply" className="px-5 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-4xl md:text-5xl font-medium text-slate-12 tracking-tight">Apply to Manifest</h2>
            <p className="text-slate-11 text-base md:text-lg">Selective, high-energy, and built for builders.</p>
          </div>
        </FadeIn>

        <motion.form
          className="rounded-2xl border border-slate-6 bg-slate-1 p-6 md:p-8 space-y-5"
          onSubmit={async (e) => {
            e.preventDefault()
            if (isSubmitting) return
            setIsSubmitting(true)
            setError(null)
            const fd = new FormData(e.currentTarget as HTMLFormElement)
            const res = await onSubmit(fd)
            setIsSubmitting(false)
            if (res.success) {
              setSuccess(true)
              ;(e.currentTarget as HTMLFormElement).reset()
            } else {
              setError(res.error)
            }
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-slate-11">Full Name</label>
              <input
                id="name"
                name="name"
                required
                placeholder="Jane Doe"
                className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12 placeholder:text-slate-9"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-slate-11">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@uci.edu"
                className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12 placeholder:text-slate-9"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="year" className="text-sm text-slate-11">Year</label>
              <select
                id="year"
                name="year"
                required
                className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12"
                defaultValue=""
              >
                <option value="" disabled>
                  Select year
                </option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="grad">Graduate</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="focus" className="text-sm text-slate-11">Focus Area</label>
              <select
                id="focus"
                name="focus"
                required
                className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12"
                defaultValue=""
              >
                <option value="" disabled>
                  Select focus
                </option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="product">Product</option>
                <option value="business">Business/GTM</option>
                <option value="research">Research</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="brief" className="text-sm text-slate-11">
              What are you building or hoping to build? (2-4 sentences)
            </label>
            <textarea
              id="brief"
              name="brief"
              required
              rows={4}
              placeholder="Tell us about your idea, problem space, or what you want to explore..."
              className="w-full rounded-lg border border-slate-6 bg-slate-1 p-3 text-sm text-slate-12 placeholder:text-slate-9"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="links" className="text-sm text-slate-11">
              Links (portfolio, GitHub, product, etc.) — optional
            </label>
            <input
              id="links"
              name="links"
              placeholder="https://github.com/username, https://product.com"
              className="h-11 w-full rounded-lg border border-slate-6 bg-slate-1 px-3 text-sm text-slate-12 placeholder:text-slate-9"
            />
          </div>

          {error && <p className="text-sm text-[#ff3b30]">{error}</p>}
          {success && <p className="text-sm text-green-600">Application submitted — we’ll be in touch within 48 hours.</p>}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 h-11 rounded-full bg-slate-12 text-slate-1 text-sm font-medium disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
