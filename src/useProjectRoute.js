import { useCallback, useEffect, useState } from "react";
import { getProject, isValidSlug } from "./projects.js";

/**
 * Hash-based project routing.
 *
 * Only `#/project/<slug>` is treated as a route. Every other hash
 * (`#home`, `#about`, ...) belongs to the existing smooth-scroll anchors and
 * is deliberately left alone, so navbar links and the modal can share the
 * hash namespace without fighting each other.
 *
 * TODO: switch to clean `/project/<slug>/` paths. That needs a per-project
 * prerender step in prerender.mjs plus a dist/404.html SPA fallback, because
 * GitHub Pages serves static files with no rewrite rule.
 */
const ROUTE_PATTERN = /^#\/project\/([a-z0-9-]+)\/?$/;

const urlWithoutHash = () =>
  window.location.pathname + window.location.search;

function readSlugFromLocation() {
  const match = ROUTE_PATTERN.exec(window.location.hash);
  if (!match) return null;
  const slug = match[1];
  return isValidSlug(slug) && getProject(slug) ? slug : null;
}

export default function useProjectRoute() {
  // Starts null on purpose: the prerendered HTML in dist/index.html is built
  // without a route, so reading the hash during render would break hydration.
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    const sync = () => setActiveSlug(readSlugFromLocation());
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const openProject = useCallback((slug) => {
    if (!getProject(slug)) return;
    const previous = window.history.state;
    // Each open pushes its own entry so browser Back/Forward can walk the
    // projects. `depth` and `origin` let close rewind the whole chain in one
    // step instead of landing on the previously viewed project.
    const inChain = previous?.projectModal === true;
    // pushState does not emit hashchange, so update state directly.
    window.history.pushState(
      {
        projectModal: true,
        depth: inChain ? previous.depth + 1 : 1,
        origin: inChain ? previous.origin : window.location.hash,
      },
      "",
      `${urlWithoutHash()}#/project/${slug}`,
    );
    setActiveSlug(slug);
  }, []);

  const closeProject = useCallback(() => {
    const state = window.history.state;
    if (state?.projectModal) {
      // Rewind to the hash the user was on before the first project opened.
      // popstate/hashchange then sync activeSlug back to null.
      window.history.go(-state.depth);
      return;
    }
    setActiveSlug(null);
    if (ROUTE_PATTERN.test(window.location.hash)) {
      window.history.replaceState(null, "", urlWithoutHash());
    }
  }, []);

  return {
    activeSlug,
    activeProject: activeSlug ? getProject(activeSlug) : null,
    openProject,
    closeProject,
  };
}