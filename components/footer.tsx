"use client"

export function Footer() {
  return (
    <footer className="py-12 px-5 border-t border-slate-6 bg-slate-1">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-slate-11 text-sm">
          {'© '} {new Date().getFullYear()} Manifest at UCI. All rights reserved.
        </div>
        <nav aria-label="Footer">
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <a href="#programs" className="text-slate-11 hover:text-slate-12">Programs</a>
            </li>
            <li>
              <a href="#events" className="text-slate-11 hover:text-slate-12">Events</a>
            </li>
            <li>
              <a href="#startups" className="text-slate-11 hover:text-slate-12">Startups</a>
            </li>
            <li>
              <a href="#faq" className="text-slate-11 hover:text-slate-12">FAQ</a>
            </li>
            <li>
              <a href="#join" className="text-slate-11 hover:text-slate-12">Join</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
