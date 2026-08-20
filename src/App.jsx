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
  Check,
  Search,
  ShoppingBasket,
  Baby,
  Dumbbell,
  BookOpen,
  Star,
  Facebook,
  Instagram,
  Twitter,
  ShoppingBag,
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

/* ----------------------------- Brand colors ------------------------------- */
const COLORS = {
  primary: "#12664B",
  primaryHover: "#0D4E3A",
  gold: "#C9A661",
};

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
          <span className="text-lg font-semibold tracking-tight">Valobite</span>
        </a>
        <div className={`hidden items-center gap-7 rounded-full py-2 pl-8 pr-2 md:flex ${glass}`}>
          {["Categories", "Sellers", "Trending", "About"].map((l) => (
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
          Discover more.
          <br />
          Shop <span className="ga-serif pr-1 font-normal">better</span>.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ ...ELASTIC, delay: 0.45 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full border border-white/25 bg-white/85 px-3 py-2.5 backdrop-blur-xl shadow-lg"
          >
            <input
              type="text"
              placeholder="Search for products, sellers, or categories"
              className="flex-1 bg-transparent text-sm font-medium text-[#171717] placeholder-neutral-500 outline-none"
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={HOVER_SPRING}
              className="rounded-full bg-[#12664B] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0D4E3A] transition-colors"
            >
              Search
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ ...ELASTIC, delay: 0.55 }}
        >
          <motion.button
            type="button"
            whileHover={{ y: -3, scale: 1.02 }}
            transition={HOVER_SPRING}
            className="mt-6 rounded-full bg-[#12664B] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-black/10 hover:bg-[#0D4E3A] transition-colors"
          >
            Start Shopping
          </motion.button>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
        className="absolute bottom-8 left-8 z-10 max-w-sm text-sm font-medium leading-relaxed text-white/90 drop-shadow-md"
      >
        Real sellers. Real products. Delivered across Bangladesh.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, x: 24, y: 24 }}
        animate={loaded ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-end gap-3"
      >
        <span className={`rounded-full px-6 py-3.5 text-sm font-medium text-white ${glass}`}>
          2,400+ Sellers Trust Us
        </span>
        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            aria-label="Search products"
            whileHover={{ rotate: 8, scale: 1.06 }}
            transition={HOVER_SPRING}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${glass}`}
          >
            <Search className="h-5 w-5" />
          </motion.button>
          <span className={`rounded-full px-6 py-3.5 text-sm font-medium text-white ${glass}`}>
            18,000+ Products Listed
          </span>
        </div>
      </motion.div>
    </header>
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
            className="rounded-full bg-[#12664B] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-black/10 hover:bg-[#0D4E3A] transition-colors"
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
const METRICS_DATA = [
  { end: 2400, suffix: "+", label: "Active Sellers" },
  { end: 18000, suffix: "+", label: "Products Listed" },
  { end: 85000, suffix: "+", label: "Happy Buyers" },
  { end: 1200, suffix: "+", label: "Orders Delivered Daily" },
];

const Metrics = () => {
  const stats = METRICS_DATA;

  return (
    <Reveal className="rounded-t-[48px] -mt-10 relative z-10 pt-20 pb-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h3 className="text-3xl font-medium tracking-tight text-[#171717] md:text-[38px] md:leading-[1.18]">
            Numbers that speak for <br />
            <span className="ga-serif font-normal text-[42px]">themselves</span>
          </h3>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="border-l-2 border-[#171717]/20 pl-8 group cursor-default"
          >
            <p className="text-4xl font-medium tracking-tight text-[#171717] sm:text-5xl md:text-[56px] leading-none">
              {s.static ? s.static : <CountUp end={s.end} decimals={s.decimals || 0} suffix={s.suffix || ""} />}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  );
};

/* ============================================================================
   F. SHOP BY CATEGORY
============================================================================ */
const CATEGORIES = [
  { name: "Fashion & Apparel", img: "https://picsum.photos/seed/valobite-fashion/900/700", large: true },
  { name: "Electronics & Gadgets", img: "https://picsum.photos/seed/valobite-electronics/500/380" },
  { name: "Home & Living", img: "https://picsum.photos/seed/valobite-home/500/380" },
  { name: "Beauty & Personal Care", img: "https://picsum.photos/seed/valobite-beauty/500/380" },
];

const CATEGORY_CHIPS = [
  { name: "Grocery & Food", icon: ShoppingBasket },
  { name: "Mother & Baby", icon: Baby },
  { name: "Sports & Outdoor", icon: Dumbbell },
  { name: "Books & Stationery", icon: BookOpen },
];

const Categories = () => (
  <Reveal className="mt-16">
    <div className="mb-10">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#12664B]">BROWSE</span>
      <h3 className="mt-3 text-3xl font-medium tracking-tight text-[#171717] md:text-[38px] md:leading-[1.18]">
        Find exactly what you&apos;re <span className="ga-serif font-normal">looking for</span>
      </h3>
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      {CATEGORIES.map((cat, i) => (
        <Tilt
          key={cat.name}
          className={`rounded-3xl overflow-hidden relative ${cat.large ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
          <img src={cat.img} alt={cat.name} className="object-cover h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-4 left-4 text-lg font-bold text-white">
            {cat.name}
          </span>
        </Tilt>
      ))}
    </div>

    <div className="mt-10 flex gap-3 overflow-x-auto pb-1">
      {CATEGORY_CHIPS.map((chip) => (
        <div
          key={chip.name}
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm whitespace-nowrap"
        >
          <chip.icon className="h-4 w-4 text-[#12664B]" />
          <span className="text-sm font-medium text-[#171717]">{chip.name}</span>
        </div>
      ))}
    </div>
  </Reveal>
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
      className="mt-10 rounded-full bg-[#12664B] px-8 py-4 text-base font-medium text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#0D4E3A] cursor-pointer"
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
    <div className="ga-sans min-h-screen overflow-x-hidden bg-[#F3F1EC] px-4 py-8 text-[#171717] antialiased sm:px-8 md:px-12">
      <GlobalStyles />
      <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <Hero loaded={loaded} />

        <section className="rounded-t-[48px] -mt-10 relative z-10 bg-[#FAF9F6] px-8 py-12 md:px-14 shadow-sm">
          <Metrics />
          <Categories />
          <TopSellers />
          <Products />
          <Testimonial />
        </section>

        <section className="rounded-[36px] bg-[#FAF9F6] px-8 py-12 md:px-14 shadow-sm">
          <FinalCta />
          <Faq />
        </section>

        <Footer />
      </main>
    </div>
  );
}





