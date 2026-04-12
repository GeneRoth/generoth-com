"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ExternalLink, Mail, Link2,
  Shield, Brain, BarChart3, Database, Code2,
  ArrowRight, Cpu, Globe, FileText, Zap, Users
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
  { label: "Stack", href: "#stack" },
];

const SERVICES = [
  {
    icon: Shield,
    category: "Advisory & Consulting",
    color: "#06b6d4",
    items: [
      "DBE/ACDBE Program Advisory",
      "Strategic Narrative Development",
      "Qualifying Factor Identification",
      "Recertification & Growth Strategy",
      "Title VI Compliance Programs",
      "ADA / Section 504 Accessibility & Equity",
      "Regulatory Program Design & Monitoring",
      "Civil Rights Compliance Operations",
    ],
  },
  {
    icon: Brain,
    category: "AI-Powered Compliance Tools",
    color: "#8b5cf6",
    items: [
      "Compliance Audit Agent",
      "DBE/ACDBE Narrative Builder (RAG)",
      "Certification Deadline Monitor",
      "IFR Recertification Rate Tracker",
      "Grant Reporting Tracker",
      "Regulatory Change Detection Agent",
    ],
  },
  {
    icon: BarChart3,
    category: "Data & Analytics",
    color: "#10b981",
    items: [
      "Airport Operational Performance Intelligence",
      "Airline Passenger Experience Analytics",
      "Environmental Compliance Intel",
      "UCP/DBE Certification Rate Analytics",
      "Federal Program Performance Dashboards",
      "BTS Flight Data Analysis (7M+ records)",
    ],
  },
  {
    icon: Code2,
    category: "AI & Technology Services",
    color: "#f59e0b",
    items: [
      "Custom Compliance SaaS Development",
      "Agentic AI Workflow Design",
      "RAG System Architecture",
      "LLM Integration & Prompt Engineering",
      "Interactive Dashboard Development",
      "Course & Knowledge Product Development",
    ],
  },
];

const PORTFOLIO = [
  {
    id: "01",
    title: "DBE/ACDBE IFR Recertification Dashboard",
    description: "Interactive compliance tracker monitoring recertification rates across state DOTs and UCPs following the FAA Interim Final Rule. Features filterable tables, status badges, map visualization, and editable rows.",
    tech: ["HTML5", "JavaScript", "Leaflet.js", "CSS3"],
    color: "#06b6d4",
    icon: Shield,
    href: "https://recertdashboard.netlify.app",
    metrics: "50+ UCPs tracked · Real-time IFR compliance status",
  },
  {
    id: "02",
    title: "U.S. Airport Operational Performance",
    description: "Built on 7 million BTS flight records from 140 hub airports. Explore on-time performance by carrier, airport, and hub category — the same data FAA and airlines use to measure operational health.",
    tech: ["Python", "Streamlit", "Pandas", "Plotly"],
    color: "#8b5cf6",
    icon: Globe,
    href: "https://zippy-bavarois-98956a.netlify.app",
    metrics: "7M+ flight records · 140 hub airports · Sub-second queries",
  },
  {
    id: "03",
    title: "Airline Passenger Experience Intelligence",
    description: "AI-powered platform surfacing patterns in airline service quality and passenger satisfaction. Filter by carrier and explore what the data actually shows beneath the headline numbers.",
    tech: ["Python", "NLP", "Streamlit", "scikit-learn"],
    color: "#10b981",
    icon: Users,
    href: "https://guileless-pithivier-ee9f68.netlify.app",
    metrics: "NLP-powered · Carrier-level sentiment analysis",
  },
  {
    id: "04",
    title: "DBE/ACDBE Narrative Builder",
    description: "An AI-assisted tool that helps firms structure and draft compliant DBE/ACDBE program narratives. Guides users through the certification storytelling process using RAG architecture.",
    tech: ["RAG", "LLM", "Vector DB", "Python"],
    color: "#f59e0b",
    icon: FileText,
    href: "https://jade-fenglisu-63690b.netlify.app",
    metrics: "RAG-powered · Compliance-aware generation",
  },
  {
    id: "05",
    title: "Environmental Intelligence Platform",
    description: "Real-time environmental compliance monitoring and risk assessment for aviation operations. Tracks regulatory exposure and generates automated compliance briefs.",
    tech: ["Python", "APIs", "Streamlit", "Plotly"],
    color: "#ef4444",
    icon: Zap,
    href: "https://enviro-intelligence.streamlit.app",
    metrics: "Real-time monitoring · Automated risk scoring",
  },
  {
    id: "06",
    title: "GPU Path Tracer",
    description: "High-performance GPU-accelerated path tracing engine demonstrating advanced computational capabilities and systems-level programming expertise.",
    tech: ["WebGL", "GLSL", "JavaScript", "GPU"],
    color: "#ec4899",
    icon: Cpu,
    href: "https://lovely-pithivier-a966bf.netlify.app/raytracer.html",
    metrics: "GPU-accelerated · Real-time ray tracing",
  },
];

