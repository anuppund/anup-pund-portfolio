import type { Metadata } from "next";
import ProjectsView from "./view";
export const metadata: Metadata = { title: "Projects" };
export default function Page() { return <section><div className="wrap"><div className="sec-h"><h2>Projects</h2><p>Security projects first, then web, mobile and database work.</p></div><ProjectsView /></div></section>; }
