import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const base = import.meta.env.BASE_URL || "/";
const AvatarScene = lazy(() => import("./HeroAvatar.jsx"));

function Socials() {
  return (
    <div className="socials">
      <a href="https://linkedin.com/in/uzair-ahmad-mirza-b939a21a2" target="_blank" rel="noopener noreferrer" aria-label="Uzair Ahmad Mirza on LinkedIn"><FaLinkedin size={20} aria-hidden="true" /></a>
      <a href="https://github.com/uzair045678" target="_blank" rel="noopener noreferrer" aria-label="Uzair Ahmad Mirza on GitHub"><FaGithub size={20} aria-hidden="true" /></a>
    </div>
  );
}

const roles = ["XR Developer", "Unity Developer", "Unreal Engine Developer", "AR/VR Engineer"];

function useTypingRole() {
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let roleIndex = 0;
    let charCount = roles[0].length;
    let deleting = false;
    let timerId;

    const tick = () => {
      const current = roles[roleIndex];

      if (!deleting) {
        charCount += 1;
        setText(current.slice(0, charCount));
        if (charCount >= current.length) {
          deleting = true;
          timerId = window.setTimeout(tick, 2000);
          return;
        }
        timerId = window.setTimeout(tick, 90);
      } else {
        charCount -= 1;
        setText(current.slice(0, charCount));
        if (charCount <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          timerId = window.setTimeout(tick, 400);
          return;
        }
        timerId = window.setTimeout(tick, 45);
      }
    };

    timerId = window.setTimeout(tick, 2000);
    return () => window.clearTimeout(timerId);
  }, []);

  return text;
}

export default function Hero() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  const typedRole = useTypingRole();
  const fallbackImg = base + "poster.webp";
  const handleModelLoaded = useCallback(() => setModelLoaded(true), []);

  useEffect(() => {
    let idleId;
    let timeoutId;
    let delayId;

    const loadModelWhenIdle = () => {
      delayId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(() => setShouldLoadModel(true), { timeout: 2500 });
        } else {
          timeoutId = window.setTimeout(() => setShouldLoadModel(true), 500);
        }
      }, 2000);
    };

    if (document.readyState === "complete") {
      loadModelWhenIdle();
    } else {
      window.addEventListener("load", loadModelWhenIdle, { once: true });
    }

    return () => {
      window.removeEventListener("load", loadModelWhenIdle);
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (delayId !== undefined) window.clearTimeout(delayId);
    };
  }, []);

  return (
    <section id="home" className="hero section">
      <div className="heroText">
        <h1>Hi, it's <span>Uzair Ahmad Mirza</span></h1>
        <h2>I'm an <span>{typedRole}</span><span className="typeCursor" aria-hidden="true">|</span></h2>
        <p>
          I am a problem solver,  I build immersive AR, VR, XR, and real-time interactive experiences using Unity,
          Unreal Engine, C#, C++, and modern gameplay systems. I specialize in VR/AR applications,
          interactive simulations, and real-world XR solutions that bridge virtual environments with practical applications.
        </p>
        <Socials />
        <div className="buttons">
          <a className="btn primary" href="https://drive.google.com/file/d/1SFvy9tz3M3zbPICQiOPr3EyrsOMCE05q/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Check my CV</a>
          <a className="btn outline" href="#contact">Contact Me</a>
        </div>
      </div>
      <div className="heroImageWrap">
        <span className="openToWorkBadge">
          <span className="openToWorkDot" aria-hidden="true" />
          Open to Work
        </span>
        <div className="heroCanvasWrap" role="img" aria-label="Animated 3D avatar of Uzair Ahmad Mirza">
          <img className={`heroFallbackImg ${modelLoaded ? "loaded" : ""}`} src={fallbackImg} alt="" decoding="async" fetchPriority="high" />
          <div className={`heroCanvasInner ${modelLoaded ? "loaded" : ""}`}>
            {shouldLoadModel && (
              <Suspense fallback={null}>
                <AvatarScene onLoaded={handleModelLoaded} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
