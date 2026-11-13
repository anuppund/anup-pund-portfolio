"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Lock } from "lucide-react";
const items = [["/", "Home"], ["/about", "About"], ["/projects", "Projects"], ["/certifications", "Certifications"], ["/skills", "Skills"], ["/contact", "Contact"]];
export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k); }, [open]);
  return (
    <header className="nav">
      <div className="wrap">
        <Link href="/" className="brand"><span className="glyph" aria-hidden="true">&gt;_</span> Anup <span>Pund</span></Link>
        <span className="secure" title="Decorative status badge"><Lock size={12} /> secure session</span>
        <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav id="main-nav" className={"links" + (open ? " open" : "")} aria-label="Main">
          {items.map(([href, label]) => (
            <Link key={href} href={href} className={path === href ? "on" : ""} aria-current={path === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
