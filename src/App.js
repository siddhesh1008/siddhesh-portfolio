import { useState, useEffect, useRef } from "react";

const TRANSLATIONS = {
  en: {
    navLinks: ["About", "Skills", "Projects", "Gallery", "Experience", "Contact"],
    heroLabel: "ROBOTICS ENGINEER — BERLIN",
    heroTitle: "// Autonomous Systems & Embedded Engineering",
    heroTagline: "Building systems that move, sense, and decide.",
    heroCtas: { projects: "View Projects", contact: "Get In Touch" },
    about: {
      sectionLabel: "01 — ABOUT",
      sectionTitle: "Who I Am",
      bio1: "I build systems that operate in the real world — drones that navigate autonomously, embedded pipelines that process sensor data in real time, and hardware-software integrations that bridge software commands to physical action.",
      bio2: "Finished my Masters in Sustainable Technology Management (Industry 4.0 focus) at SRH Berlin, and working as a Mechatronic Engineer at Better Devices — building Python signal processing pipelines and embedded systems for IoT applications.",
      bio3: "I target roles in robotics, industrial automation, autonomous drone development, and defense technology — environments where the engineering actually needs to work.",
      facts: [
        { label: "Location", value: "Berlin, Germany" },
        { label: "Education", value: "M.Eng — SRH Berlin (Mar 2026)" },
        { label: "Current Role", value: "Mechatronic Engineer @ Better Devices" },
        { label: "Languages", value: "English (Fluent), German (B1)" },
        { label: "Focus Areas", value: "Drones · Robotics · Defense Tech" },
      ],
    },
    skills: { sectionLabel: "02 — SKILLS", sectionTitle: "Technical Stack" },
    projects: { sectionLabel: "03 — PROJECTS", sectionTitle: "What I've Built" },
    gallery: {
      sectionLabel: "04 — GALLERY",
      sectionTitle: "In Action",
      filterAll: "ALL",
      filterPhotos: "PHOTOS",
      filterVideos: "VIDEOS",
      viewPhoto: "View Photo",
    },
    experience: { sectionLabel: "05 — EXPERIENCE", sectionTitle: "Where I've Worked" },
    contact: {
      sectionLabel: "06 — CONTACT",
      sectionTitle: "Let's Talk",
      bio: "Open to robotics, drone engineering, and defense tech roles in Germany. Reach out directly — no forms, no friction.",
      email: "Email Me",
    },
    footer: "BERLIN, GERMANY",
  },
  de: {
    navLinks: ["Über mich", "Fähigkeiten", "Projekte", "Galerie", "Erfahrung", "Kontakt"],
    heroLabel: "ROBOTIK-INGENIEUR — BERLIN",
    heroTitle: "// Autonome Systeme & Embedded Engineering",
    heroTagline: "Systeme bauen, die sich bewegen, wahrnehmen und entscheiden.",
    heroCtas: { projects: "Projekte ansehen", contact: "Kontakt aufnehmen" },
    about: {
      sectionLabel: "01 — ÜBER MICH",
      sectionTitle: "Wer ich bin",
      bio1: "Ich entwickle Systeme, die in der realen Welt funktionieren — autonom navigierende Drohnen, eingebettete Pipelines zur Echtzeit-Sensordatenverarbeitung und Hardware-Software-Integrationen, die Softwarebefehle in physische Aktionen übersetzen.",
      bio2: "Ich habe meinen Master in Sustainable Technology Management (Schwerpunkt Industrie 4.0) an der SRH Berlin abgeschlossen und arbeite als Mechatronik-Ingenieur bei Better Devices — dort entwickle ich Python-Signalverarbeitungspipelines und Embedded-Systeme für IoT-Anwendungen.",
      bio3: "Ich suche Stellen in der Robotik, industriellen Automatisierung, autonomen Drohnenentwicklung und Verteidigungstechnologie — Umgebungen, in denen Engineering wirklich funktionieren muss.",
      facts: [
        { label: "Standort", value: "Berlin, Deutschland" },
        { label: "Ausbildung", value: "M.Eng — SRH Berlin (März 2026)" },
        { label: "Aktuelle Stelle", value: "Mechatronik-Ingenieur @ Better Devices" },
        { label: "Sprachen", value: "Englisch (fließend), Deutsch (B1)" },
        { label: "Schwerpunkte", value: "Drohnen · Robotik · Verteidigungstechnik" },
      ],
    },
    skills: { sectionLabel: "02 — FÄHIGKEITEN", sectionTitle: "Technisches Stack" },
    projects: { sectionLabel: "03 — PROJEKTE", sectionTitle: "Was ich gebaut habe" },
    gallery: {
      sectionLabel: "04 — GALERIE",
      sectionTitle: "In Aktion",
      filterAll: "ALLE",
      filterPhotos: "FOTOS",
      filterVideos: "VIDEOS",
      viewPhoto: "Foto ansehen",
    },
    experience: { sectionLabel: "05 — ERFAHRUNG", sectionTitle: "Wo ich gearbeitet habe" },
    contact: {
      sectionLabel: "06 — KONTAKT",
      sectionTitle: "Lass uns reden",
      bio: "Offen für Stellen in der Robotik, Drohnentechnik und Verteidigungstechnologie in Deutschland. Direkt kontaktieren — kein Formular, kein Aufwand.",
      email: "E-Mail senden",
    },
    footer: "BERLIN, DEUTSCHLAND",
  },
};

