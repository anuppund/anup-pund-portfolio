export const profile = {
  name: "Anup Pund",
  fullName: "Anup Sudarshan Pund",
  email: "anuppund.123@gmail.com",
  phone: "+91 8459267087",
  phoneHref: "tel:+918459267087",
  photo: "/images/anup-pund.jpg",
  linkedin: "https://www.linkedin.com/in/anup-pund-397366216/",
  github: "https://github.com/anuppund",
  resume: "/resume/Anup_Pund_Resume.pdf",
  location: "Pune, Maharashtra, India",
};

export type Cert = { id: string; title: string; issuer: string; date: string; category: string; skills: string[]; file: string; type: "pdf" | "image"; note?: string };
export const certificates: Cert[] = [
  { id: "aws", title: "AWS Security Engineer: Cloud Governance, Compliance, and Security Strategy", issuer: "AWS Training & Certification", date: "December 8, 2025", category: "Cloud", skills: ["Cloud security", "Governance", "Compliance"], file: "/certificates/aws-security-engineer.pdf", type: "pdf" },
  { id: "nptel", title: "Ethical Hacking", issuer: "NPTEL, IIT Kharagpur", date: "Jul–Oct 2026", category: "Cybersecurity", skills: ["Ethical hacking", "Security fundamentals"], file: "/certificates/nptel-ethical-hacking.pdf", type: "pdf", note: "Elite certificate, consolidated score 77%" },
  { id: "pledge", title: "Cyber Safety Pledge", issuer: "Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs", date: "September 23, 2026", category: "Cybersecurity", skills: ["Cyber hygiene", "Cyber crime awareness"], file: "/certificates/cyber-safety-pledge.pdf", type: "pdf" },
  { id: "google", title: "Foundations of Cybersecurity", issuer: "Google, via Coursera", date: "January 30, 2025", category: "Cybersecurity", skills: ["Security fundamentals", "Risk and threats"], file: "/certificates/google-foundations-of-cybersecurity.pdf", type: "pdf" },
  { id: "spoken", title: "Java Training", issuer: "Spoken Tutorial Project, IIT Bombay", date: "November 8, 2024", category: "Programming", skills: ["Java"], file: "/certificates/spoken-tutorial-java.pdf", type: "pdf", note: "Score 85%" },
  { id: "udemy", title: "Advance Java", issuer: "Udemy", date: "March 31, 2025", category: "Programming", skills: ["Java"], file: "/certificates/udemy-advance-java.png", type: "image", note: "28 hours" },
];
// Listed on the resume, but no certificate file has been supplied yet. Add files to public/certificates and move them into the list above.
export const pendingCerts = ["Ethical Hacking Advanced (Z Security)", "Hacking With Python Advanced (Z Security)", "Mastercard Cyber Security Job Simulation"];

