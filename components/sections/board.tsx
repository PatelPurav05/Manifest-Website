"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { Linkedin, Twitter, Github, Mail } from 'lucide-react'

export function BoardSection() {
  const boardMembers = [
    {
      name: "Alex Chen",
      role: "President",
      year: "Senior",
      major: "Computer Science",
      bio: "Serial entrepreneur with 2 successful exits. Previously interned at Meta and led product at a Y Combinator startup.",
      image: "/placeholder.svg?height=400&width=400&text=Alex+Chen",
      socials: {
        linkedin: "https://linkedin.com/in/alexchen",
        twitter: "https://twitter.com/alexchen",
        email: "alex@manifestuci.com",
      },
      achievements: ["Y Combinator Alum", "Forbes 30 Under 30"],
    },
    {
      name: "Sarah Kim",
      role: "Vice President",
      year: "Junior",
      major: "Business Administration",
      bio: "Growth expert who scaled a fintech startup from 0 to 100K users. Passionate about connecting founders with resources.",
      image: "/placeholder.svg?height=400&width=400&text=Sarah+Kim",
      socials: {
        linkedin: "https://linkedin.com/in/sarahkim",
        github: "https://github.com/sarahkim",
        email: "sarah@manifestuci.com",
      },
      achievements: ["Thiel Fellowship", "TechCrunch Disrupt Winner"],
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Engineering",
      year: "Senior",
      major: "Software Engineering",
      bio: "Full-stack developer and open source contributor. Built the technical infrastructure for 3 venture-backed startups.",
      image: "/placeholder.svg?height=400&width=400&text=Marcus+Rodriguez",
      socials: {
        linkedin: "https://linkedin.com/in/marcusrodriguez",
        github: "https://github.com/marcusrodriguez",
        twitter: "https://twitter.com/marcusrodriguez",
        email: "marcus@manifestuci.com",
      },
      achievements: ["Google Summer of Code", "Open Source Contributor"],
    },
    {
      name: "Priya Patel",
      role: "Head of Operations",
      year: "Junior",
      major: "Economics",
      bio: "Operations wizard who streamlined processes at a Series B startup. Expert in community building and event management.",
      image: "/placeholder.svg?height=400&width=400&text=Priya+Patel",
      socials: {
        linkedin: "https://linkedin.com/in/priyapatel",
        twitter: "https://twitter.com/priyapatel",
        email: "priya@manifestuci.com",
      },
      achievements: ["McKinsey Intern", "Startup Grind Organizer"],
    },
    {
      name: "David Park",
      role: "Head of Partnerships",
      year: "Senior",
      major: "Business Information Management",
      bio: "Partnership strategist with connections across Silicon Valley. Secured funding and mentorship for 20+ student startups.",
      image: "/placeholder.svg?height=400&width=400&text=David+Park",
      socials: {
        linkedin: "https://linkedin.com/in/davidpark",
        email: "david@manifestuci.com",
      },
      achievements: ["500 Startups Mentor", "Angel Investor"],
    },
    {
      name: "Emma Thompson",
      role: "Head of Marketing",
      year: "Junior",
      major: "Digital Marketing",
      bio: "Growth marketer who built viral campaigns reaching 1M+ users. Specializes in community-driven growth strategies.",
      image: "/placeholder.svg?height=400&width=400&text=Emma+Thompson",
      socials: {
        linkedin: "https://linkedin.com/in/emmathompson",
        twitter: "https://twitter.com/emmathompson",
        email: "emma@manifestuci.com",
      },
      achievements: ["Viral Campaign Creator", "Growth Hacker Award"],
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
    <section className="py-16 md:py-24 px-5 bg-slate-2 relative overflow-hidden">
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
            <p className="text-xl text-slate-11 max-w-3xl mx-auto leading-relaxed">
              Our board members are proven builders, operators, and visionaries who've launched companies, raised
              funding, and created real impact in the startup ecosystem.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className={`group bg-slate-1 rounded-3xl p-8 border border-slate-6 hover:border-slate-8 transition-all duration-300 cursor-pointer relative overflow-hidden ${index >= 3 ? "hidden md:block" : ""}`}
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
              <div className="relative mb-6">
                <motion.div
                  className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-slate-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Achievement badges */}
                <div className="absolute -top-2 -right-2">
                  <motion.div
                    className="w-6 h-6 bg-slate-12 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="text-slate-1 text-xs">✨</span>
                  </motion.div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-slate-12 group-hover:text-slate-11 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-11 font-medium">{member.role}</p>
                  <p className="text-sm text-slate-10">
                    {member.year} • {member.major}
                  </p>
                </div>

                <p className="text-sm text-slate-11 leading-relaxed group-hover:text-slate-10 transition-colors">
                  {member.bio}
                </p>

                {/* Achievements */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.achievements.map((achievement, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-12 text-slate-1 text-xs rounded-full font-medium">
                      {achievement}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 pt-2">
                  {Object.entries(member.socials).map(([platform, url]) => (
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
