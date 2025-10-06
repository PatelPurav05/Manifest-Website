"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { Linkedin, Twitter, Github, Mail } from 'lucide-react'

export function BoardSection() {
  const boardMembers = [
    {
      name: "Shouryaa Sharma",
      role: "President",
      year: "Junior",
      major: "Computer Science",
      bio: "",
      image: "/shouryaa.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/shouryaasharma",
      },
      achievements: ["Partner at Crater Ventures", "Investments Analyst @ Newport Capital"],
    },
    {
      name: "Ariyana Abraham",
      role: "Vice President",
      year: "Junior",
      major: "Business Administration",
      bio: "",
      image: "/ariyana.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/ariyanaabraham",
      },
      achievements: ["VP of Finance @ MUSA and UCI Rocket"],
    },
    {
      name: "Connor Ruffalo",
      role: "VP of Finance",
      year: "Senior",
      major: "Business Economics",
      bio: "",
      image: "/connor.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/cruffalo",
      },
      achievements: ["Co-Founder @ CAPCASE", "Project Manager @ UCI Rocket"],
    },
    {
      name: "Meera Phadnis",
      role: "Co-VP of Marketing",
      year: "Sophomore",
      major: "",
      bio: "",
      image: "/meera.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/meeraphadnis",
      },
      achievements: ["Marketing @ First Tech Challenge"],
    },
    {
      name: "Noah Chie",
      role: "Co-VP of External",
      year: "Sophomore",
      major: "Biomedical Engineering",
      bio: "",
      image: "/noah.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/noah-chie",
      },
      achievements: ["R&D Engineer Intern @ Vena Vitals (YC S20)", "Operations Engineer @ UCI Rocket"],
    },
    {
      name: "Janani Prasad",
      role: "VP of Communications",
      year: "Junior",
      major: "Computer Science",
      bio: "",
      image: "/janani.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/jananiprasad8",
      },
      achievements: ["Co-Founder @ PUG", "Software Engineer Intern @ Fortive ASP"],
    },
    {
      name: "Purav Patel",
      role: "VP of Technology",
      year: "Junior",
      major: "Computer Science and Engineering",
      bio: "",
      image: "/purav.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/puravp05",
      },
      achievements: ["Co-Founder @ PUG", "Technical Product Manager Intern @ First American"],
    },

    {
      name: "Braden Ransom",
      role: "VP of Internal Affairs",
      year: "Senior",
      major: "Informatics",
      bio: "",
      image: "/brady.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/brady-ransom",
      },
      achievements: ["Campus Partner @ Perplexity","VP of Risk Management @ NIC & Sigma Chi"],
    },
    {
      name: "Sri Gubbala",
      role: "Co-VP of External",
      year: "Senior",
      major: "CS + BIM",
      bio: "",
      image: "/sri.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/sriharshini-gubbala-283740246",
      },
      achievements: ["APM @ ZotSun", "Team Lead @ CubeSat UCI"],
    },
  ]

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-4 h-4" />
      case "twitter":
        return <Twitter className="w-4 h-4" />
      case "github":
        return <Github className="w-4 h-4" />
      case "email":
        return <Mail className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <section id="board" className="py-16 md:py-24 px-5 bg-slate-2 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 bg-slate-4/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">
              Meet Our{" "}
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="bg-gradient-to-r from-slate-12 to-slate-10 bg-clip-text text-transparent">
                  Leadership
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
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {boardMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className={`group bg-slate-1 rounded-3xl p-5 md:p-6 border border-slate-6 hover:border-slate-8 transition-all duration-300 cursor-pointer relative overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              {/* Profile Image */}
              <div className="relative mb-4">
                <motion.div
                  className="w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-slate-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                
              </div>

              {/* Member Info */}
              <div className="text-center space-y-3">
                <div>
                  <h3 className="text-lg font-medium text-slate-12 group-hover:text-slate-11 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-11 text-sm font-medium">{member.role}</p>
                  <p className="text-xs text-slate-10">
                    {member.year} • {member.major}
                  </p>
                </div>

                {member.bio && (
                  <p className="text-sm text-slate-11 leading-relaxed group-hover:text-slate-10 transition-colors">
                    {member.bio}
                  </p>
                )}

                {/* Achievements hidden temporarily */}
                {/* <div className="flex flex-wrap gap-2 justify-center">
                  {member.achievements.map((achievement, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-12 text-slate-1 text-xs rounded-full font-medium">
                      {achievement}
                    </span>
                  ))}
                </div> */}

                {/* Social Links */}
                {Object.keys(member.socials).length > 0 && (
                  <div className="flex justify-center gap-3 pt-2">
                    {Object.entries(member.socials as Record<string, string>).map(([platform, url]) => (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-slate-3 hover:bg-slate-12 text-slate-11 hover:text-slate-1 rounded-full flex items-center justify-center transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {getSocialIcon(platform)}
                      </motion.a>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-12/5 to-transparent rounded-3xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
