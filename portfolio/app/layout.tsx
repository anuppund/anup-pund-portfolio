import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BackToTop, ScrollProgress, PointerFX } from "@/components/Extras";
const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const viewport: Viewport = { themeColor: "#050b18", width: "device-width", initialScale: 1 };
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Anup Pund | Cybersecurity & Digital Forensics", template: "%s | Anup Pund" },
  description: "Computer Science Engineering student specializing in Cyber Security and Forensics at MIT ADT University, Pune. Projects, certifications and research in digital forensics and secure software.",
  openGraph: { title: "Anup Pund | Cybersecurity & Digital Forensics", description: "Building secure, reliable technology through cybersecurity, digital forensics and software engineering.", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <PointerFX />
      </body>
    </html>
  );
}
