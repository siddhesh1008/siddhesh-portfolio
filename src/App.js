import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  "Flight & Autonomy": ["ArduPilot", "MAVLink", "Pixhawk / CubePilot", "GPS Waypoint Nav", "Autonomous Flight Behaviours"],
  "Embedded & Hardware": ["Embedded Systems", "PCB Design", "Sensor Integration", "Signal Processing", "Arduino / Raspberry Pi", "IoT / Hardware-Software Integration"],
  "Software & CV": ["Python", "C / C++", "OpenCV", "Depth Sensing (OpenNI2)", "OpenAI API", "Speech Recognition"],
  "Tools & Methods": ["Linux", "Git", "CAD Modelling", "Agile", "ROS2 Fundamentals", "Data Pipelines"],
};

const PROJECTS = [
  {
    id: "drone",
    title: "Autonomous Drone Platform",
    status: "COMPLETE",
    tags: ["ArduPilot", "MAVLink", "Pixhawk", "Raspberry Pi", "Python"],
    description:
      "Designed and built a fully autonomous drone from scratch. Implemented GPS waypoint navigation, return-to-launch, and altitude hold without human input. Built a real-time telemetry pipeline from sensor data through to autonomous decision-making.",
    highlights: ["GPS waypoint navigation", "Real-time telemetry pipeline", "Industrial use: mapping, inspection, delivery"],
    github: "https://github.com/siddhesh1008",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant with Computer Vision",
    status: "COMPLETE",
    tags: ["Python", "OpenCV", "OpenAI API", "Arduino", "Speech Recognition"],
    description:
      "Built an AI assistant with computer vision and speech recognition for natural language interaction. Designed a hardware control pipeline connecting software commands to physical relay modules via Arduino — autonomously controlling room lighting and appliances.",
    highlights: ["Natural language + vision input", "Relay module hardware control", "Sensor-to-action automation pipeline"],
    github: "https://github.com/siddhesh1008",
  },
  {
    id: "depth",
    title: "Adaptive Projector with Depth Sensing",
    status: "IN PROGRESS",
    tags: ["Python", "OpenNI2", "Orbbec Astra Pro", "Depth Sensing"],
    description:
      "Building an adaptive projection system using an Orbbec Astra Pro depth camera. Working with depth sensing hardware, camera calibration, and spatial data processing pipelines for environment-aware projection.",
    highlights: ["Real-time depth data capture", "Camera calibration pipeline", "Environment-aware projection"],
    github: "https://github.com/siddhesh1008",
  },
];