const SKILLS = {
  "Flight & Autonomy": ["ArduPilot", "MAVLink", "Pixhawk / CubePilot", "GPS Waypoint Nav", "Autonomous Flight Behaviours"],
  "Embedded & Hardware": ["Embedded Systems", "PCB Design", "Sensor Integration", "Signal Processing", "Arduino / Raspberry Pi", "IoT / Hardware-Software Integration"],
  "Software & CV": ["Python", "C / C++", "OpenCV", "Depth Sensing (OpenNI2)", "OpenAI API", "Speech Recognition"],
  "Tools & Methods": ["Linux", "Git", "CAD Modelling", "Agile", "ROS2 Fundamentals", "Data Pipelines"],
};

const PROJECTS = {
  en: [
    {
      id: "drone",
      title: "Autonomous Drone Platform",
      status: "COMPLETE",
      tags: ["ArduPilot", "MAVLink", "Pixhawk", "Raspberry Pi", "Python"],
      description: "Designed and built a fully autonomous drone from scratch. Implemented GPS waypoint navigation, return-to-launch, and altitude hold without human input. Built a real-time telemetry pipeline from sensor data through to autonomous decision-making.",
      highlights: ["GPS waypoint navigation", "Real-time telemetry pipeline", "Industrial use: mapping, inspection, delivery"],
      galleryLink: true,
    },
    {
      id: "ai-assistant",
      title: "AI Assistant with Computer Vision",
      status: "COMPLETE",
      tags: ["Python", "OpenCV", "OpenAI API", "Arduino", "Speech Recognition"],
      description: "Built an AI assistant with computer vision and speech recognition for natural language interaction. Designed a hardware control pipeline connecting software commands to physical relay modules via Arduino — autonomously controlling room lighting and appliances.",
      highlights: ["Natural language + vision input", "Relay module hardware control", "Sensor-to-action automation pipeline"],
      github: "https://github.com/siddhesh1008",
    },
    {
      id: "jet",
      title: "90mm Jet Replica with ArduPilot",
      status: "COMPLETE",
      tags: ["ArduPilot", "ELRS", "FPV", "Head Tracking", "MAVLink", "Python"],
      description: "Built a 90mm fighter jet replica with a fully integrated ArduPilot flight stack. Features autonomous return-to-home, GPS waypoint navigation, and real-time telemetry. Equipped with a head-tracking FPV setup that provides a real-life simulation perspective — designed for pilot training use cases. Hardware includes retractable landing gear and an ELRS long-range control link.",
      highlights: ["Head-tracking FPV for pilot training", "Retractable landing gear", "Autonomous RTH & waypoint nav", "ELRS long-range link"],
      youtube: "https://www.youtube.com/embed/nUOmQd3p6PQ",
    },
  ],
  de: [
    {
      id: "drone",
      title: "Autonome Drohnenplattform",
      status: "ABGESCHLOSSEN",
      tags: ["ArduPilot", "MAVLink", "Pixhawk", "Raspberry Pi", "Python"],
      description: "Entwurf und Bau einer vollautonomen Drohne von Grund auf. Implementierung von GPS-Wegpunktnavigation, Return-to-Launch und Höhenhaltung ohne menschliche Eingabe. Aufbau einer Echtzeit-Telemetriepipeline von Sensordaten bis zur autonomen Entscheidungsfindung.",
      highlights: ["GPS-Wegpunktnavigation", "Echtzeit-Telemetriepipeline", "Industriell: Kartierung, Inspektion, Lieferung"],
      galleryLink: true,
    },
    {
      id: "ai-assistant",
      title: "KI-Assistent mit Computer Vision",
      status: "ABGESCHLOSSEN",
      tags: ["Python", "OpenCV", "OpenAI API", "Arduino", "Spracherkennung"],
      description: "Entwicklung eines KI-Assistenten mit Computer Vision und Spracherkennung für natürliche Sprachinteraktion. Entwurf einer Hardware-Steuerungspipeline, die Softwarebefehle über Arduino mit physischen Relaismodulen verbindet — zur autonomen Steuerung von Beleuchtung und Geräten.",
      highlights: ["Sprach- und Bildeingabe", "Relaismodul-Hardwaresteuerung", "Sensor-zu-Aktion-Pipeline"],
      github: "https://github.com/siddhesh1008",
    },
    {
      id: "jet",
      title: "90mm Kampfjet-Replik mit ArduPilot",
      status: "ABGESCHLOSSEN",
      tags: ["ArduPilot", "ELRS", "FPV", "Head Tracking", "MAVLink", "Python"],
      description: "Bau einer 90mm Kampfjet-Replik mit vollständig integriertem ArduPilot-Flugstack. Funktionen: autonomes Return-to-Home, GPS-Wegpunktnavigation und Echtzeit-Telemetrie. Ausgestattet mit einem Head-Tracking-FPV-System für eine realitätsnahe Simulationsperspektive — konzipiert für Pilotenausbildung. Hardware umfasst einfahrbare Fahrwerke und einen ELRS-Langstrecken-Steuerlink.",
      highlights: ["Head-Tracking-FPV für Pilotentraining", "Einfahrbares Fahrwerk", "Autonomes RTH & Wegpunktnavigation", "ELRS-Langstreckenlink"],
      youtube: "https://www.youtube.com/embed/nUOmQd3p6PQ",
    },
  ],
};

