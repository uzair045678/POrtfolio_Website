import {
  Mail,
  Phone,
  MapPin,
  Send,
  Gamepad2,
  Code2,
  Cpu,
  Box,
  PlayCircle,
  User,
  Briefcase,
} from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  
} from "react-icons/fa";

const portfolioProjects = [
  {
    title: "AR Media Platform",
    desc: "Dynamic image target recognition platform with cloud-backed recognition and OpenCV-based validation.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=900&auto=format&fit=crop",
    tags: ["Unity", "Vuforia", "AR"],
  },
  {
    title: "Virtual Hajj VR Tour",
    desc: "Immersive Unreal VR experience of Hajj with multilingual support and interactive UI widgets.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=900&auto=format&fit=crop",
    tags: ["Unreal", "VR", "Multiplayer"],
  },
  {
    title: "Multiplayer Robot Simulation",
    desc: "Unity + Firebase system syncing desktop inputs and stats with real-world robot players in real-time.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=900&auto=format&fit=crop",
    tags: ["Unity", "Firebase", "Multiplayer"],
  },
  {
    title: "Web AR Object Placement",
    desc: "WebAR-based system for interactive 3D model placement using AR Foundation and WebXR.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=900&auto=format&fit=crop",
    tags: ["WebAR", "AR Foundation", "WebXR"],
  },
  {
    title: "AR Portfolio Contact Card",
    desc: "Scannable AR contact card overlaying 3D portfolio content for interactive networking.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=900&auto=format&fit=crop",
    tags: ["AR", "Unity", "Vuforia"],
  },
  {
    title: "Immersive Mecanno VR (FYP)",
    desc: "Mobile + VR app for assembling and disassembling LEGO/Mecanno models with snapping mechanics.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=900&auto=format&fit=crop",
    tags: ["Unity", "VR", "C#"],
  },
];

const featuredProjects = [
  {
    title: "VR Home Caretaker Simulator",
    desc: "Unity-based VR simulator with Convai integration for interactive home safety hazard detection and AI-driven elder avatar training.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    tags: ["Unity", "VR", "AI", "Convai"],
  },
  {
    title: "Multiplayer VR Helicopter Plugin",
    desc: "Server-authoritative multiplayer VR helicopter plugin in Unreal with replicated flight controls and seat occupancy management.",
    video: "https://www.w3schools.com/html/movie.mp4",
    tags: ["Unreal", "VR", "Multiplayer", "Replication"],
  },
  {
    title: "Color Connect – Line Puzzle",
    desc: "Mobile puzzle game with 10k+ downloads, optimized load times by 20% with Unity Ads and Firebase Analytics integration.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    tags: ["Unity", "Mobile", "Puzzle", "Optimization"],
  },
];

const skills = [
  { icon: <Gamepad2 />, title: "Engines & Languages", items: ["Unity (2D/3D, AR, VR)", "Unreal Engine (BP, C++)", "C#", "C++", "Python"] },
  { icon: <Cpu />, title: "XR & Networking", items: ["Photon / Mirror", "Netcode for GameObjects", "Firebase", "Vuforia", "XR Toolkit", "AR Foundation", "Meta XR SDK"] },
  { icon: <Box />, title: "Concepts & Tools", items: ["OOP", "Multiplayer Networking", "Client-Server Arch", "Git / GitHub", "GitLab", "Jira", "Blender", "Figma"] },
  { icon: <Code2 />, title: "VR / AR Development", items: ["VR Development", "AR Development", "XR Interaction", "3D Simulation", "WebAR"] },
];

