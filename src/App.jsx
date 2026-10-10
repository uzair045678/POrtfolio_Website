import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Gamepad2,
  Code2,
  Cpu,
  Box,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiFiverr, SiUpwork } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero.jsx";
import LazyVideo from "./LazyVideo.jsx";
import ProjectModal from "./ProjectModal.jsx";
import useProjectRoute from "./useProjectRoute.js";
import { projectList, featuredProjects } from "./projects.js";

const base = import.meta.env.BASE_URL || "/";

const skills = [
  { icon: <Gamepad2 />, title: "Engines & Languages", items: ["Unity (2D/3D, AR, VR)", "Unreal Engine (BP, C++)", "C#", "C++", "Python"] },
  { icon: <Cpu />, title: "XR & Networking", items: ["Photon / Mirror", "Netcode for GameObjects", "Firebase", "Vuforia", "XR Toolkit", "AR Foundation", "Meta XR SDK"] },
  { icon: <Box />, title: "Concepts & Tools", items: ["OOP", "Multiplayer Networking", "Client-Server Arch", "Git / GitHub", "GitLab", "Jira", "Blender", "Figma"] },
  { icon: <Code2 />, title: "VR / AR Development", items: ["VR Development", "AR Development", "XR Interaction", "3D Simulation", "WebAR"] },
];

export default function App() {
  const { activeProject, openProject, closeProject } = useProjectRoute();

  return (
    <>
      <main>
        <style>{css}</style>
        <Navbar />
        <Hero />
        <WhoIAm />
        <FeaturedProjects onOpen={openProject} />
        <Portfolio onOpen={openProject} />
        <Skills />
        <Contact />
        <Footer />
      </main>
      <ProjectModal
        project={activeProject}
        onClose={closeProject}
        onNavigate={openProject}
      />
    </>
  );
}

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "portfolio", label: "Portfolio" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="navbar">
      <a href="#home" className="logo">Uzair Ahmad<span> - Portfolio</span></a>
      <nav aria-label="Primary navigation">
        {navLinks.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "true" : undefined}>{label}</a>
        ))}
      </nav>
    </header>
  );
}

function WhoIAm() {
  return (
    <section id="about" className="section about">
      <p className="label">ABOUT</p>
      <h2 className="sectionTitle">Who <span>I Am</span></h2>
      <div className="aboutGrid">
        <div className="aboutCard large">
          <p>
            I'm an XR &amp; Software Developer with 3+ years of experience building interactive applications, simulations, and real-time systems using Unity and Unreal Engine. I enjoy solving practical problems by combining existing technologies, APIs, networking, and immersive interfaces into complete working solutions.
          </p>
          <div className="contactLine"><Mail size={16} /> uzair12ahmad34@gmail.com</div>
          <div className="contactLine"><Phone size={16} /> +92-3341574422</div>
          <div className="contactLine"><MapPin size={16} /> Islamabad, Pakistan</div>
          <div className="contactLine">
            <a href="https://www.linkedin.com/in/uzair-ahmad-mirza-b939a21a2/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)" }}>LinkedIn</a>
            <span style={{ color: "var(--muted)" }}> / </span>
            <a href="https://github.com/uzair045678" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)" }}>GitHub</a>
            <span style={{ color: "var(--muted)" }}> / </span>
            <a href="https://www.fiverr.com/insightpro_862?public_mode=AD" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)" }}>Fiverr</a>
            <span style={{ color: "var(--muted)" }}> / </span>
            <a href="https://www.upwork.com/freelancers/~01316287666907ead0?mp_source=share" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)" }}>Upwork</a>
          </div>
        </div>
        <Stat icon={<Briefcase />} value="3+" label="Years Experience" />
        <Stat icon={<Code2 />} value="20+" label="Projects Completed" />
      </div>
    </section>
  );
}

function Stat({ icon, value, label }) {
  return <div className="stat"><span>{icon}</span><h3>{value}</h3><p>{label}</p></div>;
}

