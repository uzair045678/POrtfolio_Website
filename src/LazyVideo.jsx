import { useEffect, useRef, useState } from "react";
import { PlayCircle } from "lucide-react";

/**
 * Click-to-play video. Nothing is fetched until the placeholder is near the
 * viewport, and playback only starts on an explicit user request, so no video
 * is ever preloaded.
 */
export default function LazyVideo({ src, poster, title }) {
  const placeholderRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);

  useEffect(() => {
    const element = placeholderRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const requestPlayback = () => {
    setIsNearViewport(true);
    setPlayRequested(true);
  };

  if (playRequested && isNearViewport) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        preload="metadata"
        aria-label={`${title} video`}
      />
    );
  }

  return (
    <button
      ref={placeholderRef}
      className="videoPlaceholder"
      type="button"
      aria-label={`Play ${title} video`}
      onClick={requestPlayback}
    >
      <img src={poster} alt="" className="videoThumb" loading="lazy" decoding="async" fetchPriority="low" />
      <PlayCircle className="playIcon" aria-hidden="true" />
    </button>
  );
}