export default function App() {
  return (
    <main>
      <style>{css}</style>
      <Navbar />
      <Hero />
      <WhoIAm />
      <Portfolio />
      <Skills />
      <FeaturedProjects />
      <Contact />
      <Footer />
    </main>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="logo">Uzair <span>Ahmad</span></a>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About Me</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section">
      <div className="heroText">
        <h1>Hi, it's <span>Uzair Ahmad Mirza</span></h1>
        <h2>I'm an <span>XR Developer</span></h2>
        <p>
          I build immersive AR, VR, XR, and real-time interactive experiences using Unity,
          Unreal Engine, C#, C++, and modern gameplay systems. I specialize in VR/AR applications,
          interactive simulations, and real-world XR solutions that bridge virtual environments with practical applications.
        </p>
        <Socials />
        <div className="buttons">
          <a className="btn primary" href="#portfolio">View Projects</a>
          <a className="btn outline" href="#contact">Contact Me</a>
        </div>
      </div>
      <div className="heroImageWrap">
        <img
          className="heroImage"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop"
          alt="Profile"
        />
      </div>
    </section>
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
            I'm a passionate XR and Game Developer specializing in Unity, Unreal Engine 5, VR, and AR.
            I build interactive systems, immersive experiences, and real-time simulations that bridge
            virtual environments with real-world applications.
          </p>
          <div className="contactLine"><Mail size={16} /> uzair12ahmad34@gmail.com</div>
          <div className="contactLine"><Phone size={16} /> +92-3341574422</div>
          <div className="contactLine"><MapPin size={16} /> Islamabad, Pakistan</div>
        </div>
        <Stat icon={<Briefcase />} value="3+" label="Years Experience" />
        <Stat icon={<Code2 />} value="20+" label="Projects Completed" />
        <Stat icon={<User />} value="10+" label="Happy Clients" />
        <Stat icon={<Cpu />} value="24/7" label="Support" />
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

function Portfolio() {
  return (
    <section id="portfolio" className="section portfolio">
      <p className="label">PORTFOLIO</p>
      <h2 className="sectionTitle">Portfolio <span>Projects</span></h2>
      <div className="projectGrid">
        {portfolioProjects.map((project) => (
          <article className="projectCard" key={project.title}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="section featured">
      <p className="label">FEATURED</p>
      <h2 className="sectionTitle">Featured <span>Projects</span></h2>
      <div className="videoGrid">
        {featuredProjects.map((project) => (
          <article className="videoCard" key={project.title}>
            <div className="videoBox">
              <video controls poster="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=900&auto=format&fit=crop">
                <source src={project.video} type="video/mp4" />
              </video>
              <PlayCircle className="playIcon" />
            </div>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <h2 className="sectionTitle">Contact <span>Me</span></h2>
      <form className="contactForm" onSubmit={(e) => e.preventDefault()}>
        <div className="inputGroup">
          <input placeholder="Full Name" />
          <input placeholder="E-mail id" />
          <input placeholder="Phone Number" />
          <input placeholder="Subject" />
        </div>
        <div className="messageGroup">
          <textarea placeholder="Your Message" />
          <button className="btn primary" type="submit"><Send size={16} /> Send Message</button>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <Socials />
      <div className="footerLinks">
        <a href="#home">Home</a>
        <a href="#about">About Me</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </div>
      <p>© Uzair Ahmad Mirza | All Rights Reserved</p>
    </footer>
  );
}

function Socials() {
  return (
    <div className="socials">
      <a href="https://linkedin.com/in/uzair-ahmad-mirza-b939a21a2" target="_blank"><FaLinkedin size={20} /></a>
      <a href="https://github.com/uzair045678" target="_blank"><FaGithub size={20} /></a>
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
.section { padding: 90px 12%; }
.label { color: var(--cyan); letter-spacing: 3px; font-size: 12px; text-align: center; margin: 0 0 8px; }
.sectionTitle { text-align: center; font-size: clamp(36px, 5vw, 64px); margin: 0 0 55px; line-height: 1; }
.sectionTitle span, .logo span, .hero h1 span, .hero h2 span { color: var(--cyan); text-shadow: 0 0 30px rgba(0,255,240,.55); }
.navbar { position: sticky; top: 0; z-index: 20; display: flex; justify-content: space-between; align-items: center; padding: 24px 12%; background: rgba(0,0,0,.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,.05); }
.logo { font-size: 28px; font-weight: 800; }
nav { display: flex; gap: 34px; }
nav a { font-size: 15px; transition: .3s; }
nav a:hover { color: var(--cyan); }
.hero { min-height: 88vh; display: grid; grid-template-columns: 1.05fr .95fr; gap: 80px; align-items: center; }
.hero h1 { font-size: clamp(44px, 6vw, 78px); margin: 0; }
.hero h2 { font-size: clamp(26px, 4vw, 42px); margin: 8px 0 20px; }
.hero p { max-width: 650px; color: var(--text); line-height: 1.8; font-weight: 600; }
.heroImageWrap { justify-self: center; width: min(430px, 82vw); aspect-ratio: 1; border-radius: 50%; padding: 7px; background: var(--cyan); box-shadow: 0 0 38px rgba(0,255,240,.7); }
.heroImage { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }
.socials { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin: 28px 0; }
.socials a { width: 42px; height: 42px; display: grid; place-items: center; border: 1.5px solid var(--cyan); border-radius: 50%; color: var(--cyan); transition: .3s; }
.socials a:hover { background: var(--cyan); color: #000; box-shadow: 0 0 25px var(--cyan); transform: translateY(-4px); }
.buttons { display: flex; gap: 14px; flex-wrap: wrap; }
.btn { border: 1px solid var(--cyan); border-radius: 999px; padding: 13px 28px; font-weight: 800; letter-spacing: 1px; display: inline-flex; gap: 8px; align-items: center; justify-content: center; cursor: pointer; }
.primary { background: var(--cyan); color: #000; box-shadow: 0 0 25px rgba(0,255,240,.65); }
.outline { color: var(--cyan); background: transparent; }
.about { background: #080808; }
.aboutGrid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 22px; max-width: 1050px; margin: auto; }
.aboutCard, .stat, .skillCard, .projectCard, .videoCard { background: linear-gradient(145deg, var(--card), #0b0b0b); border: 1px solid rgba(255,255,255,.1); border-radius: 16px; }
.aboutCard.large { grid-row: span 2; padding: 32px; }
.aboutCard p { color: var(--muted); line-height: 1.8; }
.contactLine { margin-top: 16px; padding: 12px 14px; background: var(--card2); border-radius: 8px; color: var(--muted); display: flex; gap: 10px; align-items: center; font-size: 14px; }
.contactLine svg { color: var(--cyan); }
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
.projectGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.projectCard, .videoCard { padding: 24px; transition: .3s; }
.projectCard:hover, .videoCard:hover { transform: translateY(-8px); border-color: var(--border); box-shadow: 0 0 25px rgba(0,255,240,.12); }
.projectCard img { width: 100%; height: 190px; object-fit: cover; border-radius: 12px; border: 1px solid var(--border); }
.projectCard h3, .videoCard h3 { font-size: 22px; margin: 18px 0 8px; }
.projectCard p, .videoCard p { color: var(--muted); line-height: 1.6; }
.featured { background: radial-gradient(circle at center, rgba(0,255,240,.06), transparent 45%), #050505; }
.videoGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.videoBox { position: relative; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); }
.videoBox video { width: 100%; height: 210px; object-fit: cover; display: block; filter: brightness(.82); }
.playIcon { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: white; opacity: .6; pointer-events: none; }
.contact { background: #050505; }
.contactForm { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; max-width: 1050px; margin: auto; }
.inputGroup { display: grid; gap: 22px; }
input, textarea { width: 100%; background: #121212; color: white; border: 1.5px solid var(--cyan); border-radius: 18px; padding: 22px; font-size: 16px; outline: none; }
textarea { min-height: 248px; resize: vertical; }
.messageGroup { display: grid; gap: 26px; justify-items: center; }
footer { background: #111; text-align: center; padding: 40px 12%; }
footer .socials { justify-content: center; margin-top: 0; }
.footerLinks { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; margin: 24px 0 34px; }
footer p { margin: 0; }
@media (max-width: 980px) {
  .navbar { padding: 18px 6%; flex-direction: column; gap: 18px; }
  nav { gap: 18px; flex-wrap: wrap; justify-content: center; }
  .section { padding: 70px 6%; }
  .hero { grid-template-columns: 1fr; text-align: center; gap: 45px; }
  .heroText p { margin-inline: auto; }
  .socials, .buttons { justify-content: center; }
  .aboutGrid, .skillsGrid, .projectGrid, .videoGrid, .contactForm { grid-template-columns: 1fr; }
  .aboutCard.large { grid-row: auto; }
}
@media (max-width: 560px) {
  nav a { font-size: 14px; }
  .logo { font-size: 24px; }
  .sectionTitle { margin-bottom: 35px; }
  .heroImageWrap { width: 280px; }
  input, textarea { border-radius: 14px; padding: 18px; }
}
`;
