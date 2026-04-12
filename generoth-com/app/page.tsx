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
  { label: "Governance", href: "#governance" },
  { label: "Contact", href: "#contact" },
  { label: "Stack", href: "#stack" },
];

const SERVICES = [
  {
    icon: Shield,
    category: "AI Governance & Compliance Architecture",
    color: "#06b6d4",
    items: [
      "AI Governance Framework Design",
      "Responsible AI Architecture Review",
      "DBE/ACDBE Program Advisory",
      "Title VI Compliance Programs",
      "ADA / Section 504 Accessibility & Equity",
      "Algorithmic Fairness Auditing",
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
      "Structured Output Validation Layer",
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
    href: "https://splendid-beignet-93e302.netlify.app",
    metrics: "50+ UCPs tracked · Real-time IFR compliance status",
  },
  {
    id: "02",
    title: "U.S. Airport Operational Performance",
    description: "Operationalized 7 million BTS flight records across 140 hub airports into a sub-second performance intelligence platform. The same data FAA and airlines use to make operational decisions — now deployable for any stakeholder in under 2 seconds.",
    tech: ["Python", "Streamlit", "Pandas", "Plotly"],
    color: "#8b5cf6",
    icon: Globe,
    href: "https://zippy-bavarois-98956a.netlify.app",
    metrics: "7M+ flight records · 140 hub airports · Sub-second queries",
  },
  {
    id: "03",
    title: "Airline Passenger Experience Intelligence",
    description: "Architected an NLP-powered intelligence platform that surfaces carrier-level service degradation signals across DOT complaint data. Designed to inform regulatory intervention decisions, not just visualize trends.",
    tech: ["Python", "NLP", "Streamlit", "scikit-learn"],
    color: "#10b981",
    icon: Users,
    href: "https://beautiful-pasca-3ed075.netlify.app",
    metrics: "NLP-powered · Carrier-level sentiment analysis",
  },
  {
    id: "04",
    title: "DBE/ACDBE Narrative Builder",
    description: "Orchestrated a RAG-adjacent LLM pipeline that interviews certification candidates and generates submission-ready Personal Narratives. Deterministic guardrails enforce DBE/ACDBE regulatory standards on every output — compliance architecture, not prompt tricks.",
    tech: ["RAG", "LLM", "Vector DB", "Python"],
    color: "#f59e0b",
    icon: FileText,
    href: "https://dbe-narrative-builder.netlify.app",
    metrics: "RAG-adjacent · Deterministic output layer · Compliance-governed generation",
  },
  {
    id: "05",
    title: "Environmental Intelligence Platform",
    description: "Deployed a multi-source real-time intelligence platform orchestrating live weather, air quality, and news sentiment APIs across global cities. Claude-powered cross-city briefings generated via agentic workflow — zero cold-start, sub-2-second load.",
    tech: ["Python", "APIs", "Claude AI", "Plotly"],
    color: "#ef4444",
    icon: Zap,
    href: "https://enviro-intelligence-platform.netlify.app",
    metrics: "Multi-API orchestration · Agentic AI briefings · Real-time edge deployment",
  },
  {
    id: "06",
    title: "GPU Path Tracer",
    description: "Architected a WebGL2 path tracing engine executing physically-based rendering entirely on the GPU via custom GLSL shaders. Cook-Torrance BRDF, Monte Carlo sampling, and progressive accumulation — every pixel earned through simulation, not rasterization shortcuts.",
    tech: ["WebGL2", "GLSL", "JavaScript", "GPU"],
    color: "#ec4899",
    icon: Cpu,
    href: "https://lovely-pithivier-a966bf.netlify.app/raytracer.html",
    metrics: "GPU-accelerated · Physically-based rendering · Zero-dependency deployment",
  },
];

const STATS = [
  { value: "3,200+", label: "FAA Node Infrastructure Governed" },
  { value: "$9B", label: "Supply Chain Architected" },
  { value: "6", label: "AI Tools in Production" },
  { value: "4", label: "Industries · Executive Roles · One Stack" },
];

const ABOUT_CARDS = [
  { icon: Shield, title: "Regulatory System Architecture", desc: "DBE/ACDBE · Title VI · ADA — governing national compliance infrastructure at 3,200+ node scale" },
  { icon: Brain, title: "AI Stack Orchestration", desc: "RAG pipelines · LLM inference · Agentic workflows · Deterministic guardrails" },
  { icon: BarChart3, title: "Intelligence Platform Engineering", desc: "7M+ record pipelines · Real-time dashboards · NLP-powered analytics at scale" },
  { icon: Database, title: "Production-Grade Deployment", desc: "Cloud-native CI/CD · GitHub → Netlify · Zero-trust API layer · Zero cold-start" },
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
            National-Scale Operational Architect · AI Implementation Lead
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
          I architect systems that perform under national-level pressure. From governing a 3,200+ node FAA infrastructure to managing a $9B global supply chain, my work has been defined by orchestrating complex logic at enterprise scale. Now I bridge the gap between executive strategy and rapid AI implementation — deploying deterministic, production-grade AI stacks for high-stakes regulated environments.
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ marginTop: "1.5rem", fontSize: "0.72rem", color: "#475569", letterSpacing: "0.08em", textAlign: "center" as const }}>
          Specializing in RAG-adjacent architectures · Agentic orchestration · API-driven deployment · Compliance guardrails for AI systems
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
          style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{
              background: "rgba(6,182,212,0.08)", color: "#06b6d4",
              padding: "0.65rem 1.75rem", borderRadius: "100px",
              textDecoration: "none", fontWeight: 600, fontSize: "0.82rem",
              border: "1px solid rgba(6,182,212,0.25)",
              display: "flex", alignItems: "center", gap: "8px",
              letterSpacing: "0.04em",
            }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#06b6d4", display: "inline-block" }} />
            Let&apos;s work together →
          </motion.a>
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
            Excellence at scale is not a goal — it is a technical requirement. I directed the operational and regulatory
            frameworks for the U.S. national airport system, governing a 3,200+ node distributed infrastructure and
            managing a $9B supply chain across four industries. This wasn&apos;t compliance administration; it was the
            engineering of a massive, decentralized operational architecture under sustained federal oversight.
          </p>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Today I apply that same architectural precision to AI implementation. I don&apos;t just use LLMs — I
            orchestrate agentic workflows and RAG-adjacent architectures that close the Implementation Gap for
            federal contractors and enterprise operations. I am the General Contractor for AI transformation:
            I design the system, select the stack, embed the deterministic guardrails, and ensure the deployment
            is production-ready. Every system I deploy is architected with governance-by-design principles —
            explainability, audit-readiness, and deterministic output constraints built in from the first commit,
            not retrofitted after deployment.
          </p>
          <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
            I don&apos;t hand someone a strategy deck and walk away. I build the system that executes it.
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
            Four integrated practice areas — each grounded in national-scale operational authority and executed with production-grade AI orchestration.
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
            Not mockups. Not demos. Production AI tools — each solving a real compliance or operational problem in federally regulated aviation, built with the same precision required at national infrastructure scale.
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