const STATS = [
  { value: "Custom AI Tools", label: "Built & Deployed" },
  { value: "Compliance Programs", label: "Designed & Operated" },
  { value: "Data Platforms", label: "Engineered & Launched" },
  { value: "Strategic Advisory", label: "Government · Industry · Artificial Intelligence" },
];

const ABOUT_CARDS = [
  { icon: Shield, title: "Federal Regulatory Expertise", desc: "FAA, DOT, FTA, DBE/ACDBE, Title VI, ADA/Section 504" },
  { icon: Brain, title: "AI Development", desc: "RAG systems, LLM integration, agentic workflows, custom compliance tools" },
  { icon: BarChart3, title: "Data Engineering", desc: "7M+ record datasets, real-time dashboards, NLP-powered analytics" },
  { icon: Database, title: "SaaS Architecture", desc: "Full-stack compliance platforms built for scale and reliability" },
];

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem", height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(4,13,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(6,182,212,0.1)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <motion.div style={{ display: "flex", alignItems: "center", gap: "10px" }} whileHover={{ scale: 1.02 }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: "linear-gradient(135deg, #06b6d4, #0891b2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "0.85rem", color: "#040d1a",
        }}>GR</div>
        <span style={{ fontWeight: 700, fontSize: "1rem", color: "#f1f5f9" }}>Gene Roth</span>
      </motion.div>

      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <motion.a key={link.href} href={link.href} whileHover={{ color: "#06b6d4" }}
            style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.2s" }}>
            {link.label}
          </motion.a>
        ))}
        <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{
            background: "#06b6d4", color: "#040d1a", padding: "0.5rem 1.25rem",
            borderRadius: "6px", textDecoration: "none", fontSize: "0.875rem", fontWeight: 700,
          }}>
          Hire Me
        </motion.a>
      </div>
    </motion.nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      backgroundImage: "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}>
      <div style={{
        position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none", animation: "float 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "10%", width: "300px", height: "300px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none", animation: "float 10s ease-in-out infinite reverse",
      }} />

      <motion.div style={{ y, opacity, textAlign: "center", padding: "0 2rem", maxWidth: "900px", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: "100px", padding: "0.4rem 1rem", marginBottom: "2rem",
          }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#06b6d4" }} />
          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#06b6d4" }}>
            Former FAA Director · AI Builder · Compliance Strategist
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
          <span style={{ color: "#f1f5f9" }}>Strategic Leadership</span>
          <br />
          <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Meets Technical Execution
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#94a3b8", maxWidth: "680px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Former FAA Director of Operations, Policy &amp; Compliance. National airport trade association Executive Director.
          Corporate procurement and sourcing executive. Now building AI tools that sit at the intersection of all three.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" as const }}>
          <motion.a href="#portfolio" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{
              background: "#06b6d4", color: "#040d1a", padding: "0.875rem 2rem", borderRadius: "8px",
              textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
            View Live Projects <ArrowRight size={16} />
          </motion.a>
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{
              background: "transparent", color: "#f1f5f9", padding: "0.875rem 2rem", borderRadius: "8px",
              textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
              border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s",
            }}>
            Work Together
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap" as const }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center", maxWidth: "180px" }}>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "#06b6d4", lineHeight: 1.2, marginBottom: "6px" }}>{stat.value}</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.03em", lineHeight: 1.4 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", color: "#64748b" }}>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#06b6d4", marginBottom: "1rem" }}>About</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            The intersection of{" "}
            <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              deep expertise
            </span>{" "}
            and AI execution
          </h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            I&apos;ve led federal compliance programs from inside the FAA, run a national aviation trade
            association, managed procurement and supplier diversity at scale for Enterprise Rent-A-Car,
            and built operational teams at Marriott and Omni Hotels. That&apos;s four industries, four
            executive roles, and four completely different definitions of what it means to get complex
            programs to perform.
          </p>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            What connects all of it is a commitment to execution over commentary. I&apos;ve never been
            the person who hands someone a report and walks away. At the FAA I built programs. At the
            trade association I built coalitions. At Enterprise I built sourcing systems. Now I build
            AI tools — and the compliance expertise that makes them actually useful comes from having
            lived inside the problems they&apos;re designed to solve.
          </p>
          <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
            That combination — deep regulatory knowledge, cross-industry executive experience, and
            hands-on AI development — is what I bring to every engagement.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
          {ABOUT_CARDS.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 4, borderColor: "rgba(6,182,212,0.3)" }}
              style={{
                padding: "1.25rem 1.5rem", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)", background: "rgba(7,20,40,0.4)",
                display: "flex", gap: "1rem", alignItems: "flex-start", transition: "all 0.2s",
              }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "8px",
                background: "rgba(6,182,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <item.icon size={18} color="#06b6d4" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "4px" }}>{item.title}</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" style={{
      padding: "8rem 2rem",
      background: "rgba(7,20,40,0.3)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#06b6d4", marginBottom: "1rem" }}>Services</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            What I{" "}
            <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              build and deliver
            </span>
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Four integrated practice areas — each informed by real federal experience
            and executed with production-grade AI and data engineering.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {SERVICES.map((service, i) => (
            <motion.div key={service.category}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                padding: "2rem", borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.06)", background: "rgba(4,13,26,0.6)", transition: "all 0.3s ease",
              }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: `${service.color}15`, border: `1px solid ${service.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem",
              }}>
                <service.icon size={22} color={service.color} />
              </div>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: service.color, marginBottom: "1rem" }}>
                {service.category}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "0.5rem" }}>
                {service.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.4 }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: service.color, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────

function Portfolio() {
  return (
    <section id="portfolio" style={{ padding: "8rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#06b6d4", marginBottom: "1rem" }}>Portfolio</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            Six{" "}
            <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              live AI tools
            </span>{" "}
            in production
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Not mockups. Not demos. Real tools built on real data, solving real compliance
            and operational problems in aviation and government.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {PORTFOLIO.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(4,13,26,0.7)", overflow: "hidden", transition: "all 0.3s ease",
              }}>
              <div style={{ height: "4px", background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }} />
              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "10px",
                    background: `${project.color}15`, border: `1px solid ${project.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <project.icon size={20} color={project.color} />
                  </div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#64748b", letterSpacing: "0.1em" }}>
                    PROJECT {project.id}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.3, color: "#f1f5f9" }}>
                  {project.title}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  {project.description}
                </p>
                <div style={{ fontSize: "0.75rem", color: project.color, marginBottom: "1.25rem", fontWeight: 500 }}>
                  {project.metrics}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const, marginBottom: "1.25rem" }}>
                  {project.tech.map((t) => (
                    <span key={t} style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.7rem", color: "#64748b", fontWeight: 500,
                    }}>{t}</span>
                  ))}
                </div>
                <motion.a href={project.href} whileHover={{ x: 4 }}
                  style={{ display: "flex", alignItems: "center", gap: "6px", color: project.color, textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, transition: "all 0.2s" }}>
                  View Live Project <ExternalLink size={13} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── STACK ───────────────────────────────────────────────────────────────────

