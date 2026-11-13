import { Mail, Phone } from "lucide-react";
import { profile } from "@/lib/data";
export default function Footer() {
  return (
    <footer><div className="wrap">
      <span>© {new Date().getFullYear()} {profile.fullName}</span>
      <span className="flinks">
        <a href={"mailto:" + profile.email}><Mail size={14} /> {profile.email}</a>
        <a href={profile.phoneHref}><Phone size={14} /> {profile.phone}</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      </span>
    </div></footer>
  );
}
