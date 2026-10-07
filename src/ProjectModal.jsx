import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import LazyVideo from "./LazyVideo.jsx";
import { projectList } from "./projects.js";

function Section({ title, children }) {
  return (
    <section className="modalSection">
      <h3 className="modalSectionTitle">{title}</h3>
      {children}
    </section>
  );
}

function LinkList({ links }) {
  return (
    <div className="modalLinks">
      {links.map(({ label, url }) => {
        const Icon = url.includes("play.google.com") ? FaGooglePlay : ExternalLink;
        return (
          <a key={url} className="modalLink" href={url} target="_blank" rel="noopener noreferrer">
            <Icon aria-hidden="true" /> {label}
          </a>
        );
      })}
    </div>
  );
}

function ModalBody({ project, onClose, onNavigate }) {
  const reduceMotion = useReducedMotion();

  const index = projectList.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projectList[index - 1] : null;
  const next = index >= 0 && index < projectList.length - 1 ? projectList[index + 1] : null;

  return (
    <motion.div
      className="modalBackdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="modalPanel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modalTitle-${project.slug}`}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modalClose" type="button" onClick={onClose} aria-label="Close project details">
          <X aria-hidden="true" />
        </button>

        <div className="modalScroll">
          <header className="modalHeader">
            <h2 id={`modalTitle-${project.slug}`}>{project.title}</h2>
            <p className="modalDesc">{project.details || project.desc}</p>
            {project.tags?.length ? (
              <div className="tags" aria-label="Project technologies">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            ) : null}
          </header>

          <div className="modalHero">
            {project.video ? (
              <LazyVideo src={project.video} poster={project.image} title={project.title} />
            ) : project.image ? (
              <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
            ) : null}
          </div>

          {project.problem ? (
            <Section title="Problem"><p>{project.problem}</p></Section>
          ) : null}

          {project.features?.length ? (
            <Section title="Features">
              <ul className="modalList">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </Section>
          ) : null}

          {project.contribution ? (
            <Section title="My Contribution"><p>{project.contribution}</p></Section>
          ) : null}
          {project.challenges ? (
            <Section title="Challenges"><p>{project.challenges}</p></Section>
          ) : null}
          {project.results ? (
            <Section title="Results"><p>{project.results}</p></Section>
          ) : null}

          {project.media?.length ? (
            <Section title="Media">
              <div className="modalGallery">
                {project.media.map((item) => (
                  <figure key={item.src} className="modalFigure">
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        controls
                        playsInline
                        preload="none"
                        poster={item.poster}
                        aria-label={item.alt || project.title}
                      />
                    ) : (
                      <img src={item.src} alt={item.alt || project.title} loading="lazy" decoding="async" />
                    )}
                    {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </Section>
          ) : null}

          {project.links?.length ? (
            <Section title="Links"><LinkList links={project.links} /></Section>
          ) : null}

          <nav className="modalNav" aria-label="Project navigation">
            {previous ? (
              <button className="modalNavBtn" type="button" onClick={() => onNavigate(previous.slug)}>
                <ChevronLeft aria-hidden="true" />
                <span><small>Previous</small>{previous.title}</span>
              </button>
            ) : <span />}
            {next ? (
              <button className="modalNavBtn next" type="button" onClick={() => onNavigate(next.slug)}>
                <span><small>Next</small>{next.title}</span>
                <ChevronRight aria-hidden="true" />
              </button>
            ) : <span />}
          </nav>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectModal({ project, onClose, onNavigate }) {
  // Portalled to <body> so the sticky navbar's backdrop-filter cannot become a
  // containing block for the fixed overlay. Resolved in the state initializer
  // rather than an effect: it is null during prerendering (no `document`) and
  // available on the very first client render, so there is no setState-in-
  // effect cascade and nothing extra lands in the server-rendered markup.
  const [container] = useState(() =>
    typeof document === "undefined" ? null : document.body,
  );

  const isOpen = Boolean(project);

  // Scroll lock, Escape and the focus trap are owned here rather than in
  // ModalBody. AnimatePresence briefly mounts the outgoing and incoming
  // project at the same time while prev/next crossfades, so per-body
  // instances would fight over body.style.overflow and fire closeProject
  // twice for a single keypress.
  useEffect(() => {
    if (!isOpen) return undefined;

    // The entering panel is the last one in the DOM while a crossfade runs.
    const activePanel = () => {
      const panels = document.querySelectorAll(".modalPanel");
      return panels[panels.length - 1] ?? null;
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = activePanel()?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const previouslyFocused = document.activeElement;
    const frame = requestAnimationFrame(() => {
      activePanel()?.querySelector(".modalClose")?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isOpen, onClose]);

  if (!container) return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <ModalBody key={project.slug} project={project} onClose={onClose} onNavigate={onNavigate} />
      ) : null}
    </AnimatePresence>,
    container,
  );
}