const STACK = [
  { category: "// Framework & Language", items: ["Next.js 14 (App Router)", "React 18", "TypeScript", "Tailwind CSS"] },
  { category: "// Animation & Design", items: ["Framer Motion", "Custom Design System", "Zero templates — every pixel custom", "Lucide React Icons"] },
  { category: "// AI & Intelligence", items: ["Anthropic Claude API", "RAG Architecture", "LLM Integration", "Built collaboratively with Claude"] },
  { category: "// Data & Portfolio Tools", items: ["Python · Pandas · Plotly", "Streamlit · Leaflet.js", "NLP · scikit-learn", "BTS Flight Data (7M+ records)"] },
  { category: "// Deployment & Infrastructure", items: ["Vercel (auto-deploy on commit)", "GitHub version control", "DreamHost (bloody-marys.com)", "SSL · CDN · Global edge network"] },
  { category: "// Development Approach", items: ["Agentic AI workflow", "Prompt engineering", "Iterative build process", "Human + AI collaboration"] },
];

function Stack() {
  return (
    <section id="stack" style={{ padding: "8rem 2rem", background: "rgba(4,13,26,0.8)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#06b6d4", marginBottom: "1rem" }}>Under the Hood</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            How this site was{" "}
            <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              built
            </span>
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            No templates. No page builders. Every component custom-engineered using the same tools I use to build compliance AI — modern frameworks, real code, and Claude as a collaborative development partner.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {STACK.map((block, i) => (
            <motion.div key={block.category}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: "rgba(4,13,26,0.9)", border: "1px solid rgba(6,182,212,0.12)", borderRadius: "12px", padding: "1.75rem", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
              <div style={{ fontSize: "0.75rem", color: "#06b6d4", marginBottom: "1rem", fontWeight: 600 }}>{block.category}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "0.6rem" }}>
                {block.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "0.85rem" }}>
                    <span style={{ color: "#06b6d4", fontSize: "0.7rem", flexShrink: 0 }}>&#9658;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginTop: "3rem", padding: "1.5rem 2rem", background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" as const }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#06b6d4", flexShrink: 0, boxShadow: "0 0 10px rgba(6,182,212,0.5)" }} />
          <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
            <span style={{ color: "#f1f5f9", fontWeight: 600 }}>Built with Claude. </span>
            This site was designed and engineered in an agentic AI workflow — architecture, code, content, and deployment all developed collaboratively using Anthropic&apos;s Claude. The same approach I bring to every client engagement.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" style={{
      padding: "8rem 2rem",
      background: "rgba(7,20,40,0.3)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#06b6d4", marginBottom: "1rem" }}>Contact</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Let&apos;s build something{" "}
            <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              that matters
            </span>
          </h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "3rem", fontSize: "1.05rem" }}>
            Whether you need compliance advisory, AI tool development, or a strategic
            partner who understands both federal regulations and modern technology — let&apos;s talk.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" as const }}>
            <motion.a href="mailto:gene@generoth.com" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{
                background: "#06b6d4", color: "#040d1a", padding: "0.875rem 2rem", borderRadius: "8px",
                textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
              <Mail size={16} /> gene@generoth.com
            </motion.a>
            <motion.a href="https://linkedin.com/in/generoth" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{
                background: "transparent", color: "#f1f5f9", padding: "0.875rem 2rem", borderRadius: "8px",
                textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s",
              }}>
              <Link2 size={16} /> LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      padding: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "1rem",
    }}>
      <div style={{ color: "#64748b", fontSize: "0.8rem" }}>© {new Date().getFullYear()} Gene Roth. All rights reserved.</div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {["About", "Services", "Portfolio", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}
            style={{ color: "#64748b", textDecoration: "none", fontSize: "0.8rem" }}>{item}</a>
        ))}
      </div>
      <div style={{ color: "#64748b", fontSize: "0.75rem" }}>Built with Next.js · Deployed on Vercel</div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
