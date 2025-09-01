import { NavbarLink, NavbarLinkBackground } from "./link"
import clsx from "clsx"

export const Header = async () => {
  const navbar = {
    items: [
      { href: "/", _title: "Home" },
      { href: "#elevate", _title: "Elevate" },
      { href: "#speakers", _title: "Speakers" },
      { href: "#startups", _title: "Startups" },
      { href: "#events", _title: "Events" },
      { href: "#board", _title: "Board" },
    ],
  }

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-slate-1/80 backdrop-blur-md rounded-full border border-slate-6">
        <div
          className={clsx(
            "bg-slate-1/80 backdrop-blur-md rounded-full p-1 flex relative items-center",
            "shadow-[0px_-1px_3px_0px_rgba(0,_0,_0,_0.05),_0px_7px_2px_0px_rgba(0,_0,_0,_0.02),_0px_4px_2px_0px_rgba(0,_0,_0,_0.05),_0px_2px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(0,_0,_0,_0.03),_0px_0px_1px_0px_rgba(0,_0,_0,_0.04)]",
            "dark:shadow-[0px_-1px_3px_0px_rgba(0,_0,_0,_0.03),_0px_7px_2px_0px_rgba(0,_0,_0,_0.03),_0px_4px_2px_0px_rgba(0,_0,_0,_0.05),_0px_2px_1px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(0,_0,_0,_0.1),_0px_0px_1px_0px_rgba(0,_0,_0,_0.1)]",
          )}
        >
          <NavbarLinkBackground links={navbar.items.map((item) => item.href)} />
          {navbar.items.map(({ href, _title }) => (
            <NavbarLink key={href} href={href}>
              {_title}
            </NavbarLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
