const base = import.meta.env.BASE_URL || "/";

/**
 * Central project data for both the Featured and Portfolio sections and the
 * case-study modal. This is the only file you need to edit to change a
 * project's content — every card and modal reads from here.
 *
 * Required: slug, title, desc, tags, image
 *   desc  = short summary, shown on the card (clamped to 2 lines)
 *
 * Optional (each section is hidden when the field is absent):
 *   video         = modal hero video, defaults to the `image` poster
 *   details       = long description for the modal; falls back to `desc`
 *   problem       = the problem / use case
 *   features      = array of feature strings, rendered as a list
 *   contribution  = what you specifically built
 *   challenges    = what was hard
 *   results       = measurable outcome
 *   media         = extra images/videos, shown in the modal ONLY
 *   links         = [{ label, url }] external links
 *
 * Media paths must use `base + "..."` so the GitHub Pages sub-path resolves.
 */
const projects = [
  
  /*
  {
    slug: "scratch-verify-entry",
    title: "SCRATCH VERIFY ENTRY",
    desc: "SCRATCH SHORT DESC",
    details: "SCRATCH LONG DETAILS TEXT that is deliberately much longer than the short card description so we can confirm the modal prefers details over desc when both are present.",
    problem: "SCRATCH PROBLEM",
    features: ["SCRATCH FEATURE ONE", "SCRATCH FEATURE TWO", "SCRATCH FEATURE THREE"],
    media: [
      { src: base + "images/homecare-vr.webp", alt: "scratch a", caption: "SCRATCH CAPTION" },
    ],
    links: [{ label: "SCRATCH LINK", url: "https://example.com" }],
    image: base + "images/homecare-vr.webp",
    tags: ["Scratch"],
  },
  */
  {
    slug: "homecare-safety-vr",
    title: "HomeCare Safety VR Simulator",
    desc: "Unity VR simulator with Convai integration for interactive home safety hazard detection and AI training.",
    image: base + "images/homecare-vr.webp",
    video: base + "videos/HomeCare_Safety_VR_3.mp4",
    tags: ["Unity", "VR", "AI"],
  },
  {
    slug: "multiplayer-helicopter-simulator",
    title: "Multiplayer Helicopter Simulator (Unreal Engine 5)",
    desc: "UE5 multiplayer VR helicopter simulator with server-authoritative flight controls and realistic physics. I also implemented player seat assignment, detachment, and ownership transfer from pilot to co-pilot using C++ and Blueprints.",
    contribution: "Implemented player seat assignment, detachment, and ownership transfer from pilot to co-pilot using C++ and Blueprints.",
    image: base + "images/helicopter.webp",
    video: base + "videos/Helicopter_Simulator_3.mp4",
    tags: ["Unreal Engine", "VR", "Multiplayer"],
  },
  {
    slug: "immersive-mecanno-vr",
    title: "Immersive Mecanno VR (FYP)",
    desc: "Mobile + VR app for assembling and disassembling LEGO/Mecanno models with snapping mechanics.",
    image: base + "images/mecano-vr.webp",
    video: base + "videos/Immersive_Mecanno_VR_2.mp4",
    tags: ["Unity", "VR"],
  },
  {
    slug: "endless-runner-ue5",
    title: "Endless Runner Game (Unreal Engine 5)",
    desc: "UE5 endless runner with dynamic obstacle generation and power-ups.",
    image: base + "images/runner-game.webp",
    video: base + "videos/EndlessRunnerGame_2.mp4",
    tags: ["Unreal Engine", "Games"],
  },
  {
    slug: "ar-media-platform",
    title: "AR Media Platform",
    desc: "Dynamic image target recognition platform with cloud-backed recognition and OpenCV-based validation. Users can upload AR image targets at runtime and choose the content rendered on them (currently supports video).",
    image: base + "images/ar-media-platform.webp",
    tags: ["Unity", "AR"],
  },
  {
    slug: "homecare-safety-vr",
    title: "HomeCare Safety VR Simulator",
    desc: "Unity VR simulator with Convai integration for interactive home safety hazard detection and AI training.",
    image: base + "images/homecare-vr.webp",
    video: base + "videos/HomeCare_Safety_VR_3.mp4",
    tags: ["Unity", "VR", "AI"],
  },
  {
    slug: "ar-measurement-app",
    title: "AR Measurement App",
    desc: "AR app that uses plane detection and spatial mapping to measure real-world objects and distances with high accuracy.",
    image: base + "images/ar-measurement-app.webp",
    tags: ["Unity", "AR"],
  },
  {
    slug: "ar-portfolio-contact-card",
    title: "AR Portfolio Contact Card",
    desc: "Scannable AR contact card overlaying 3D portfolio content for interactive networking.",
    image: base + "images/ar-contact-card.webp",
    tags: ["Unity", "AR"],
  },
  {
    slug: "ar-weather-app",
    title: "AR Weather App",
    desc: "Fetches weather via API and displays it in an interactive AR interface with 3D weather models.",
    image: base + "images/ar-weather.webp",
    tags: ["Unity", "AR"],
  },
  {
    slug: "webar-object-placement",
    title: "Web AR Object Placement",
    desc: "WebAR-based system for interactive 3D model placement using plane detection with WebXR.",
    image: base + "images/webar-object-placement.webp",
    tags: ["AR"],
  },
  {
    slug: "robosync-robot-telemetry",
    title: "RoboSync — Real-Time Robot Control & Telemetry System",
    desc: "Unity-based PC application for controlling Arduino robots, synchronizing live battle telemetry, supporting local multiplayer through Mirror Networking, and integrating Firebase Realtime Database for communication between physical robots and the application.",
    image: base + "images/robot-simulation.webp",
    tags: ["Unity", "Multiplayer", "Simulation"],
  },
  {
    slug: "color-connect-line-puzzle",
    title: "Color Connect – Line Puzzle",
    desc: "Android puzzle game with 10k+ downloads, optimized load times by 20% with Unity Ads and Firebase Analytics.",
    results: "10k+ downloads on Google Play, with load times optimized by 20% using Unity Ads and Firebase Analytics.",
    image: base + "images/color-connect.webp",
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.XRDigital.DotConnect" },
    ],
    tags: ["Unity", "Mobile", "Games"],
  },
  {
    slug: "ricochet-monster",
    title: "Ricochet Monster Mobile Game",
    desc: "Maintained live mobile games across Android/iOS with Unity Ads, AdMob, Firebase Analytics.",
    image: base + "images/ricochet-monster.webp",
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.DefaultCompany.Monster2" },
    ],
    tags: ["Unity", "Mobile", "Games"],
  },
  {
    slug: "mob-rushers",
    title: "Mob Rushers Mobile Game",
    desc: "Maintained live mobile games across Android/iOS with Unity Ads, AdMob, Firebase Analytics.",
    image: base + "images/mob-rushers.webp",
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.DefaultCompany.RunnerClash" },
    ],
    tags: ["Unity", "Mobile", "Games"],
  },
];