// ─── GOVERNANCE ─────────────────────────────────────────────────────────

const GOVERNANCE_PRINCIPLES = [
  {
    title: "Deterministic Guardrails",
    body: "The same discipline applied to federal grant compliance — where a single error carries legal consequence — is now embedded as deterministic output constraints in every AI system I deploy. Governance isn’t a feature added at the end. It’s an architectural requirement from the first commit.",
    tag: "Risk Architecture",
  },
  {
    title: "Explainability by Design (XAI)",
    body: "Every system I architect produces outputs that can be traced, audited, and explained. Not because regulations require it, but because systems that cannot explain themselves cannot be trusted in regulated environments. Explainability is a structural property, not a dashboard.",
    tag: "System Transparency",
  },
  {
    title: "RAG-Adjacent Architectures for Regulated Domains",
    body: "I architect systems that ground AI outputs in authoritative, domain-specific source data — federal regulations, compliance frameworks, operational SOPs. The result is AI that operates within defined evidentiary boundaries, not probabilistic guesswork.",
    tag: "Data Stewardship",
  },
  {
    title: "Credential Isolation & Zero-Trust API Design",
    body: "Every production AI system I deploy isolates credentials server-side via serverless proxy architecture. No client-side exposure. This mirrors the security posture required in federal data environments and is a non-negotiable constraint in every stack I build.",
    tag: "Security Architecture",
  },
  {
    title: "Audit-Ready Deployment",
    body: "Systems architected for federal-grade oversight are built differently than systems optimized for demos. CI/CD pipelines, structured output validation, and deterministic logic chains ensure that every deployment can withstand the same scrutiny I applied to national aviation compliance programs.",
    tag: "Operational Governance",
  },
];