export type Project = { slug: string; title: string; category: "Cybersecurity" | "Web" | "Mobile" | "Database"; summary: string; problem: string; role?: string; stack: string[]; features: string[]; github?: string; live?: string; note?: string };
export const projects: Project[] = [
  { slug: "deepfake-forensics", title: "Deepfake Forensics System", category: "Cybersecurity", summary: "A forensic tool that analyses possibly manipulated media and produces a forensic-grade report.", problem: "Spotting manipulated media is only half the job; findings also need to be documented in a form that can be reviewed and trusted.", role: "Built the tool and co-wrote related research papers (IJSREM).", stack: ["Java", "Spring Boot", "Python", "FastAPI", "OpenCV", "PyTorch"], features: ["Media analysis for deepfake detection", "Forensic-grade report with PDF export", "Tamper-evident chain of custody (hash-chained audit log with Merkle commitment, per the research paper)"], github: "https://github.com/anuppund/Deepfake-Forensics-System" },
  { slug: "blockchain-sso", title: "Blockchain-Based Single Sign-On", category: "Cybersecurity", summary: "Single sign-on built on blockchain to remove the need for many separate passwords.", problem: "Users and services juggle many passwords, which widens the attack surface.", role: "Built the project and published a paper on it (IJSREM).", stack: ["Blockchain"], features: ["One identity across multiple services", "Reduces dependence on multiple passwords"], github: "https://github.com/anuppund/Blockchain-Based-Single-Sign-On" },
  { slug: "sentineliq", title: "SentinelIQ SIEM Platform", category: "Cybersecurity", summary: "A SIEM platform for collecting, monitoring and analysing security events.", problem: "Security events from many sources are hard to follow without one place to collect and analyse them.", stack: ["PostgreSQL", "Redis", "Elasticsearch"], features: ["Security event collection", "Monitoring and analysis", "Threat detection"], note: "Repository link not added yet." },
  { slug: "anesha-naturals", title: "Anesha Naturals", category: "Web", summary: "E-commerce website for a natural skincare brand I co-founded with a friend.", problem: "A new brand needs a storefront it controls.", role: "Co-founder; built the website (team of 2).", stack: ["Next.js", "Vercel"], features: ["Live brand storefront"], live: "https://anesha-naturals.vercel.app" },
  { slug: "gagangiri", title: "Gagangiri Multi Services Website", category: "Web", summary: "A multi-language website for a local services business.", problem: "Customers speak different languages, so the site needed to as well.", role: "Solo project, design to delivery.", stack: ["Web development"], features: ["Multi-language support"], live: "https://www.gagangirimultiservices.in" },
  { slug: "clinic", title: "Clinic Appointment Management System", category: "Web", summary: "Healthcare app for patient registration, scheduling and appointments.", problem: "Clinics need one place for patients, doctors and bookings.", stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "JWT", "React", "Render"], features: ["Patient registration", "Doctor scheduling", "Appointment booking", "JWT authentication", "Medical records"], note: "Repository link not added yet." },
  { slug: "esports", title: "Esports Team Finder", category: "Mobile", summary: "Android platform that matches esports players, organises matches and offers team chat.", problem: "Players struggle to find teammates at their level.", stack: ["Android", "Java/Kotlin", "Firebase"], features: ["Matchmaking", "Team chat", "Leaderboards", "Admin panel"], note: "Repository link not added yet." },
  { slug: "govform", title: "GovForm Automator", category: "Web", summary: "Simplifies repetitive digital form-filling.", problem: "Government-style forms are long and repetitive.", stack: ["FastAPI", "React", "Vite"], features: ["Form-filling automation"], note: "Repository link not added yet." },
  { slug: "placement-dbms", title: "Placement Company DBMS", category: "Database", summary: "Database for organising placement-related company information.", problem: "Placement data is easier to manage when it is structured.", stack: ["SQL"], features: ["Structured company records"], note: "Repository link not added yet." },
  { slug: "catalog", title: "E-commerce Product Catalog", category: "Database", summary: "Product catalog management application.", problem: "Stores need a clean way to manage products.", stack: ["Databases", "Web development"], features: ["Catalog management"], note: "Repository link not added yet." },
];

export const skillGroups = [
  { name: "Cybersecurity", items: [["Kali Linux", "l"], ["Network security", "l"], ["Digital forensics", "p"], ["VAPT", "l"], ["Malware analysis", "l"], ["Incident response", "l"], ["Linux", "p"]] },
  { name: "Programming", items: [["Java", "p"], ["Python", "p"], ["SQL", "p"]] },
  { name: "Backend", items: [["FastAPI", "p"], ["REST APIs", "p"], ["Spring Boot", "p"]] },
  { name: "Databases", items: [["PostgreSQL", "p"], ["MySQL", "p"], ["SQLite", "p"], ["Firebase Realtime Database", "p"]] },
  { name: "Frontend", items: [["React", "p"], ["Next.js", "p"], ["TypeScript", "p"], ["Tailwind CSS", "p"]] },
  { name: "Testing, cloud and tools", items: [["Software testing", "p"], ["Git and GitHub", "p"], ["Postman", "p"], ["Render", "p"], ["Vercel", "p"], ["Android Studio", "p"], ["AWS security concepts", "l"]] },
] as const;

export const timeline = [
  { when: "2021", title: "Class 10, CBSE", detail: "Strawberry English Medium School, Sangamner. 77%." },
  { when: "Jun 2023", title: "Software Development Intern, NP IT Solutions", detail: "One month while completing my diploma." },
  { when: "2024", title: "Diploma in Computer Technology", detail: "Amrutvahini Polytechnic, Sangamner (MSBTE). 79.43%." },
  { when: "2024", title: "Started B.Tech at MIT ADT University", detail: "CSE with a specialization in Cyber Security and Forensics. Expected graduation 2027." },
  { when: "Jun 2025", title: "Cyber Security Analyst Intern, Launched Global", detail: "One-month summer internship and project training." },
  { when: "Dec 2025", title: "Software Tester Intern, OPlus India", detail: "Testing ColorOS and OxygenOS, including hardware testing, through May 2026." },
  { when: "2026", title: "Research papers (IJSREM)", detail: "Three papers: tamper-evident chain of custody for deepfake forensics, a deepfake forensics tool, and blockchain-based SSO." },
];
