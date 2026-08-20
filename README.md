# GroundAI — Modern Conversational Spatial Design Landing Page

GroundAI is a high-performance, responsive landing page engineered with **React 19**, **Tailwind CSS v4**, and **Framer Motion**. It features interactive 3D physics, glassmorphism, dynamic cursor glare matrices, simulated neural AI chat engines, animated audio waveforms, and organic floating shaders.

---

## 🌟 Key Features

- **Hero Experience**: Kinetic typography with Google Fonts (*Inter* & *Instrument Serif*), staggered bloom entrance preloader, and backdrop-filter glassmorphism.
- **Brand Logomark Marquee**: Infinite smooth marquee with auto-pause on hover.
- **Organic Bento Grid**:
  - *Sculptural Shimmer Card*: Asynchronous floating glass chips over architectural assets.
  - *Ambient Neural Canvas*: Dark mode live AI prompt box with glowing amber/emerald mesh shaders, simulated conversation switcher, and real-time status indicators.
  - *Dynamic Interactive Accordion*: Elastic spring accordions with visual capability tags (*Minimalism*, *Clear Pathways*, *Herman Miller*, etc.).
- **Interactive Testimonials**:
  - Real-time cursor light glare tracking on 3D perspective cards.
  - Interactive audio snippet player with animated equalizer bars.
  - Timed auto-progressing carousel with hover & play pause mechanics.
- **Live Engine Telemetry**:
  - Dynamic segment switcher (*All-Time Scale* vs *Past 30 Days*).
  - Animated count-up stat counters.
- **Pricing Matrix**: Dual-tier starter & pro cards with hover-lift micro-interactions.
- **Floating Island Island FAQ**: Dual-layer oscillating floating moss rock with radial blur cast shadows.
- **Video Footer & Action Dock**: Interactive play ripple animation and responsive navigation dock.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Animations & Physics**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Inter & Instrument Serif (Google Fonts)

---

## 📁 Project Structure

```text
ground-ai/
├── public/
│   └── assets/
│       ├── hero.jpg          # Hero colonnade architecture
│       ├── sculpture.jpg     # Sculptural organic cushion bench
│       ├── portrait.jpg      # Client testimonial portrait
│       ├── avatar.jpg        # Presenter avatar
│       └── moss.jpg          # Floating moss rock island
├── src/
│   ├── App.jsx               # Complete high-contrast GroundAI landing page
│   ├── index.css             # Tailwind CSS v4 entry point
│   └── main.jsx              # React DOM root mounting
├── .env.example              # Environment variables template
├── index.html                # HTML entry point with font preconnects
├── package.json              # Project dependencies and npm scripts
├── vite.config.js            # Vite configuration with Tailwind CSS plugin
└── README.md                 # Project documentation & setup guide
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** / **pnpm** / **yarn**

### 2. Installation

Clone or extract the project archive, then run:

```bash
npm install
```

### 3. Local Development

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 📦 Production Build & Deployment

### 1. Build for Production

Generate optimized and minified production bundles:

```bash
npm run build
```

The compiled static files will be generated in the `dist/` directory.

### 2. Preview Production Build Locally

```bash
npm run preview
```

### 3. Deployment Platforms

The output in `dist/` is completely static and can be deployed directly to:
- **Vercel**: Import repository or run `npx vercel`
- **Netlify**: Drag and drop the `dist/` folder or link GitHub repo
- **Cloudflare Pages**: Set build command to `npm run build` and output directory to `dist`
- **AWS S3 / CloudFront**: Upload the `dist/` folder contents

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` if you need custom environment variables:

```bash
cp .env.example .env
```

Available configurations:
- `VITE_PORT`: Custom local development port (defaults to 5173).
- `VITE_API_URL`: Backend API endpoint (if wiring custom backends).

---

## 📄 License & Attribution

Designed and engineered for high-performance spatial AI presentations.
Assets and graphics are located in `public/assets/`.