function Governance() {
  return (
    <section id="governance" style={{
      padding: "8rem 2rem",
      background: "rgba(7,20,40,0.5)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#06b6d4", marginBottom: "1rem" }}>Governance Architecture</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            Responsible AI is an{" "}
            <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              engineering requirement
            </span>
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "640px", margin: "0 auto", lineHeight: 1.7 }}>
            My federal compliance background isn’t a credential. It’s the technical foundation for how I architect AI.
            DBE/ACDBE, Title VI, and ADA frameworks required systems that were auditable, equitable, and defensible under federal review.
            That standard is now the baseline for every AI system I build.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {GOVERNANCE_PRINCIPLES.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                padding: "2rem", borderRadius: "14px",
                border: "1px solid rgba(6,182,212,0.12)",
                background: "rgba(4,13,26,0.7)",
                transition: "all 0.3s ease",
                position: "relative" as const,
              }}>
              <div style={{
                position: "absolute" as const, top: 0, left: 0,
                width: "3px", height: "100%", borderRadius: "14px 0 0 14px",
                background: "linear-gradient(180deg, #06b6d4, #0891b240)",
              }} />
              <div style={{
                display: "inline-block", fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase" as const,
                color: "#06b6d4", marginBottom: "0.75rem",
                padding: "0.25rem 0.75rem",
                background: "rgba(6,182,212,0.08)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "100px",
              }}>{p.tag}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginTop: "3rem", padding: "1.5rem 2rem", background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.12)", borderRadius: "12px" }}>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.7, margin: 0, textAlign: "center" as const }}>
            <span style={{ color: "#f1f5f9", fontWeight: 600 }}>The standard I apply: </span>
            If a system cannot survive a federal audit, it is not production-ready. Every architecture decision —
            credential isolation, structured output validation, deterministic logic constraints, explainable inference chains —
            is made with that standard as the baseline.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── STACK ───────────────────────────────────────────────────────────────────

const STACK = [
  { category: "// Framework & Language", items: ["Next.js 14 (App Router)", "React 18", "TypeScript", "Tailwind CSS"] },
  { category: "// Animation & Design", items: ["Framer Motion", "Custom Design System", "Zero templates — every pixel orchestrated", "Lucide React Icons"] },
  { category: "// AI & Intelligence", items: ["Anthropic Claude API", "RAG-adjacent Architecture", "LLM Inference Pipeline", "Orchestrated via Claude API"] },
  { category: "// Data & Portfolio Tools", items: ["Python · Pandas · Plotly", "Vector-ready data pipelines", "NLP · scikit-learn", "BTS Flight Data (7M+ records)"] },
  { category: "// Deployment & Infrastructure", items: ["Vercel (auto-deploy on commit)", "GitHub CI/CD version control", "Zero-trust API layer (serverless)", "SSL · CDN · Global edge network"] },
  { category: "// Development Approach", items: ["Agentic AI workflow", "Architect-directed AI execution", "Rapid agentic implementation", "Production-grade from day one"] },
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
            No templates. No page builders. Every component orchestrated from first principles — the same stack architecture deployed for enterprise clients, with Claude as the implementation engine.
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
            <span style={{ color: "#f1f5f9", fontWeight: 600 }}>Strategically orchestrated with Claude. </span>
            This site was architected in an agentic AI workflow — architecture decisions, code generation, content strategy,
            and deployment all coordinated using Anthropic&apos;s Claude as the implementation engine.
            The same orchestration model I bring to every client engagement.
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
            If you&apos;re deploying AI into regulated environments, scaling a compliance operation, or need an architect
            who has operated at both federal and enterprise scale — this is the conversation to have.
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
      <Governance />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
