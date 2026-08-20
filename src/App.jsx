/* ============================================================================
   GroundAI — Landing Page (High-Contrast Dynamic Production Build)
   React · Tailwind CSS · Framer Motion · Lucide
   Local assets: /public/assets/{hero,sculpture,portrait,avatar,moss}.jpg
============================================================================ */
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Send,
  Globe,
  Play,
  Check,
  Sparkles,
} from "lucide-react";

/* ----------------------------- Assets ------------------------------------ */
const IMG = {
  hero: "/assets/hero.jpg",
  sculpture: "/assets/sculpture.jpg",
  portrait: "/assets/portrait.jpg",
  avatar: "/assets/avatar.jpg",
  moss: "/assets/moss.jpg",
};

/* ------------------------- Motion physics matrix -------------------------- */
const EASE = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 380, damping: 28 };
const ELASTIC = { type: "spring", stiffness: 450, damping: 18 };
const HOVER_SPRING = { type: "spring", stiffness: 400, damping: 25 };

/* ----------------------- Global styles / shaders -------------------------- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap');
    .ga-sans { font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
    .ga-serif {
      font-family: "Instrument Serif", Georgia, serif;
      font-style: italic;
      font-weight: 400;
      letter-spacing: 0.012em;
      font-synthesis: none;
      text-rendering: optimizeLegibility;
    }
    @keyframes ga-marquee { to { transform: translateX(-50%); } }
    .ga-marquee { animation: ga-marquee 36s linear infinite; will-change: transform; }
    .ga-marquee:hover { animation-play-state: paused; }
    @keyframes ga-shimmer { 100% { transform: translateX(100%); } }
    .ga-shimmer { position: relative; overflow: hidden; }
    .ga-shimmer::after {
      content: ""; position: absolute; inset: 0; transform: translateX(-100%);
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
      animation: ga-shimmer 2.4s ease-in-out infinite;
    }
    @keyframes ga-ripple { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.9); opacity: 0; } }
    .ga-ripple { animation: none; }
    .group:hover .ga-ripple { animation: ga-ripple 1.3s ease-out infinite; }
    ::selection { background: #171717; color: #fff; }
  `}</style>
);

/* ------------------------- 4-petal blossom mark --------------------------- */
const Blossom = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    {[45, 135, 225, 315].map((a) => (
      <ellipse key={a} cx="12" cy="7" rx="4.2" ry="5.4" transform={`rotate(${a} 12 12)`} />
    ))}
  </svg>
);

/* ---------------------------- Brand logomarks ----------------------------- */
const BrandMark = ({ name, className = "h-5 w-5" }) => {
  const s = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "GroundAI": return <Blossom className={className} />;
    case "Wids":     return <svg viewBox="0 0 24 24" className={className} {...s} strokeWidth="2.6"><path d="M3 7l4 11 4-9 4 9 4-11" /></svg>;
    case "Orinya":   return <svg viewBox="0 0 24 24" className={className} {...s} strokeWidth="5"><circle cx="12" cy="12" r="7.5" strokeDasharray="36 11" transform="rotate(-90 12 12)" /></svg>;
    case "Xyreion":  return <svg viewBox="0 0 24 24" className={className} {...s} strokeWidth="4.2"><path d="M12 4v16M4 12h16" /></svg>;
    case "Skodia":   return <svg viewBox="0 0 24 24" className={className} {...s} strokeWidth="2.2"><circle cx="12" r="8.5" /><path d="M8.5 13.5l5-5M10.5 15.5l5-5" /></svg>;
    case "GreenF":   return <svg viewBox="0 0 24 24" className={className} {...s} strokeWidth="3"><path d="M12 4v16M5.2 8l13.6 8M18.8 8L5.2 16" /></svg>;
    case "Nueral":   return <svg viewBox="0 0 24 24" className={className} {...s} strokeWidth="3"><path d="M4 18L10 6M10 18L16 6M16 18L22 6" /></svg>;
    default:         return null;
  }
};

/* ------------------------------ Count-up stat ----------------------------- */
const CountUp = ({ end, decimals = 0, suffix = "", duration = 1.8 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, end, decimals, suffix, duration]);
  return <span ref={ref}>{(0).toFixed(decimals)}{suffix}</span>;
};