const EXPERIENCE = [
  {
    role: "Mechatronic Engineer — Working Student",
    company: "Better Devices",
    location: "Berlin, Germany",
    period: "Sep 2024 – Present",
    points: [
      "Python scripts for electronic signal processing and embedded data pipelines",
      "Hardware-software integration, sensor interfacing, real-time data handling",
      "PCB design fundamentals for IoT debugging and testing",
      "CAD design for hardware prototyping and system enclosures",
    ],
  },
  {
    role: "Cyber Security Senior Analyst",
    company: "Capgemini",
    location: "Mumbai, India",
    period: "Sep 2022 – Feb 2024",
    points: [
      "Automation scripts to streamline identity and access management workflows",
      "Technical mentorship to junior engineers on structured troubleshooting",
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ label, accent = false }) {
  return (
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.7rem",
      letterSpacing: "0.05em",
      padding: "3px 10px",
      borderRadius: "2px",
      border: accent ? "1px solid #39ff14" : "1px solid #333",
      color: accent ? "#39ff14" : "#888",
      background: accent ? "rgba(57,255,20,0.06)" : "transparent",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function StatusBadge({ status }) {
  const isComplete = status === "COMPLETE";
  return (
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.65rem",
      letterSpacing: "0.12em",
      padding: "2px 8px",
      borderRadius: "2px",
      border: `1px solid ${isComplete ? "#39ff14" : "#f59e0b"}`,
      color: isComplete ? "#39ff14" : "#f59e0b",
      background: isComplete ? "rgba(57,255,20,0.06)" : "rgba(245,158,11,0.08)",
    }}>
      {status}
    </span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");

  const [typed, setTyped] = useState("");
  const fullText = "Building systems that move, sense, and decide.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase()));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollY >= sections[i].offsetTop) {
          setActiveSection(NAV_LINKS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const styles = {
    root: {
      background: "#0a0a0a",
      color: "#d4d4d4",
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 5vw",
      height: "64px",
      background: "rgba(10,10,10,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #1a1a1a",
    },
    logo: {
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.9rem",
      color: "#39ff14",
      letterSpacing: "0.1em",
      cursor: "pointer",
    },
    navLinks: {
      display: "flex",
      gap: "2rem",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: (active) => ({
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.75rem",
      letterSpacing: "0.08em",
      color: active ? "#39ff14" : "#666",
      cursor: "pointer",
      transition: "color 0.2s",
      textTransform: "uppercase",
      borderBottom: active ? "1px solid #39ff14" : "1px solid transparent",
      paddingBottom: "2px",
    }),
    hero: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 8vw",
      position: "relative",
      overflow: "hidden",
    },
    heroGrid: {
      position: "absolute",
      inset: 0,
      backgroundImage: "linear-gradient(rgba(57,255,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.03) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
      pointerEvents: "none",
    },
    heroGlow: {
      position: "absolute",
      top: "-20%",
      right: "-10%",
      width: "600px",
      height: "600px",
      background: "radial-gradient(circle, rgba(57,255,20,0.05) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    heroLabel: {
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      color: "#39ff14",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    heroLabelLine: {
      display: "inline-block",
      width: "40px",
      height: "1px",
      background: "#39ff14",
    },
    heroName: {
      fontSize: "clamp(3rem, 8vw, 7rem)",
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: "#f0f0f0",
      fontFamily: "'DM Sans', sans-serif",
      marginBottom: "0.5rem",
    },
    heroTitle: {
      fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
      color: "#555",
      fontFamily: "'Space Mono', monospace",
      marginBottom: "2rem",
      letterSpacing: "0.05em",
    },
    heroTagline: {
      fontSize: "clamp(1rem, 2vw, 1.25rem)",
      color: "#888",
      maxWidth: "560px",
      lineHeight: 1.6,
      marginBottom: "3rem",
      minHeight: "2em",
    },
    cursor: {
      display: "inline-block",
      width: "2px",
      height: "1.1em",
      background: "#39ff14",
      marginLeft: "3px",
      verticalAlign: "text-bottom",
      animation: "blink 1s step-end infinite",
    },
    heroCtas: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
    },
    btnPrimary: {
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.8rem",
      letterSpacing: "0.1em",
      padding: "12px 28px",
      background: "#39ff14",
      color: "#0a0a0a",
      border: "none",
      borderRadius: "2px",
      cursor: "pointer",
      fontWeight: 700,
      transition: "all 0.2s",
      textTransform: "uppercase",
    },
    btnSecondary: {
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.8rem",
      letterSpacing: "0.1em",
      padding: "12px 28px",
      background: "transparent",
      color: "#d4d4d4",
      border: "1px solid #333",
      borderRadius: "2px",
      cursor: "pointer",
      transition: "all 0.2s",
      textTransform: "uppercase",
    },
    section: {
      padding: "100px 8vw",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    sectionLabel: {
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.7rem",
      letterSpacing: "0.25em",
      color: "#39ff14",
      textTransform: "uppercase",
      marginBottom: "0.75rem",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    sectionTitle: {
      fontSize: "clamp(1.8rem, 4vw, 3rem)",
      fontWeight: 700,
      color: "#f0f0f0",
      letterSpacing: "-0.02em",
      marginBottom: "3rem",
      lineHeight: 1.1,
    },
    divider: {
      width: "100%",
      height: "1px",
      background: "linear-gradient(90deg, #1a1a1a 0%, #39ff14 30%, #1a1a1a 100%)",
      marginBottom: "80px",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #39ff14; border-radius: 2px; }
        .btn-primary:hover { background: #2de010 !important; transform: translateY(-1px); box-shadow: 0 0 20px rgba(57,255,20,0.3); }
        .btn-secondary:hover { border-color: #39ff14 !important; color: #39ff14 !important; }
        .project-card:hover { border-color: #39ff14 !important; transform: translateY(-4px); }
        .project-card:hover .project-title { color: #39ff14 !important; }
        .skill-group:hover { border-color: #2a2a2a !important; }
        .nav-link:hover { color: #39ff14 !important; }
        .exp-card:hover { border-left-color: #39ff14 !important; }
        .github-link:hover { color: #39ff14 !important; border-color: #39ff14 !important; }
      `}</style>

      <div style={styles.root}>
        {/* NAV */}
        <nav style={styles.nav}>
          <div style={styles.logo} onClick={() => scrollTo("about")}>SS_</div>
          <ul style={styles.navLinks}>
            {NAV_LINKS.map(link => (
              <li key={link}>
                <span
                  className="nav-link"
                  style={styles.navLink(activeSection === link)}
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        {/* HERO */}
        <section style={styles.hero}>
          <div style={styles.heroGrid} />
          <div style={styles.heroGlow} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={styles.heroLabel}>
              <span style={styles.heroLabelLine} />
              ROBOTICS ENGINEER — BERLIN
            </div>
            <h1 style={styles.heroName}>Siddhesh<br />Salunkhe</h1>
            <div style={styles.heroTitle}>{String.fromCharCode(47,47)} Autonomous Systems & Embedded Engineering</div>
            <p style={styles.heroTagline}>
              {typed}<span style={styles.cursor} />
            </p>
            <div style={styles.heroCtas}>
              <button className="btn-primary" style={styles.btnPrimary} onClick={() => scrollTo("Projects")}>
                View Projects
              </button>
              <button className="btn-secondary" style={styles.btnSecondary} onClick={() => scrollTo("Contact")}>
                Get In Touch
              </button>
              <a
                href="https://github.com/siddhesh1008"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.btnSecondary, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <div style={styles.divider} />

        {/* ABOUT */}
        <section id="about" style={styles.section}>
          <FadeIn>
            <div style={styles.sectionLabel}><span style={styles.heroLabelLine} />01 — ABOUT</div>
            <h2 style={styles.sectionTitle}>Who I Am</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <FadeIn delay={0.1}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#aaa", marginBottom: "1.5rem" }}>
                I build systems that operate in the real world — drones that navigate autonomously, embedded pipelines that process sensor data in real time, and hardware-software integrations that bridge software commands to physical action.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#aaa", marginBottom: "1.5rem" }}>
                Currently finishing my Masters in Sustainable Technology Management (Industry 4.0 focus) at SRH Berlin, and working as a Mechatronic Engineer at Better Devices — building Python signal processing pipelines and embedded systems for IoT applications.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#aaa" }}>
                I target roles in robotics, autonomous drone development, and defense technology — environments where the engineering actually needs to work.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Location", value: "Berlin, Germany" },
                  { label: "Education", value: "M.Eng — SRH Berlin (Mar 2026)" },
                  { label: "Current Role", value: "Mechatronic Engineer @ Better Devices" },
                  { label: "Languages", value: "English (Fluent), German (B1)" },
                  { label: "Focus Areas", value: "Drones · Defense Tech · Robotics" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", borderBottom: "1px solid #1a1a1a", paddingBottom: "1rem", gap: "1rem" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#39ff14", letterSpacing: "0.1em", minWidth: "130px", paddingTop: "2px" }}>
                      {item.label.toUpperCase()}
                    </span>
                    <span style={{ color: "#ccc", fontSize: "0.95rem" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <div style={styles.divider} />

        {/* SKILLS */}
        <section id="skills" style={{ ...styles.section, maxWidth: "1200px" }}>
          <FadeIn>
            <div style={styles.sectionLabel}><span style={styles.heroLabelLine} />02 — SKILLS</div>
            <h2 style={styles.sectionTitle}>Technical Stack</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {Object.entries(SKILLS).map(([group, items], i) => (
              <FadeIn key={group} delay={i * 0.1}>
                <div
                  className="skill-group"
                  style={{
                    border: "1px solid #1e1e1e",
                    borderRadius: "4px",
                    padding: "1.5rem",
                    background: "#0d0d0d",
                    transition: "border-color 0.3s",
                  }}
                >
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#39ff14", marginBottom: "1rem", textTransform: "uppercase" }}>
                    {group}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {items.map(skill => <Tag key={skill} label={skill} />)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div style={styles.divider} />

        {/* PROJECTS */}
        <section id="projects" style={styles.section}>
          <FadeIn>
            <div style={styles.sectionLabel}><span style={styles.heroLabelLine} />03 — PROJECTS</div>
            <h2 style={styles.sectionTitle}>What I've Built</h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {PROJECTS.map((proj, i) => (
              <FadeIn key={proj.id} delay={i * 0.1}>
                <div
                  className="project-card"
                  style={{
                    border: "1px solid #1e1e1e",
                    borderRadius: "4px",
                    padding: "2rem",
                    background: "#0d0d0d",
                    transition: "all 0.3s",
                    cursor: "default",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <h3 className="project-title" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f0f0f0", transition: "color 0.3s" }}>
                        {proj.title}
                      </h3>
                      <StatusBadge status={proj.status} />
                    </div>
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        color: "#555",
                        textDecoration: "none",
                        border: "1px solid #2a2a2a",
                        padding: "4px 12px",
                        borderRadius: "2px",
                        transition: "all 0.2s",
                      }}
                    >
                      GITHUB ↗
                    </a>
                  </div>
                  <p style={{ color: "#888", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem" }}>{proj.description}</p>
                  <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                    {proj.highlights.map(h => (
                      <div key={h} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#666" }}>
                        <span style={{ color: "#39ff14", fontSize: "0.7rem" }}>▸</span> {h}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {proj.tags.map(t => <Tag key={t} label={t} accent />)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div style={styles.divider} />

        {/* EXPERIENCE */}
        <section id="experience" style={styles.section}>
          <FadeIn>
            <div style={styles.sectionLabel}><span style={styles.heroLabelLine} />04 — EXPERIENCE</div>
            <h2 style={styles.sectionTitle}>Where I've Worked</h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={exp.company} delay={i * 0.1}>
                <div
                  className="exp-card"
                  style={{
                    borderLeft: "2px solid #222",
                    paddingLeft: "2rem",
                    transition: "border-left-color 0.3s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f0f0f0" }}>{exp.role}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#39ff14", marginTop: "2px" }}>{exp.company} — {exp.location}</div>
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#555", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{exp.period}</div>
                  </div>
                  <ul style={{ paddingLeft: "1rem", marginTop: "1rem" }}>
                    {exp.points.map(p => (
                      <li key={p} style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.4rem", listStyle: "none", display: "flex", gap: "10px" }}>
                        <span style={{ color: "#39ff14", flexShrink: 0, marginTop: "2px" }}>▸</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div style={styles.divider} />

        {/* CONTACT */}
        <section id="contact" style={{ ...styles.section, textAlign: "center", maxWidth: "700px" }}>
          <FadeIn>
            <div style={{ ...styles.sectionLabel, justifyContent: "center" }}><span style={styles.heroLabelLine} />05 — CONTACT</div>
            <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Let's Talk</h2>
            <p style={{ color: "#888", lineHeight: 1.8, marginBottom: "3rem", fontSize: "1rem" }}>
              Open to robotics, drone engineering, and defense tech roles in Germany. Reach out directly — no forms, no friction.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="mailto:siddhesh2152@gmail.com"
                className="btn-primary"
                style={{ ...styles.btnPrimary, textDecoration: "none", display: "inline-block" }}
              >
                Email Me
              </a>
              <a
                href="https://linkedin.com/in/siddhesh-salunkhe-277257194"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ ...styles.btnSecondary, textDecoration: "none", display: "inline-block" }}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/siddhesh1008"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ ...styles.btnSecondary, textDecoration: "none", display: "inline-block" }}
              >
                GitHub ↗
              </a>
            </div>
          </FadeIn>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid #1a1a1a", padding: "2rem 8vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#333" }}>
            © 2026 SIDDHESH SALUNKHE
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#333" }}>
            BERLIN, GERMANY
          </span>
        </footer>
      </div>
    </>
  );
}