const featured = [
  {
    slug: "homecare-safety-vr",
    title: "HomeCare Safety VR Simulator",
    desc: "Unity VR simulator with Convai integration for interactive home safety hazard detection and AI training.",
    image: base + "images/homecare-vr.webp",
    video: base + "videos/HomeCare_Safety_VR_3.mp4",
    tags: ["Unity", "VR", "AI"],
  },
  {
    slug: "robosync-robot-telemetry",
    title: "RoboSync — Real-Time Robot Control & Telemetry",
    desc: "Unity PC app for controlling Arduino robots with live battle telemetry, Mirror Networking multiplayer, and Firebase integration.",
    image: base + "images/robot-simulation.webp",
    tags: ["Unity", "Multiplayer", "Simulation"],
  },
  {
    slug: "ar-media-platform",
    title: "AR Media Platform",
    desc: "Dynamic image target recognition platform with cloud-backed recognition and OpenCV-based validation. Users can upload AR image targets at runtime and choose the content rendered on them (currently supports video).",
    image: base + "images/ar-media-platform.webp",
    tags: ["Unity", "AR"],
  },
];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const isValidSlug = (slug) =>
  typeof slug === "string" && SLUG_PATTERN.test(slug);

/** First definition wins, so a repeated slug cannot shadow another project. */
const bySlug = new Map();
for (const project of projects) {
  if (!bySlug.has(project.slug)) bySlug.set(project.slug, project);
}

/** Unique, original grid order — drives previous/next navigation. */
export const projectList = [...bySlug.values()];

export const featuredProjects = featured;

export const getProject = (slug) => bySlug.get(slug) ?? null;
