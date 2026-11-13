import type { Metadata } from "next";
import CertView from "./view";
export const metadata: Metadata = { title: "Certifications" };
export default function Page() { return <section><div className="wrap"><div className="sec-h"><h2>Certifications</h2><p>Search, filter and open the original certificates.</p></div><CertView /></div></section>; }