/* ------------------------------ 3D hover tilt ----------------------------- */
const Tilt = ({ children, className = "" }) => {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 25 });
  const sry = useSpring(ry, { stiffness: 300, damping: 25 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------- Reveal wrap ------------------------------ */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* ============================================================================
   A. HERO
============================================================================ */
const Hero = ({ loaded }) => {
  const glass = "border border-white/25 bg-black/20 backdrop-blur-xl shadow-lg";

  return (
    <header className="relative h-[88vh] max-h-[900px] min-h-[680px] overflow-hidden rounded-[32px]">
      <motion.img
        src={IMG.hero}
        alt="Sand-toned concrete colonnade with grass and wildflowers"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: loaded ? 1 : 1.08 }}
        transition={{ duration: 2.2, ease: EASE }}
      />
      <div className="absolute inset-0 bg-[#c9b39a]/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />

      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="preloader"
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#EAE8E3]"
            exit={{ scale: 1.25, opacity: 0, filter: "blur(20px)", transition: { duration: 0.8, ease: EASE } }}
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0, filter: "blur(16px)" }}
              animate={{
                scale: [0.3, 1.15, 1],
                opacity: [0, 1, 1],
                filter: ["blur(16px)", "blur(0px)", "blur(0px)"],
              }}
              transition={{ duration: 1.2, times: [0, 0.7, 1], ease: EASE }}
            >
              <Blossom className="h-16 w-16 text-[#171717] drop-shadow-xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0, y: -32 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className="relative z-10 flex items-center justify-between p-6 md:p-8"
      >
        <a href="#" className="flex items-center gap-2.5 text-white">
          <Blossom className="h-7 w-7" />
          <span className="text-lg font-semibold tracking-tight">GroundAI</span>
        </a>
        <div className={`hidden items-center gap-7 rounded-full py-2 pl-8 pr-2 md:flex ${glass}`}>
          {["Product", "Platform", "Customers", "Company"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] text-white/80 transition hover:text-white">
              {l}
            </a>
          ))}
          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.03 }}
            transition={HOVER_SPRING}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#171717] hover:bg-neutral-200 shadow-sm"
          >
            Login
          </motion.button>
        </div>
      </motion.nav>

      <div className="relative z-10 flex h-[68%] flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={loaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="max-w-4xl text-[44px] leading-[1.04] tracking-[-0.02em] text-white sm:text-[58px] md:text-[76px]"
        >
          Meet GroundAI.
          <br />
          <span className="ga-serif pr-1 font-normal">Redefine space</span> with
          <br />
          intelligent design
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ ...ELASTIC, delay: 0.45 }}
        >
          <motion.button
            type="button"
            whileHover={{ y: -3, scale: 1.02 }}
            transition={HOVER_SPRING}
            className="mt-9 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#171717] shadow-xl shadow-black/10 hover:shadow-2xl"
          >
            Start free decoration
          </motion.button>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        className="absolute bottom-8 left-8 z-10 max-w-sm text-sm font-medium leading-relaxed text-white/90 drop-shadow-md"
      >
        It helps you imagine, plan, and refine spaces through natural conversations.
        From choosing colors and layouts to suggesting furniture and décor, it adapts to your taste.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, x: 24, y: 24 }}
        animate={loaded ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-end gap-3"
      >
        <span className={`rounded-full px-6 py-3.5 text-sm font-medium text-white ${glass}`}>
          Solutions for complex spaces
        </span>
        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            aria-label="Open conversation"
            whileHover={{ rotate: 8, scale: 1.06 }}
            transition={HOVER_SPRING}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${glass}`}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.button>
          <span className={`rounded-full px-6 py-3.5 text-sm font-medium text-white ${glass}`}>
            Conversational &amp; Action
          </span>
        </div>
      </motion.div>
    </header>
  );
};

/* ============================================================================
   B. BRAND MARQUEE
============================================================================ */
const BRANDS = ["GroundAI", "Wids", "Orinya", "Xyreion", "Skodia", "GreenF", "Nueral"];

const LogoMarquee = () => (
  <Reveal className="pt-4">
    <h2 className="text-center text-2xl tracking-tight text-[#171717] md:text-3xl font-medium">
      Trusted by the <span className="ga-serif font-normal">leading brands</span>
    </h2>
    <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <div className="ga-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-24 pr-24">
            {BRANDS.map((b) => (
              <span key={b} className="flex items-center gap-2.5 text-xl font-medium text-neutral-400 transition hover:text-neutral-600">
                <BrandMark name={b} className="h-5 w-5" />
                {b}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

/* ============================================================================
   C. BENTO GRID (High-Contrast & Animated Depth)
============================================================================ */
const CHATS = [
  {
    name: "Mo",
    avatarRole: "Client",
    prompt: "My interior won't update, any ideas on how to use GroundAI?",
    aiPlan: "Re-scanning room volume. Applying Japandi minimal oak finishes & warm diffused backlight.",
    tags: ["Japandi", "Ambient Light", "Oak Wood"],
  },
  {
    name: "Ana",
    avatarRole: "Architect",
    prompt: "Can you restyle my studio toward warm minimalism with oak accents?",
    aiPlan: "Palette locked: Linen textures, matte travertine tile, and floating acoustic wall slats.",
    tags: ["Travertine", "Acoustic Slats", "Warm Earth"],
  },
  {
    name: "Kai",
    avatarRole: "Designer",
    prompt: "Suggest low-profile furniture for a compact sunlit reading nook.",
    aiPlan: "Curated: Bouclé low-slung lounge, brushed nickel swing lamp, and slim walnut console.",
    tags: ["Bouclé Lounge", "Slim Walnut", "Nordic Mood"],
  },
];

const ADAPT_ITEMS = [
  {
    t: "Style preference",
    b: "Modern minimalism, cozy comfort, or bold luxury — pick a direction or blend your own.",
    tags: ["Minimalism", "Warm Wood", "Brutalist"],
  },
  {
    t: "Room layout rules",
    b: "Set walls, openings and traffic-flow constraints the AI must always respect.",
    tags: ["Clear Pathways", "Natural Light", "Zone Split"],
  },
  {
    t: "Furniture & décor choices",
    b: "Whitelist the brands, materials and pieces you love; GroundAI designs around them.",
    tags: ["Herman Miller", "Custom Oak", "Flos Light"],
  },
];

const CHIPS_TOP = [
  { width: "74%", long: "75%", short: "50%", y: [0, -6, 0], duration: 5.2, delay: 0 },
  { width: "64%", long: "70%", short: "45%", y: [0, 5, 0], duration: 6.1, delay: 0.6 },
];
const CHIPS_BOTTOM = [
  { width: "68%", long: "66%", short: "40%", y: [0, -5, 0], duration: 5.7, delay: 0.3 },
  { width: "58%", long: "60%", short: "38%", y: [0, 6, 0], duration: 6.6, delay: 0.9 },
];

const GLASS_PILL =
  "flex items-center gap-3 rounded-full border border-white/50 bg-white/40 px-4 py-3 backdrop-blur-2xl shadow-xl shadow-black/5";

const SkeletonChip = ({ width, long, short, y, duration, delay }) => (
  <motion.div
    className={GLASS_PILL}
    style={{ width }}
    animate={{ y }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <span className="h-7 w-7 shrink-0 rounded-full bg-white/70 shadow-inner" />
    <span className="flex-1 space-y-1.5">
      <span className="ga-shimmer block h-1.5 rounded bg-neutral-800/60" style={{ width: long }} />
      <span className="ga-shimmer block h-1.5 rounded bg-neutral-800/35" style={{ width: short }} />
    </span>
  </motion.div>
);

const BentoGrid = () => {
  const [open, setOpen] = useState(0);
  const [chat, setChat] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = CHATS[chat];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setChat((c) => (c + 1) % CHATS.length), 4500);
    return () => clearTimeout(t);
  }, [chat, paused]);

  return (
    <Reveal className="mt-28">
      <h2 id="product" className="text-center text-4xl tracking-tight text-[#171717] md:text-5xl font-medium">
        <span className="ga-serif font-normal">Craft experiences</span> your
        <br />
        customers will remember
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {/* Card 1: Crisp Glassmorphism on Sculpture */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={HOVER_SPRING}
          className="relative h-[490px] overflow-hidden rounded-3xl bg-[#E6E1D8] shadow-2xl shadow-black/5 border border-white/40"
        >
          <img
            src={IMG.sculpture}
            alt="Sculptural flower-shaped cushion bench"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-white/20" />
          <div className="absolute inset-0 flex flex-col justify-center gap-3.5 p-6">
            {CHIPS_TOP.map((c, i) => (
              <SkeletonChip key={`t${i}`} {...c} />
            ))}

            <motion.div
              className="flex w-[96%] items-center gap-3.5 rounded-full border border-white/60 bg-[#7d756b]/95 px-4.5 py-4 backdrop-blur-2xl shadow-2xl"
              animate={{ y: [0, -4, 0], scale: [1, 1.01, 1] }}
              transition={{ duration: 5.5, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/35 shadow-inner">
                <Blossom className="h-5 w-5 text-white" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white tracking-wide">Rustic Wooden design</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-white/85">GroundAI choice</span>
              </span>
            </motion.div>

            {CHIPS_BOTTOM.map((c, i) => (
              <SkeletonChip key={`b${i}`} {...c} />
            ))}
          </div>
        </motion.div>

        {/* Card 2: Living Ambient Simulation Prompt Box */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={HOVER_SPRING}
          className="relative flex h-[490px] flex-col rounded-3xl bg-gradient-to-br from-neutral-900 via-[#181715] to-neutral-950 p-7 shadow-2xl shadow-black/25 justify-between border border-neutral-800/80 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Subtle Warm Amber Mesh Glow */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

          {/* Top Live Status Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                {paused ? "Paused" : "Neural Canvas Active"}
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">v3.4-live</span>
          </div>

          {/* Dynamic AI Dialogue Box */}
          <div className="relative z-10 my-auto space-y-3.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={chat}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={SPRING}
                className="space-y-3"
              >
                {/* User Bubble */}
                <div className="flex items-start gap-3 rounded-2xl bg-[#8c8479]/90 p-4.5 shadow-xl border border-white/10">
                  <img
                    src={IMG.avatar}
                    alt={`${active.name} avatar`}
                    loading="lazy"
                    className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-white/30"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="block text-xs font-bold text-white">{active.name}</span>
                      <span className="text-[10px] text-white/70 font-medium px-1.5 py-0.5 rounded bg-black/20">
                        {active.avatarRole}
                      </span>
                    </div>
                    <span className="mt-1 block text-[13px] font-medium leading-snug text-white/95">
                      {active.prompt}
                    </span>
                  </div>
                </div>

                {/* AI Plan Response */}
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>GroundAI Live Solution</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {active.aiPlan}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {active.tags.map((tg) => (
                      <span key={tg} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer + Manual Control Pills */}
          <div className="relative z-10 flex items-end justify-between pt-4 border-t border-white/10">
            <p className="text-xl font-medium leading-snug text-white">
              Engage and
              <br />
              delight customers
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              {CHATS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show conversation ${i + 1}`}
                  onClick={() => setChat(i)}
                  className={`rounded-full px-3 py-1 font-semibold transition-all cursor-pointer ${
                    chat === i
                      ? "bg-white text-[#171717] shadow-md scale-105"
                      : "bg-white/10 text-neutral-400 hover:text-white hover:bg-white/20"
                  }`}
                >
                  {chat === i ? `0${i + 1}` : i + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 3: Interactive Visual Accordion */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={HOVER_SPRING}
          className="flex h-[490px] flex-col rounded-3xl bg-[#8c8479] p-7 shadow-2xl shadow-black/10 justify-between"
        >
          <div>
            <h3 className="text-3xl font-medium tracking-tight text-white">
              It's completely
              <br />
              adaptable.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              Customize GroundAI to fit your style and needs—whether you want modern
              minimalism, cozy comfort, or bold luxury.
            </p>
          </div>

          <div className="space-y-3">
            {ADAPT_ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.t}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between rounded-2xl px-5 py-3.5 text-left text-sm font-semibold transition-all cursor-pointer ${
                      isOpen
                        ? "bg-white text-[#171717] shadow-xl"
                        : "bg-white/15 text-white/90 hover:bg-white/25"
                    }`}
                  >
                    <span>{item.t}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={ELASTIC} className="shrink-0">
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={SPRING}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pt-3 pb-1">
                          <p className="text-[13px] leading-relaxed text-white/90 font-normal">
                            {item.b}
                          </p>
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {item.tags.map((t) => (
                              <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/20 text-white/90">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
};

/* ============================================================================
   D. TESTIMONIAL CAROUSEL (Unified Editorial Layout)
============================================================================ */
const TESTIMONIALS = [
  {
    quote: "GroundAI completely changed how I approached redesigning my apartment. Instead of feeling overwhelmed with choices, It felt like having a designer by my side 24/7.",
    author: "Sophie Martinez.",
    role: "Homeowner & Interior Design Enthusiast",
    brand: "Skodia",
    audioLength: "0:42",
    badge: "⚡ 3x Faster Iterations",
  },
  {
    quote: "We now present three mood boards to clients before lunch. The conversational refinements are so precise that approvals happen in a single meeting.",
    author: "Liam Chen.",
    role: "Principal, Studio North",
    brand: "Wids",
    audioLength: "0:58",
    badge: "⚡ Approved in 1 Meeting",
  },
  {
    quote: "I staged twelve rental units without buying furniture first. GroundAI planned every room and the listings photographed beautifully.",
    author: "Amara Osei.",
    role: "Real-estate Developer",
    brand: "Orinya",
    audioLength: "0:34",
    badge: "⚡ 100% Lease Rate",
  },
  {
    quote: "It understood 'cozy but not cluttered' instantly. Every palette and piece felt like my taste, amplified — not a template.",
    author: "Maya Kade.",
    role: "Content Creator & Homeowner",
    brand: "GreenF",
    audioLength: "1:12",
    badge: "⚡ Viral Studio Reveal",
  },
];

const DynamicPortrait = ({ brand, badge }) => {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 300, damping: 25 });
  const sry = useSpring(ry, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    ry.set((x - 0.5) * 16);
    rx.set(-(y - 0.5) * 14);
    glareX.set(x * 100);
    glareY.set(y * 100);
  };

  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="flex w-full sm:w-64 flex-col gap-4">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        className="relative h-[340px] overflow-hidden rounded-[28px] shadow-2xl shadow-black/15 bg-neutral-900 cursor-pointer group"
      >
        <img
          src={IMG.portrait}
          alt="Client portrait"
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Metric Floating Tag */}
        <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/20">
          {badge}
        </div>

        {/* Dynamic Light Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-red-700/40 via-transparent to-orange-500/20 mix-blend-multiply pointer-events-none" />
      </motion.div>

      {/* Brand Pill Badge */}
      <div className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#EAE6DF] py-4 shadow-sm border border-neutral-300/60">
        <BrandMark name={brand} className="h-5 w-5 text-[#171717]" />
        <AnimatePresence mode="wait">
          <motion.span
            key={brand}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={SPRING}
            className="font-semibold text-sm tracking-wide text-[#171717]"
          >
            {brand}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const t = TESTIMONIALS[idx];

  useEffect(() => {
    if (isHovered || isPlaying) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [idx, isHovered, isPlaying]);

  return (
    <Reveal className="mt-28 grid items-stretch gap-8 md:grid-cols-[1.1fr_auto_1.8fr]">
      {/* Left Column: Heading + Progress Dots + Read More */}
      <div className="flex flex-col justify-between py-2">
        <div>
          <h3 id="customers" className="text-3xl font-medium tracking-tight text-[#171717] sm:text-4xl md:text-[40px] md:leading-[1.15]">
            GroundAI <br />
            <span className="ga-serif font-normal text-[44px]">changed my approach</span>
          </h3>

          {/* Interactive Progress Bar Dots */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mt-8 flex items-center gap-3"
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide to review ${i + 1}`}
                onClick={() => setIdx(i)}
                className="relative h-2 rounded-full overflow-hidden bg-neutral-300/80 cursor-pointer transition-all duration-300"
                style={{ width: idx === i ? 44 : 10 }}
              >
                {idx === i && !isHovered && !isPlaying && (
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.5, ease: "linear" }}
                    className="absolute inset-0 bg-[#171717] rounded-full"
                  />
                )}
                {idx === i && (isHovered || isPlaying) && (
                  <span className="absolute inset-0 bg-[#171717] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-10 md:pt-0 flex items-center gap-4">
          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={HOVER_SPRING}
            className="rounded-full bg-[#171717] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-black/10 hover:bg-black transition-colors"
          >
            Read More
          </motion.button>
        </div>
      </div>

      {/* Middle Column: Interactive 3D Glare Portrait */}
      <DynamicPortrait badge={t.badge} brand={t.brand} />

      {/* Right Column: Dynamic Quote Card + Audio Wave Simulator */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex min-h-[380px] flex-col justify-between rounded-[32px] bg-[#EAE6DF] p-8 md:p-12 shadow-xl shadow-black/5 border border-neutral-300/50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={SPRING}
            className="flex flex-1 flex-col justify-between"
          >
            <p className="text-2xl font-normal leading-[1.4] tracking-tight text-[#171717] md:text-[26px]">
              "{t.quote}"
            </p>

            <div className="pt-8 border-t border-neutral-300/60 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="ga-serif font-normal text-2xl md:text-3xl text-[#171717] tracking-tight">
                  {t.author}
                </p>
                <p className="mt-1 text-sm font-medium text-neutral-500">
                  {t.role}
                </p>
              </div>

              {/* Interactive Audio Waveform Simulator */}
              <motion.button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 rounded-full bg-white/80 px-4 py-2.5 border border-white shadow-sm backdrop-blur-md cursor-pointer shrink-0"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#171717] text-white">
                  <Play className={`h-2.5 w-2.5 ml-0.5 ${isPlaying ? "fill-white" : ""}`} />
                </span>
                <div className="flex items-center gap-1 h-4">
                  {[40, 90, 60, 100, 75, 45, 85].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={isPlaying ? { height: ["20%", `${h}%`, "30%"] } : { height: "30%" }}
                      transition={isPlaying ? { duration: 0.6, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" } : {}}
                      className="w-1 bg-[#171717] rounded-full"
                      style={{ height: `${h * 0.3}%` }}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-600">{t.audioLength}</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Reveal>
  );
};

/* ============================================================================
   E. KEY METRICS
============================================================================ */
const METRICS_DATA = {
  all: [
    { end: 99.6, decimals: 1, suffix: "%", label: "Design uptime", badge: "Rock solid" },
    { end: 296, decimals: 0, suffix: "+", label: "Projects guided", badge: "+24% YoY" },
    { end: 17, decimals: 0, suffix: "K", label: "Room layouts", badge: "+3.2k this mo" },
    { static: "24/7", label: "Global support", badge: "Instant AI" },
  ],
  month: [
    { end: 99.9, decimals: 1, suffix: "%", label: "Design uptime", badge: "Past 30 days" },
    { end: 48, decimals: 0, suffix: "+", label: "Projects guided", badge: "+18% MoM" },
    { end: 3.4, decimals: 1, suffix: "K", label: "Room layouts", badge: "High volume" },
    { static: "< 2s", label: "Avg Response", badge: "Real-time" },
  ],
};

const Metrics = () => {
  const [segment, setSegment] = useState("all");
  const stats = METRICS_DATA[segment];

  return (
    <Reveal className="mt-28 pt-20 border-t border-neutral-300/70 pb-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 border border-emerald-500/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-700 tracking-wide">Live Engine Telemetry</span>
          </div>

          <h3 className="text-3xl font-medium tracking-tight text-[#171717] md:text-[38px] md:leading-[1.18]">
            Plan, scale, <br />
            <span className="ga-serif font-normal text-[42px]">and personalize</span>
          </h3>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-[#EAE6DF] p-1.5 border border-neutral-300/60 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setSegment("all")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
              segment === "all" ? "bg-[#171717] text-white shadow-md" : "text-neutral-600 hover:text-[#171717]"
            }`}
          >
            All-Time Scale
          </button>
          <button
            type="button"
            onClick={() => setSegment("month")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
              segment === "month" ? "bg-[#171717] text-white shadow-md" : "text-neutral-600 hover:text-[#171717]"
            }`}
          >
            Past 30 Days
          </button>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={`${segment}-${s.label}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="border-l-2 border-[#171717]/20 pl-8 group cursor-default"
          >
            <span className="inline-block rounded-md bg-neutral-200/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-2 group-hover:bg-[#171717] group-hover:text-white transition-colors">
              {s.badge}
            </span>
            <p className="text-4xl font-medium tracking-tight text-[#171717] sm:text-5xl md:text-[56px] leading-none">
              {s.static ? s.static : <CountUp end={s.end} decimals={s.decimals || 0} suffix={s.suffix || ""} />}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <motion.button
          type="button"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={HOVER_SPRING}
          className="rounded-full bg-[#171717] px-9 py-4 text-sm font-semibold text-white shadow-xl shadow-black/15 hover:bg-black transition-colors"
        >
          Learn more
        </motion.button>
      </div>
    </Reveal>
  );
};

/* ============================================================================
   F. PRICING
============================================================================ */
const PLANS = [
  {
    name: "Starter",
    tag: "Test the power of AI design, explore layouts, and see what's possible.",
    price: "$0",
    sub: "Try GroundAI risk-free",
    cta: "Start with Free",
    dark: false,
    features: [
      "AI-powered mood boards",
      "Up to 3 active room designs",
      "Basic furniture & color suggestions",
      "Save up to 5 design iterations",
      "Email support",
    ],
  },
  {
    name: "Pro Designer",
    tag: "Built for homeowners & creators ready to design smarter and faster.",
    price: "$39",
    sub: "Cancel anytime, no lock-in",
    cta: "Start with Pro",
    dark: true,
    features: [
      "Unlimited rooms & projects",
      "Advanced AI layouts, styles, décor",
      "Furniture & brand catalogs integration",
      "Save unlimited design iterations",
      "Priority chat support",
    ],
  },
];

const Pricing = () => (
  <motion.section
    id="platform"
    initial={{ opacity: 0, y: 56 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1, ease: EASE }}
    className="rounded-[36px] bg-[#121210] p-8 md:p-16 text-white shadow-2xl my-8"
  >
    <h2 className="text-center text-4xl font-medium tracking-tight md:text-6xl">
      <span className="ga-serif font-normal">Designed to scale,</span> without
      <br />
      locking you in.
    </h2>

    <div className="mx-auto mt-16 max-w-5xl space-y-8">
      {PLANS.map((p) => (
        <motion.div
          key={p.name}
          whileHover={{ y: -4 }}
          transition={HOVER_SPRING}
          className={`grid gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-12 transition-all ${
            p.dark
              ? "bg-[#8C8479] text-white shadow-2xl"
              : "border border-white/15 bg-white/[0.03]"
          }`}
        >
          <div>
            <h3 className="text-3xl font-medium tracking-tight">{p.name}</h3>
            <p className={`mt-4 max-w-sm text-sm leading-relaxed ${p.dark ? "text-white/80" : "text-white/60"}`}>{p.tag}</p>
            <p className="mt-10">
              <span className="text-6xl font-medium tracking-tight">{p.price}</span>
              <span className={`ml-2 text-lg ${p.dark ? "text-white/80" : "text-white/50"}`}>/ month</span>
            </p>
            <p className={`mt-3 text-xs font-medium ${p.dark ? "text-white/80" : "text-white/60"}`}>{p.sub}</p>
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.02 }}
              transition={HOVER_SPRING}
              className={`mt-10 w-full max-w-sm rounded-xl py-4 text-sm font-semibold transition hover:-translate-y-0.5 shadow-lg ${
                p.dark ? "bg-white text-[#171717] hover:bg-neutral-100" : "bg-[#8C8479] text-white hover:bg-[#7a7268]"
              }`}
            >
              {p.cta}
            </motion.button>
          </div>
          <div className="md:pl-6 md:border-l md:border-white/10 flex flex-col justify-center">
            <p className={`text-xs uppercase tracking-widest font-semibold ${p.dark ? "text-white/80" : "text-white/50"}`}>Includes</p>
            <ul className="mt-6 space-y-4.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3.5 text-sm font-medium text-white/90">
                  <Blossom className={`h-4.5 w-4.5 shrink-0 ${p.dark ? "text-white/80" : "text-white/60"}`} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

/* ============================================================================
   G. FAQ + DUAL-LAYER FLOATING MOSS ISLAND
============================================================================ */
const FAQS = [
  { q: "How does GroundAI help with interior design?", a: "GroundAI converses with you naturally to understand your taste, then generates layouts, color palettes, furniture and décor suggestions in real time — refining every idea as you talk." },
  { q: "Can I use GroundAI for multiple rooms or just one project?", a: "Both. The free plan supports up to 3 active room designs, while Pro Designer unlocks unlimited rooms and projects across your home or studio." },
  { q: "Do I need design experience to use GroundAI?", a: "Not at all. If you can describe what you like, GroundAI can design with you. Professionals get advanced controls; beginners get guided suggestions." },
  { q: "What subscription plan should I choose as a homeowner?", a: "Start free to explore layouts and mood boards. When you're ready to design every room with advanced AI styles and catalogs, upgrade to Pro Designer for $39/month." },
];

const Faq = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="grid items-center gap-14 md:grid-cols-[1.4fr_1fr] py-16">
      <div>
        <h2 id="company" className="text-4xl font-medium tracking-tight text-[#171717] md:text-5xl">
          <span className="ga-serif font-normal">Frequently</span> Asked Questions
        </h2>
        <div className="mt-12 divide-y divide-neutral-200">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-6 text-left text-lg font-medium text-[#171717] transition hover:text-neutral-600 cursor-pointer"
                >
                  {f.q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={ELASTIC} className="text-neutral-500">
                    <Plus className="h-5 w-5" strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={SPRING}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-sm leading-relaxed text-neutral-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto flex w-full items-center justify-center py-6">
        <motion.div
          aria-hidden="true"
          className="absolute bottom-1 left-1/2 h-8 w-56 -translate-x-1/2 rounded-full bg-black/20 blur-2xl"
          animate={{ scaleX: [1, 0.82, 1], opacity: [0.65, 0.32, 0.65] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={IMG.moss}
          alt="Floating moss rock island with blooming wildflowers"
          loading="lazy"
          draggable={false}
          className="relative w-full max-w-[380px] object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.14)] select-none [mask-image:radial-gradient(72%_72%_at_50%_46%,black_58%,transparent_100%)]"
          animate={{ y: [0, -18, 0], rotate: [0, 1.6, -1.2, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

/* ============================================================================
   H. FINAL CTA + VIDEO FOOTER
============================================================================ */
const FinalCta = () => (
  <Reveal className="mx-auto my-20 max-w-4xl text-center">
    <h2 className="text-4xl font-medium leading-[1.15] tracking-tight text-[#171717] md:text-5xl">
      <span className="ga-serif font-normal">Turn your ideas into beautifully designed spaces faster,</span>{" "}
      smarter, and effortlessly with AI.
    </h2>
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.02 }}
      transition={HOVER_SPRING}
      className="mt-10 rounded-full bg-[#171717] px-8 py-4 text-base font-medium text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-black cursor-pointer"
    >
      Start free decoration
    </motion.button>
  </Reveal>
);

const Footer = () => (
  <footer className="rounded-[36px] bg-[#161513] p-8 md:p-14 text-white shadow-2xl">
    <div className="grid items-start gap-10 md:grid-cols-2">
      <div>
        <a href="#" className="flex items-center gap-2.5">
          <Blossom className="h-8 w-8 text-white" />
          <span className="text-xl font-medium tracking-tight">GroundAI</span>
        </a>
        <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
          For homeowners, studios, and developers of all sizes.
        </p>
      </div>

      <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 md:ml-auto md:w-full md:max-w-md shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={IMG.avatar} alt="Presenter" loading="lazy" className="h-12 w-12 rounded-full object-cover" />
            <span className="ga-ripple absolute inset-0 rounded-full border border-white/40" aria-hidden="true" />
          </div>
          <p className="flex-1 text-sm font-medium leading-snug text-white/90">
            Watch how AI transforms interiors, then try it yourself.
          </p>
          <motion.button
            type="button"
            aria-label="Watch video"
            whileHover={{ scale: 1.15 }}
            transition={HOVER_SPRING}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-white" />
          </motion.button>
        </div>
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          transition={HOVER_SPRING}
          className="mt-5 w-full rounded-2xl bg-white py-3.5 text-sm font-semibold text-[#171717] transition hover:bg-neutral-100 shadow-md cursor-pointer"
        >
          Start free decoration
        </motion.button>
      </div>
    </div>

    <div className="mt-16 flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-white/10">
      <div className="flex items-center gap-3">
        <motion.button type="button" aria-label="Telegram" whileHover={{ y: -2, scale: 1.06 }} transition={HOVER_SPRING} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-white/15 cursor-pointer">
          <Send className="h-4 w-4" />
        </motion.button>
        <motion.button type="button" aria-label="Website" whileHover={{ y: -2, scale: 1.06 }} transition={HOVER_SPRING} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-white/15 cursor-pointer">
          <Globe className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <button type="button" className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/10 cursor-pointer">
          Pages <Plus className="h-3.5 w-3.5" />
        </button>
        <span className="hidden h-5 w-px rotate-[24deg] bg-white/20 sm:block" />
        {["Nueral", "GroundAI", "Wids", "Orinya"].map((b) => (
          <span key={b} className="flex items-center gap-2.5 text-lg font-medium text-white/40 transition hover:text-white/80">
            <BrandMark name={b} className="h-5 w-5" />
            {b}
          </span>
        ))}
      </div>
    </div>
  </footer>
);

/* ============================================================================
   ROOT
============================================================================ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="ga-sans min-h-screen overflow-x-hidden bg-[#EAE8E3] px-4 py-8 text-[#171717] antialiased sm:px-8 md:px-12">
      <GlobalStyles />
      <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <Hero loaded={loaded} />

        <section className="rounded-[36px] bg-[#F4F2EC] px-8 py-12 md:px-14 shadow-sm">
          <LogoMarquee />
          <BentoGrid />
          <Testimonial />
          <Metrics />
        </section>

        <Pricing />

        <section className="rounded-[36px] bg-[#F4F2EC] px-8 py-12 md:px-14 shadow-sm">
          <Faq />
          <FinalCta />
        </section>

        <Footer />
      </main>
    </div>
  );
}