function Skills() {
  return (
    <section id="skills" className="section skills">
      <p className="label">EXPERTISE</p>
      <h2 className="sectionTitle">Technical <span>Skills</span></h2>
      <div className="skillsGrid">
        {skills.map((skill) => (
          <div className="skillCard" key={skill.title}>
            <h3><span>{skill.icon}</span>{skill.title}</h3>
            <div className="skillTags">
              {skill.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Portfolio({ onOpen }) {
  const [activeTag, setActiveTag] = useState("All");
  const tags = [
    "All",
    ...new Set(projectList.flatMap((project) => project.tags)),
  ];
  const visibleProjects = activeTag === "All"
    ? projectList
    : projectList.filter((project) => project.tags.includes(activeTag));

  return (
    <section id="portfolio" className="section portfolio">
      <p className="label">PORTFOLIO</p>
      <h2 className="sectionTitle">Portfolio <span>Projects</span></h2>
      <div className="categoryFilters" role="group" aria-label="Filter portfolio projects by category">
        {tags.map((tag) => (
          <button
            className={`categoryFilter${activeTag === tag ? " active" : ""}`}
            type="button"
            aria-pressed={activeTag === tag}
            onClick={() => setActiveTag(tag)}
            key={tag}
          >
            {tag}
          </button>
        ))}
      </div>
      <motion.div className="projectGrid" layout>
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.div
              className="projectGridItem"
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <ProjectCard project={project} onOpen={onOpen} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="projectCard">
      {project.video ? (
        <LazyVideo src={project.video} poster={project.image} title={project.title} />
      ) : (
        <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
      )}
      <h3>{project.title}</h3>
      <p className="projectCardDesc">{project.desc}</p>
      <div className="tags" aria-label="Project technologies">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <span className="viewProject" aria-hidden="true">
        Check Details <ArrowRight />
      </span>
      <button
        className="cardHitArea"
        type="button"
        aria-haspopup="dialog"
        aria-label={`View project: ${project.title}`}
        onClick={() => onOpen(project.slug)}
      />
    </article>
  );
}

function FeaturedProjects({ onOpen }) {
  return (
    <section className="section featured">
      <p className="label">FEATURED</p>
      <h2 className="sectionTitle">Featured <span>Projects</span></h2>
      <div className="videoGrid">
        {featuredProjects.map((project) => (
          <motion.article
            className="videoCard"
            key={project.slug}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="videoBox">
              {project.video ? (
                <LazyVideo src={project.video} poster={project.image} title={project.title} />
              ) : (
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
              )}
            </div>
            <h3>{project.title}</h3>
            <p className="projectCardDesc">{project.desc}</p>
            <div className="tags" aria-label="Project technologies">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <span className="viewProject" aria-hidden="true">
              Check Details <ArrowRight />
            </span>
            <button
              className="cardHitArea"
              type="button"
              aria-haspopup="dialog"
              aria-label={`View project: ${project.title}`}
              onClick={() => onOpen(project.slug)}
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const form = event.currentTarget;
      const response = await fetch("https://formsubmit.co/ajax/uzair12ahmad34@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          _subject: "New portfolio contact message",
        }),
      });

      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact">
      <h2 className="sectionTitle">Contact <span>Me</span></h2>
      <form className="contactForm" action="https://formsubmit.co/uzair12ahmad34@gmail.com" method="POST" onSubmit={submit}>
        <div className="inputGroup">
          <label className="srOnly" htmlFor="contact-name">Full name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Full Name" required />
          <label className="srOnly" htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Email Address" required />
          <label className="srOnly" htmlFor="contact-phone">Phone number</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" />
          <label className="srOnly" htmlFor="contact-subject">Subject</label>
          <input id="contact-subject" name="subject" type="text" placeholder="Subject" />
        </div>
        <div className="messageGroup">
          <label className="srOnly" htmlFor="contact-message">Your message</label>
          <textarea id="contact-message" name="message" placeholder="Your Message" required />
          <button className="btn primary" type="submit" disabled={status === "sending"}><Send size={16} /> {status === "sending" ? "Sending…" : "Send Message"}</button>
          {status === "success" && <p className="formStatus" role="status">Message sent successfully.</p>}
          {status === "error" && <p className="formStatus error" role="alert">Message could not be sent. Please try again or email me directly.</p>}
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <Socials />
      <nav className="footerLinks" aria-label="Footer navigation">
        <a href="#home">Home</a>
        <a href="#about">About Me</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
        <a href={base + "profile.html"}>Professional Profile</a>
      </nav>
      <p>© Uzair Ahmad Mirza | All Rights Reserved</p>
    </footer>
  );
}

function Socials() {
  return (
    <div className="socials">
      <a href="https://linkedin.com/in/uzair-ahmad-mirza-b939a21a2" target="_blank" rel="noopener noreferrer" aria-label="Uzair Ahmad Mirza on LinkedIn"><FaLinkedin size={26} aria-hidden="true" /></a>
      <a href="https://github.com/uzair045678" target="_blank" rel="noopener noreferrer" aria-label="Uzair Ahmad Mirza on GitHub"><FaGithub size={26} aria-hidden="true" /></a>
      <a href="https://www.fiverr.com/insightpro_862?public_mode=AD" target="_blank" rel="noopener noreferrer" aria-label="Uzair Ahmad Mirza on Fiverr"><SiFiverr size={26} aria-hidden="true" /></a>
      <a href="https://www.upwork.com/freelancers/~01316287666907ead0?mp_source=share" target="_blank" rel="noopener noreferrer" aria-label="Uzair Ahmad Mirza on Upwork"><SiUpwork size={26} aria-hidden="true" /></a>
    </div>
  );
}

const css = `
:root {
  --bg: #050505;
  --card: #111;
  --card2: #151515;
  --text: #fff;
  --muted: #b9b9b9;
  --cyan: #00fff0;
  --purple: #8f4dff;
  --border: rgba(0,255,240,.35);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--text); font-family: Inter, Arial, sans-serif; }
a { color: inherit; text-decoration: none; }
.section { padding: 90px 12%; scroll-margin-top: 100px; }
.srOnly { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }
.label { color: var(--cyan); letter-spacing: 3px; font-size: 12px; text-align: center; margin: 0 0 8px; }
.sectionTitle { text-align: center; font-size: clamp(36px, 5vw, 64px); margin: 0 0 55px; line-height: 1; }
.sectionTitle span, .logo span, .hero h1 span, .hero h2 span { color: var(--cyan); text-shadow: 0 0 30px rgba(0,255,240,.55); }
.navbar { position: sticky; top: 0; z-index: 20; display: flex; justify-content: space-between; align-items: center; padding: 24px 12%; background: rgba(0,0,0,.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,.05); }
.logo { font-size: 28px; font-weight: 800; }
nav { display: flex; gap: 34px; }
nav a { min-height: 44px; padding: 8px 4px; display: inline-flex; align-items: center; font-size: 15px; transition: .3s; }
nav a:hover, nav a:focus-visible { color: var(--cyan); }
nav a.active { color: var(--cyan); position: relative; }
nav a.active::after { content: ""; position: absolute; left: 0; right: 0; bottom: 6px; height: 2px; border-radius: 2px; background: var(--cyan); box-shadow: 0 0 12px var(--cyan); }
.hero { min-height: 88vh; display: grid; grid-template-columns: 1.05fr .95fr; gap: 80px; align-items: center; }
.hero h1 { font-size: clamp(44px, 6vw, 78px); margin: 0; }
.hero h2 { font-size: clamp(26px, 4vw, 42px); margin: 8px 0 20px; }
.typeCursor { color: var(--cyan); font-weight: 400; animation: caretBlink 1s step-end infinite; }
@keyframes caretBlink { 50% { opacity: 0; } }
.hero p { max-width: 650px; color: var(--text); line-height: 1.8; font-weight: 600; }
.heroImageWrap { position: relative; justify-self: center; width: min(430px, 82vw); aspect-ratio: 1; border-radius: 50%; padding: 7px; background: var(--cyan); box-shadow: 0 0 38px rgba(0,255,240,.7); }
.openToWorkBadge { position: absolute; top: 18px; right: 18px; z-index: 3; display: inline-flex; align-items: center; gap: 10px; padding: 11px 20px; border: 2px solid var(--cyan); border-radius: 999px; background: var(--cyan); color: #050505; box-shadow: 0 0 28px rgba(0,255,240,.55); font-size: 17px; font-weight: 800; line-height: 1.2; letter-spacing: .4px; white-space: nowrap; }
.openToWorkDot { width: 12px; height: 12px; flex-shrink: 0; border-radius: 50%; background: #050505; box-shadow: 0 0 0 4px rgba(5,5,5,.12); }
.heroCanvasWrap { position: relative; width: 100%; height: 100%; border-radius: 50%; overflow: hidden; background: radial-gradient(circle at 50% 32%, rgba(0,255,240,.30), rgba(0,255,240,.06) 58%, transparent 76%); }
.heroCanvasWrap canvas { display: block; width: 100% !important; height: 100% !important; }
.heroFallbackImg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.6s; z-index: 1; }
.heroFallbackImg.loaded { opacity: 0; pointer-events: none; }
.heroCanvasInner { width: 100%; height: 100%; opacity: 0; transition: opacity 0.6s; }
.heroCanvasInner.loaded { opacity: 1; }
.socials { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin: 28px 0; }
.socials a { width: 52px; height: 52px; display: grid; place-items: center; border: 2px solid var(--cyan); border-radius: 50%; color: var(--cyan); transition: .3s; }
.socials a:hover { background: var(--cyan); color: #000; box-shadow: 0 0 25px var(--cyan); transform: translateY(-4px); }
.buttons { display: flex; gap: 14px; flex-wrap: wrap; }
.btn { border: 1px solid var(--cyan); border-radius: 999px; padding: 13px 28px; font-weight: 800; letter-spacing: 1px; display: inline-flex; gap: 8px; align-items: center; justify-content: center; cursor: pointer; }
.primary { background: var(--cyan); color: #000; box-shadow: 0 0 25px rgba(0,255,240,.65); }
.outline { color: var(--cyan); background: transparent; }
.about { background: #080808; }
.aboutGrid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 22px; max-width: 1050px; margin: auto; }
.aboutGrid > * { min-width: 0; }
.aboutCard, .stat, .skillCard, .projectCard, .videoCard { background: linear-gradient(145deg, var(--card), #0b0b0b); border: 1px solid rgba(255,255,255,.1); border-radius: 16px; }
.aboutCard.large { grid-row: span 2; padding: 32px; }
.aboutCard p { color: var(--muted); line-height: 1.8; }
.contactLine { margin-top: 16px; padding: 12px 14px; background: var(--card2); border-radius: 8px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 10px; align-items: center; overflow-wrap: anywhere; font-size: 14px; }
.contactLine svg { flex: 0 0 auto; color: var(--cyan); }
.stat { min-height: 150px; display: grid; place-items: center; text-align: center; padding: 22px; }
.stat span { width: 42px; height: 42px; border-radius: 10px; background: rgba(0,255,240,.12); color: var(--cyan); display: grid; place-items: center; }
.stat h3 { font-size: 30px; margin: 10px 0 0; }
.stat p { margin: 4px 0 0; color: var(--muted); }
.skillsGrid, .projectGrid, .videoGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px; }
.skillCard { padding: 28px; }
.skillCard h3 { display: flex; align-items: center; gap: 14px; margin-top: 0; }
.skillCard h3 span { color: var(--cyan); width: 42px; height: 42px; display: grid; place-items: center; background: rgba(0,255,240,.1); border-radius: 12px; }
.skillTags, .tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
.skillTags span, .tags span { background: #1c1c1c; border: 1px solid rgba(255,255,255,.09); border-radius: 7px; padding: 9px 13px; color: var(--muted); font-size: 14px; }
.portfolio { background: #101010; }
.categoryFilters { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin: -20px auto 36px; }
.categoryFilter { flex: 0 0 auto; min-height: 42px; padding: 10px 20px; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; background: #191919; color: var(--muted); font: inherit; font-size: 14px; font-weight: 700; cursor: pointer; transition: background-color .25s, border-color .25s, color .25s, box-shadow .25s, transform .25s; }
.categoryFilter:hover { color: var(--text); border-color: var(--border); transform: translateY(-2px); }
.categoryFilter.active { background: var(--cyan); border-color: var(--cyan); color: #050505; box-shadow: 0 0 22px rgba(0,255,240,.28); }
.projectGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.projectGridItem { display: block; height: 100%; min-width: 0; }
.projectCard, .videoCard { padding: 24px; transition: .3s; }
.projectCard { height: 100%; }
.projectCard, .videoCard { position: relative; display: flex; flex-direction: column; align-items: stretch; text-align: left; }
.cardHitArea { position: absolute; inset: 0; z-index: 1; border: 0; border-radius: inherit; padding: 0; background: transparent; cursor: pointer; }
.cardHitArea:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }
.projectCard:hover, .videoCard:hover { transform: translateY(-8px); border-color: var(--border); box-shadow: 0 0 25px rgba(0,255,240,.12); }
.projectCard img, .videoBox img { transition: transform .35s ease; }
.projectCard:hover img, .videoCard:hover .videoBox img { transform: scale(1.06); }
.videoPlaceholder .videoThumb { transition: transform .35s ease, filter .3s; }
.videoPlaceholder:hover .videoThumb { transform: scale(1.06); filter: brightness(.5); }
/* Keeps the inline play button above the stretched card hit area. */
.projectCard .videoPlaceholder, .projectCard video, .videoCard .videoBox { position: relative; z-index: 2; }
.projectCard img, .projectCard .videoPlaceholder { width: 100%; height: 190px; object-fit: cover; border-radius: 12px; border: 1px solid var(--border); }
.projectCard video { width: 100%; border-radius: 12px; border: 1px solid var(--border); }
.projectCard h3, .videoCard h3 { font-size: 22px; margin: 18px 0 8px; }
.projectCard p, .videoCard p { color: var(--muted); line-height: 1.6; }
/* Card summaries stay at two lines; the full copy lives in the modal. */
.projectCardDesc { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
.viewProject { display: inline-flex; align-items: center; gap: 8px; margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.08); color: var(--cyan); font-size: 14px; font-weight: 700; letter-spacing: .5px; }
.viewProject svg { width: 17px; height: 17px; transition: transform .3s; }
.projectCard:hover .viewProject svg, .videoCard:hover .viewProject svg { transform: translateX(4px); }
.modalBackdrop { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 5vh 4vw; background: rgba(0,0,0,.82); backdrop-filter: blur(8px); }
.modalPanel { position: relative; display: flex; flex-direction: column; width: min(1250px, 88vw); max-height: 90vh; background: linear-gradient(160deg, #121212, #080808); border: 1px solid var(--border); border-radius: 20px; box-shadow: 0 0 60px rgba(0,255,240,.14); overflow: hidden; }
.modalClose { position: absolute; top: 14px; right: 14px; z-index: 2; width: 44px; height: 44px; display: grid; place-items: center; background: rgba(5,5,5,.75); border: 1px solid var(--border); border-radius: 50%; color: var(--cyan); cursor: pointer; transition: .25s; }
.modalClose:hover { background: var(--cyan); color: #000; transform: rotate(90deg); }
.modalScroll { overflow-y: auto; overscroll-behavior: contain; padding: 44px clamp(20px, 4vw, 52px) 36px; }
.modalHeader h2 { font-size: clamp(26px, 3.4vw, 40px); margin: 0 0 12px; line-height: 1.15; padding-right: 56px; }
.modalDesc { color: var(--muted); line-height: 1.75; font-size: 17px; margin: 0; max-width: 78ch; }
.modalHero { margin: 30px 0 6px; }
.modalHero img, .modalHero .videoPlaceholder { width: 100%; max-height: 52vh; object-fit: cover; border-radius: 14px; border: 1px solid var(--border); background: #000; }
.modalHero video { width: 100%; border-radius: 14px; border: 1px solid var(--border); background: #000; }
.modalSection { margin-top: 30px; padding-top: 26px; border-top: 1px solid rgba(255,255,255,.08); }
.modalSectionTitle { font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: var(--cyan); margin: 0 0 12px; }
.modalSection p { color: var(--muted); line-height: 1.8; font-size: 16px; margin: 0; max-width: 82ch; }
.modalList { margin: 0; padding: 0; list-style: none; display: grid; gap: 11px; max-width: 82ch; }
.modalList li { position: relative; padding-left: 26px; color: var(--muted); line-height: 1.7; font-size: 16px; }
.modalList li::before { content: ""; position: absolute; left: 0; top: .62em; width: 9px; height: 9px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 10px rgba(0,255,240,.7); }
.modalGallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
.modalFigure { margin: 0; }
.modalFigure img, .modalFigure video { width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,.1); background: #000; }
.modalFigure figcaption { margin-top: 8px; color: var(--muted); font-size: 14px; }
.modalLinks { display: flex; flex-wrap: wrap; gap: 12px; }
.modalLink { display: inline-flex; align-items: center; gap: 9px; min-height: 44px; padding: 11px 20px; background: #1c1c1c; border: 1px solid var(--border); border-radius: 10px; color: var(--cyan); font-weight: 700; font-size: 14px; transition: .25s; }
.modalLink:hover { background: rgba(0,255,240,.12); }
.modalNav { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 34px; padding-top: 26px; border-top: 1px solid rgba(255,255,255,.08); }
.modalNavBtn { display: inline-flex; align-items: center; gap: 10px; max-width: 46%; padding: 12px 16px; background: #1a1a1a; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; color: var(--text); font: inherit; font-size: 14px; text-align: left; cursor: pointer; transition: .25s; }
.modalNavBtn.next { text-align: right; }
.modalNavBtn:hover { border-color: var(--border); color: var(--cyan); }
.modalNavBtn span { display: flex; flex-direction: column; min-width: 0; }
.modalNavBtn small { color: var(--muted); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; }
.modalNavBtn svg { flex: 0 0 auto; width: 20px; height: 20px; }
.modalNavBtn span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.featured { background: radial-gradient(circle at center, rgba(0,255,240,.06), transparent 45%), #050505; }
.videoGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.videoBox { position: relative; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); }
.videoBox video, .videoBox img { width: 100%; height: 210px; object-fit: cover; display: block; }
.videoBox .videoPlaceholder { width: 100%; height: 210px; }
.videoPlaceholder { position: relative; padding: 0; background: transparent; color: inherit; font: inherit; cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.videoThumb { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(.7); }
.videoPlaceholder:hover .playIcon { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
.playIcon { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: white; opacity: .8; pointer-events: none; transition: .3s; width: 56px; height: 56px; }
.contact { background: #050505; }
.contactForm { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; max-width: 1050px; margin: auto; }
.inputGroup { display: grid; gap: 22px; }
input, textarea { width: 100%; background: #121212; color: white; border: 1.5px solid var(--cyan); border-radius: 18px; padding: 22px; font-size: 16px; outline: none; }
textarea { min-height: 248px; resize: vertical; }
.messageGroup { display: grid; gap: 26px; justify-items: center; }
.formStatus { margin: 0; color: var(--cyan); text-align: center; }
.formStatus.error { color: #ff7b7b; }
.contactForm button:disabled { cursor: wait; opacity: .7; }
footer { background: linear-gradient(180deg, rgba(0,255,240,.06), rgba(17,17,17,0) 45%), #111; border-top: 1px solid var(--border); text-align: center; padding: 40px 12%; }
footer .socials { justify-content: center; margin-top: 0; }
.footerLinks { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; margin: 24px 0 34px; }
footer p { margin: 0; }
@media (max-width: 980px) {
  .navbar { padding: 18px 6%; flex-direction: column; gap: 18px; }
  nav { gap: 18px; flex-wrap: wrap; justify-content: center; }
  .section { padding: 70px 6%; scroll-margin-top: 150px; }
  .hero { grid-template-columns: 1fr; text-align: center; gap: 45px; }
  .heroText p { margin-inline: auto; }
  .heroImageWrap { margin-top: 20px; }
  .socials, .buttons { justify-content: center; }
  .aboutGrid, .skillsGrid, .projectGrid, .videoGrid, .contactForm { grid-template-columns: 1fr; }
  .aboutCard.large { grid-row: auto; }
}
@media (max-width: 560px) {
  .navbar { position: static; }
  nav { gap: 4px 10px; }
  nav a { padding-inline: 3px; font-size: 14px; }
  .logo { font-size: 24px; }
  .section { scroll-margin-top: 20px; }
  .sectionTitle { margin-bottom: 35px; }
  .categoryFilters { justify-content: flex-start; flex-wrap: nowrap; overflow-x: auto; margin: -8px -6vw 30px; padding: 4px 6vw 12px; scrollbar-width: thin; scrollbar-color: var(--cyan) transparent; }
  .categoryFilter { min-height: 44px; }
  .heroImageWrap { width: min(280px, 100%); }
  .aboutCard.large, .projectCard, .videoCard, .skillCard { padding: 20px; }
  .modalBackdrop { padding: 0; place-items: stretch; }
  .modalPanel { width: 100%; max-height: 100vh; height: 100%; border-radius: 0; border: 0; }
  .modalScroll { padding: 34px 20px 28px; }
  .modalHeader h2 { padding-right: 0; font-size: 26px; }
  .modalNavBtn { max-width: 100%; }
  input, textarea { border-radius: 14px; padding: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
}
`;
