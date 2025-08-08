"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { InputForm } from "@/components/waitlist-form"

interface JoinSectionProps {
  emailInput: {
    _title: string
    placeholder: string
    required: boolean
    type: string
  }
  formAction: (data: FormData) => Promise<{ success: true } | { success: false; error: string }>
  buttonCopy: {
    idleCopy: string
    successCopy: string
    submittingCopy: string
  }
}

export function JoinSection({ emailInput, formAction, buttonCopy }: JoinSectionProps) {
  return (
    <section id="join" className="py-24 px-5 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-slate-4/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-40 h-40 bg-slate-6/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="bg-slate-2 rounded-3xl p-12 border border-slate-6 text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FadeIn>
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">
                Ready to{" "}
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="bg-gradient-to-r from-slate-12 to-slate-10 bg-clip-text text-g">
                    Build?
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-12"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </motion.span>
              </h2>
              <p className="text-xl text-slate-11 leading-relaxed max-w-2xl mx-auto">
                Join the most ambitious founders, engineers, and creators at UC Irvine. Applications are selective —
                we're looking for builders who are ready to make an impact.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.div
              className="max-w-md mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <InputForm
                name="email"
                type={emailInput.type}
                placeholder={emailInput.placeholder}
                required={emailInput.required}
                buttonCopy={{
                  idle: buttonCopy.idleCopy,
                  success: buttonCopy.successCopy,
                  loading: buttonCopy.submittingCopy,
                }}
                formAction={formAction}
              />
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="pt-4 space-y-4">
              <p className="text-sm text-slate-10">
                Applications reviewed on a rolling basis. We'll be in touch within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-slate-11">
                <span>Questions?</span>
                <motion.a
                  href="mailto:hello@manifestuci.com"
                  className="text-slate-12 underline hover:no-underline"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  hello@manifestuci.com
                </motion.a>
              </div>
            </div>
          </FadeIn>
        </motion.div>
      </div>
    </section>
  )
}