const GALLERY = [
  { id: "g1", type: "video", src: "https://www.youtube.com/embed/AtVrseFuo3U", caption: "Autonomous Drone — Flight Test" },
  { id: "g2", type: "video", src: "https://www.youtube.com/embed/v2XD-vythfE", caption: "Autonomous Drone — Field Session" },
  { id: "g3", type: "video", src: "https://www.youtube.com/embed/VYFB83szTE8", caption: "Autonomous Drone — Short Clip" },
  { id: "g4", type: "video", src: "https://www.youtube.com/embed/edYdhTGV3Os", caption: "Autonomous Drone — Short Clip 2" },
  { id: "g5", type: "image", src: "/images/IMG_5376.jpg", caption: "Autonomous Drone — Build" },
  { id: "g6", type: "image", src: "/images/IMG_6183.jpg", caption: "Autonomous Drone — Hardware" },
];

const EXPERIENCE = {
  en: [
    {
      role: "Mechatronic Engineer — Working Student",
      company: "Better Devices",
      location: "Berlin, Germany",
      period: "Sep 2024 – Present",
      points: [
        "Python scripts for electronic signal processing and embedded data pipelines",
        "Hardware-software integration, sensor interfacing, real-time data handling",
        "IoT debugging and testing",
        "CAD design for hardware prototyping and system enclosures",
        "Computer vision for new product development and feature implementation",
      ],
    },
    {
      role: "Drone Systems Engineer",
      company: "Whoopmasters India",
      location: "Mumbai, India",
      period: "Aug 2020 – Feb 2024",
      points: [
        "Built and tested drones for payload in the field, mapping, cinematic, agriculture, rescue, and defense prototype missions",
        "Full build cycle: frame assembly, FC tuning, payload integration, and field testing",
        "Configured ArduPilot flight stacks for diverse mission profiles and payload requirements",
      ],
    },
  ],
  de: [
    {
      role: "Mechatronik-Ingenieur — Werkstudent",
      company: "Better Devices",
      location: "Berlin, Deutschland",
      period: "Sep 2024 – heute",
      points: [
        "Python-Skripte für elektronische Signalverarbeitung und eingebettete Datenpipelines",
        "Hardware-Software-Integration, Sensoranbindung, Echtzeit-Datenverarbeitung",
        "IoT-Debugging und -Testing",
        "CAD-Design für Hardware-Prototyping und Systemgehäuse",
        "Computer Vision für neue Produktentwicklung und Funktionsimplementierung",
      ],
    },
    {
      role: "Drohnensystemingenieur",
      company: "Whoopmasters India",
      location: "Mumbai, Indien",
      period: "Aug 2020 – Feb 2024",
      points: [
        "Bau und Test von Drohnen für Nutzlast, Kartierung, Kino, Landwirtschaft, Rettung und Verteidigungsprototypen",
        "Vollständiger Bauzyklus: Rahmenmontage, FC-Abstimmung, Nutzlastintegration und Feldtests",
        "Konfiguration von ArduPilot-Flugstacks für verschiedene Missionprofile und Nutzlastanforderungen",
      ],
    },
  ],
};

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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Tag({ label, accent = false }) {
  return (
    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.05em", padding: "3px 10px", borderRadius: "2px", border: accent ? "1px solid #39ff14" : "1px solid #333", color: accent ? "#39ff14" : "#888", background: accent ? "rgba(57,255,20,0.06)" : "transparent", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function StatusBadge({ status }) {
  const isComplete = status === "COMPLETE" || status === "ABGESCHLOSSEN";
  return (
    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", padding: "2px 8px", borderRadius: "2px", border: `1px solid ${isComplete ? "#39ff14" : "#f59e0b"}`, color: isComplete ? "#39ff14" : "#f59e0b", background: isComplete ? "rgba(57,255,20,0.06)" : "rgba(245,158,11,0.08)" }}>
      {status}
    </span>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <button onClick={() => setLang("en")} title="English" style={{ background: "transparent", border: lang === "en" ? "1px solid #39ff14" : "1px solid #2a2a2a", borderRadius: "3px", padding: "4px 8px", cursor: "pointer", fontSize: "0.75rem", fontFamily: "'Space Mono', monospace", color: lang === "en" ? "#39ff14" : "#555", letterSpacing: "0.05em", transition: "all 0.2s" }}>
        EN
      </button>
      <button onClick={() => setLang("de")} title="Deutsch" style={{ background: "transparent", border: lang === "de" ? "1px solid #39ff14" : "1px solid #2a2a2a", borderRadius: "3px", padding: "4px 8px", cursor: "pointer", fontSize: "0.75rem", fontFamily: "'Space Mono', monospace", color: lang === "de" ? "#39ff14" : "#555", letterSpacing: "0.05em", transition: "all 0.2s" }}>
        DE
      </button>
    </div>
  );
}

function GallerySection({ t, lang, styles }) {
  const [filter, setFilter] = useState("ALL");
  const [lightbox, setLightbox] = useState(null);

  const filterKey = lang === "en" ? { ALL: "ALL", PHOTOS: "PHOTOS", VIDEOS: "VIDEOS" } : { ALL: "ALLE", PHOTOS: "FOTOS", VIDEOS: "VIDEOS" };
  const filtered = GALLERY.filter(item => {
    if (filter === filterKey.ALL || filter === "ALL" || filter === "ALLE") return true;
    if (filter === filterKey.PHOTOS || filter === "PHOTOS" || filter === "FOTOS") return item.type === "image";
    if (filter === filterKey.VIDEOS || filter === "VIDEOS") return item.type === "video";
    return true;
  });

  const sectionId = lang === "en" ? "gallery" : "galerie";

  return (
    <>
      <section id={sectionId} className="section-inner" style={{ ...styles.section, maxWidth: "1200px" }}>
        <FadeIn>
          <div style={styles.sectionLabel}>{t.gallery.sectionLabel}</div>
          <h2 style={styles.sectionTitle}>{t.gallery.sectionTitle}</h2>
        </FadeIn>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {[t.gallery.filterAll, t.gallery.filterPhotos, t.gallery.filterVideos].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", padding: "6px 16px", borderRadius: "2px", border: filter === f ? "1px solid #39ff14" : "1px solid #333", color: filter === f ? "#39ff14" : "#666", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
            >
              {f}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05}>
              {item.type === "video" ? (
                <div style={{ borderRadius: "4px", overflow: "hidden", border: "1px solid #1e1e1e", background: "#0d0d0d" }}>
                  <iframe
                    width="100%"
                    height="220"
                    src={item.src}
                    title={item.caption}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: "block" }}
                  />
                  <div style={{ padding: "0.75rem 1rem", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#555", letterSpacing: "0.08em" }}>
                    {item.caption.toUpperCase()}
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setLightbox(item)}
                  style={{ borderRadius: "4px", overflow: "hidden", border: "1px solid #1e1e1e", background: "#0d0d0d", cursor: "pointer", transition: "all 0.3s" }}
                  className="gallery-img-card"
                >
                  <div style={{ position: "relative", paddingTop: "62%" }}>
                    <img
                      src={item.src}
                      alt={item.caption}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }} className="gallery-overlay">
                      <span style={{ color: "#39ff14", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", opacity: 0 }} className="gallery-zoom">⊕ VIEW</span>
                    </div>
                  </div>
                  <div style={{ padding: "0.75rem 1rem", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#555", letterSpacing: "0.08em" }}>
                    {item.caption.toUpperCase()}
                  </div>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", cursor: "pointer" }}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", borderRadius: "4px", display: "block" }} />
            <div style={{ textAlign: "center", marginTop: "1rem", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#666", letterSpacing: "0.1em" }}>
              {lightbox.caption.toUpperCase()}
            </div>
            <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: "-2rem", right: 0, background: "none", border: "none", color: "#39ff14", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.1em" }}>
              CLOSE ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [activeSection, setActiveSection] = useState("About");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setTyped("");
    let i = 0;
    const interval = setInterval(() => {
      setTyped(t.heroTagline.slice(0, i + 1));
      i++;
      if (i >= t.heroTagline.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, [lang, t.heroTagline]);

  useEffect(() => {
    const handleScroll = () => {
      const ids = t.navLinks.map(l => l.toLowerCase().replace(/\s/g, "-"));
      const scrollY = window.scrollY + 100;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && scrollY >= el.offsetTop) { setActiveSection(t.navLinks[i]); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t.navLinks]);

  const scrollTo = (label) => {
    const id = label.toLowerCase().replace(/\s/g, "-");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const sectionIds = t.navLinks.map(l => l.toLowerCase().replace(/\s/g, "-"));

  const styles = {
    root: { background: "#0a0a0a", color: "#d4d4d4", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5vw", height: "64px", background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a" },
    logo: { fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", color: "#39ff14", letterSpacing: "0.1em", cursor: "pointer" },
    navLinks: { display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 },
    navLink: (active) => ({ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.08em", color: active ? "#39ff14" : "#666", cursor: "pointer", transition: "color 0.2s", textTransform: "uppercase", borderBottom: active ? "1px solid #39ff14" : "1px solid transparent", paddingBottom: "2px" }),
    hero: { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8vw", position: "relative", overflow: "hidden" },
    heroGrid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(57,255,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" },
    heroGlow: { position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(57,255,20,0.05) 0%, transparent 70%)", pointerEvents: "none" },
    heroLabel: { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#39ff14", marginBottom: "1.5rem" },
    heroName: { fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: "#f0f0f0", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.5rem" },
    heroTitle: { fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "#555", fontFamily: "'Space Mono', monospace", marginBottom: "2rem", letterSpacing: "0.05em" },
    heroTagline: { fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#888", maxWidth: "560px", lineHeight: 1.6, marginBottom: "3rem", minHeight: "2em" },
    cursor: { display: "inline-block", width: "2px", height: "1.1em", background: "#39ff14", marginLeft: "3px", verticalAlign: "text-bottom", animation: "blink 1s step-end infinite" },
    heroCtas: { display: "flex", gap: "1rem", flexWrap: "wrap" },
    btnPrimary: { fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.1em", padding: "12px 28px", background: "#39ff14", color: "#0a0a0a", border: "none", borderRadius: "2px", cursor: "pointer", fontWeight: 700, transition: "all 0.2s", textTransform: "uppercase" },
    btnSecondary: { fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.1em", padding: "12px 28px", background: "transparent", color: "#d4d4d4", border: "1px solid #333", borderRadius: "2px", cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase" },
    section: { padding: "100px 8vw", maxWidth: "1200px", margin: "0 auto" },
    sectionLabel: { fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#39ff14", textTransform: "uppercase", marginBottom: "0.75rem" },
    sectionTitle: { fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "#f0f0f0", letterSpacing: "-0.02em", marginBottom: "3rem", lineHeight: 1.1 },
    divider: { width: "100%", height: "1px", background: "linear-gradient(90deg, #1a1a1a 0%, #39ff14 30%, #1a1a1a 100%)", marginBottom: "80px" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
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
        .gallery-img-card:hover { border-color: #39ff14 !important; }
        .gallery-img-card:hover .gallery-overlay { background: rgba(0,0,0,0.5) !important; }
        .gallery-img-card:hover .gallery-zoom { opacity: 1 !important; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-menu { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-section { padding: 0 6vw !important; }
          .section-inner { padding: 60px 6vw !important; }
          .fact-row { flex-direction: column !important; gap: 4px !important; }
          .fact-label { min-width: unset !important; }
        }
      `}</style>

      <div style={styles.root}>
        <nav style={styles.nav}>
          <div style={styles.logo} onClick={() => scrollTo(t.navLinks[0])}>SS_</div>
          <ul className="nav-links-desktop" style={styles.navLinks}>
            {t.navLinks.map(link => (
              <li key={link}>
                <span className="nav-link" style={styles.navLink(activeSection === link)} onClick={() => scrollTo(link)}>
                  {link}
                </span>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <LangToggle lang={lang} setLang={setLang} />
            <button className="nav-mobile-menu" onClick={() => setMobileMenuOpen(o => !o)} style={{ display: "none", background: "none", border: "1px solid #333", color: "#39ff14", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", padding: "6px 12px", cursor: "pointer", letterSpacing: "0.1em" }}>
              {mobileMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div style={{ position: "fixed", top: "64px", left: 0, right: 0, background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", zIndex: 99, padding: "1.5rem 6vw", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {t.navLinks.map(link => (
              <span key={link} onClick={() => { scrollTo(link); setMobileMenuOpen(false); }} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", letterSpacing: "0.1em", color: activeSection === link ? "#39ff14" : "#888", cursor: "pointer", textTransform: "uppercase" }}>
                {link}
              </span>
            ))}
          </div>
        )}

        <section className="hero-section" style={styles.hero}>
          <div style={styles.heroGrid} />
          <div style={styles.heroGlow} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={styles.heroLabel}>{t.heroLabel}</div>
            <h1 style={styles.heroName}>Siddhesh<br />Salunkhe</h1>
            <div style={styles.heroTitle}>{t.heroTitle}</div>
            <p style={styles.heroTagline}>{typed}<span style={styles.cursor} /></p>
            <div style={styles.heroCtas}>
              <button className="btn-primary" style={styles.btnPrimary} onClick={() => scrollTo(t.navLinks[2])}>{t.heroCtas.projects}</button>
              <button className="btn-secondary" style={styles.btnSecondary} onClick={() => scrollTo(t.navLinks[5])}>{t.heroCtas.contact}</button>
              <a href="https://github.com/siddhesh1008" target="_blank" rel="noopener noreferrer" style={{ ...styles.btnSecondary, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>GitHub ↗</a>
            </div>
          </div>
        </section>

        <div style={styles.divider} />

        <section id={sectionIds[0]} className="section-inner" style={styles.section}>
          <FadeIn>
            <div style={styles.sectionLabel}>{t.about.sectionLabel}</div>
            <h2 style={styles.sectionTitle}>{t.about.sectionTitle}</h2>
          </FadeIn>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <FadeIn delay={0.1}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#aaa", marginBottom: "1.5rem" }}>{t.about.bio1}</p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#aaa", marginBottom: "1.5rem" }}>{t.about.bio2}</p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#aaa" }}>{t.about.bio3}</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {t.about.facts.map(item => (
                  <div key={item.label} className="fact-row" style={{ display: "flex", borderBottom: "1px solid #1a1a1a", paddingBottom: "1rem", gap: "1rem" }}>
                    <span className="fact-label" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#39ff14", letterSpacing: "0.1em", minWidth: "130px", paddingTop: "2px" }}>{item.label.toUpperCase()}</span>
                    <span style={{ color: "#ccc", fontSize: "0.95rem" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <div style={styles.divider} />

        <section id={sectionIds[1]} className="section-inner" style={{ ...styles.section, maxWidth: "1200px" }}>
          <FadeIn>
            <div style={styles.sectionLabel}>{t.skills.sectionLabel}</div>
            <h2 style={styles.sectionTitle}>{t.skills.sectionTitle}</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {Object.entries(SKILLS).map(([group, items], i) => (
              <FadeIn key={group} delay={i * 0.1}>
                <div className="skill-group" style={{ border: "1px solid #1e1e1e", borderRadius: "4px", padding: "1.5rem", background: "#0d0d0d", transition: "border-color 0.3s" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#39ff14", marginBottom: "1rem", textTransform: "uppercase" }}>{group}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {items.map(skill => <Tag key={skill} label={skill} />)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div style={styles.divider} />

        <section id={sectionIds[2]} className="section-inner" style={styles.section}>
          <FadeIn>
            <div style={styles.sectionLabel}>{t.projects.sectionLabel}</div>
            <h2 style={styles.sectionTitle}>{t.projects.sectionTitle}</h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {PROJECTS[lang].map((proj, i) => (
              <FadeIn key={proj.id} delay={i * 0.1}>
                <div className="project-card" style={{ border: "1px solid #1e1e1e", borderRadius: "4px", padding: "2rem", background: "#0d0d0d", transition: "all 0.3s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <h3 className="project-title" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f0f0f0", transition: "color 0.3s" }}>{proj.title}</h3>
                      <StatusBadge status={proj.status} />
                    </div>
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
                    {proj.tags.map(tg => <Tag key={tg} label={tg} accent />)}
                  </div>
                  {(proj.galleryLink || proj.github) && (
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                      {proj.galleryLink && (
                        <button
                          onClick={() => scrollTo(t.navLinks[3])}
                          style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", color: "#39ff14", background: "transparent", border: "1px solid #39ff14", padding: "6px 16px", borderRadius: "2px", cursor: "pointer", transition: "all 0.2s" }}
                        >
                          ▸ {lang === "en" ? "View Gallery" : "Galerie ansehen"}
                        </button>
                      )}
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", color: "#39ff14", textDecoration: "none", border: "1px solid #39ff14", padding: "6px 16px", borderRadius: "2px", transition: "all 0.2s", display: "inline-block" }}>
                          ▸ GITHUB
                        </a>
                      )}
                    </div>
                  )}
                  {proj.youtube && (
                    <div style={{ marginTop: "1.5rem", borderRadius: "4px", overflow: "hidden", border: "1px solid #1e1e1e" }}>
                      <iframe
                        width="100%"
                        height="380"
                        src={proj.youtube}
                        title={proj.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ display: "block" }}
                      />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div style={styles.divider} />

        {/* GALLERY */}
        <GallerySection t={t} lang={lang} styles={styles} />

        <div style={styles.divider} />

        <section id={sectionIds[4]} className="section-inner" style={styles.section}>
          <FadeIn>
            <div style={styles.sectionLabel}>{t.experience.sectionLabel}</div>
            <h2 style={styles.sectionTitle}>{t.experience.sectionTitle}</h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {EXPERIENCE[lang].map((exp, i) => (
              <FadeIn key={exp.company} delay={i * 0.1}>
                <div className="exp-card" style={{ borderLeft: "2px solid #222", paddingLeft: "2rem", transition: "border-left-color 0.3s" }}>
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

        <section id={sectionIds[5]} className="section-inner" style={{ ...styles.section, textAlign: "center", maxWidth: "700px" }}>
          <FadeIn>
            <div style={{ ...styles.sectionLabel, justifyContent: "center" }}>{t.contact.sectionLabel}</div>
            <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>{t.contact.sectionTitle}</h2>
            <p style={{ color: "#888", lineHeight: 1.8, marginBottom: "3rem", fontSize: "1rem" }}>{t.contact.bio}</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:siddhesh2152@gmail.com" className="btn-primary" style={{ ...styles.btnPrimary, textDecoration: "none", display: "inline-block" }}>{t.contact.email}</a>
              <a href="https://linkedin.com/in/siddhesh-salunkhe-277257194" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ ...styles.btnSecondary, textDecoration: "none", display: "inline-block" }}>LinkedIn ↗</a>
              <a href="https://github.com/siddhesh1008" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ ...styles.btnSecondary, textDecoration: "none", display: "inline-block" }}>GitHub ↗</a>
              <a href="https://www.instagram.com/frosty_fpv_/" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ ...styles.btnSecondary, textDecoration: "none", display: "inline-block" }}>Instagram ↗</a>
            </div>
          </FadeIn>
        </section>

        <footer style={{ borderTop: "1px solid #1a1a1a", padding: "2rem 8vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#333" }}>© 2026 SIDDHESH SALUNKHE</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#333" }}>{t.footer}</span>
        </footer>
      </div>
    </>
  );
}