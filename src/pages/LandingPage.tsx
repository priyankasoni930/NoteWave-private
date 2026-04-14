// ============================================================
// NoteAI Landing Page — All-in-One Single File
// ============================================================
// Dependencies: react, framer-motion, lucide-react, tailwindcss
// Tailwind config & index.css included at the bottom as comments
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mic, Menu, Sparkles, ArrowRight, Play, Clock, GraduationCap, FileText,
  Users, Youtube, Check, ChevronRight, Zap, BookOpen, Volume2, Brain,
  Layers, Link, Quote, Star,
} from "lucide-react";
import { Link } from "react-router-dom";

// ============================================================
// REUSABLE: WaveBar
// ============================================================
const WaveBar = ({ delay }: { delay: number }) => (
  <motion.div
    className="w-[3px] rounded-full bg-gradient-to-t from-note-green to-note-green-light"
    animate={{ height: ["6px", "28px", "6px"] }}
    transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{ height: "6px" }}
  />
);

// ============================================================
// REUSABLE: AnimatedSection
// ============================================================
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================
// NAVBAR
// ============================================================
const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-note-bg/[0.92] backdrop-blur-xl border-b border-note-fg/[0.08] shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-note-green flex items-center justify-center shadow-sm">
            <Mic className="text-white" size={16} />
          </div>
          <span className="font-bold text-lg tracking-tight text-note-fg font-serif">
            Note<span className="text-note-green">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-note-fg/50 hover:text-note-fg transition-colors font-mono"
              style={{ fontSize: "12px", letterSpacing: "0.04em" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth">
          <button
            className="text-note-fg/[0.55] hover:text-note-fg transition-colors px-4 py-2 font-mono"
            style={{ fontSize: "12px" }}
          >
            Start Meeting 
          </button>
          </Link>
          <Link to="/youtube">
          <button className="text-sm font-semibold px-5 py-2 rounded-full bg-note-fg hover:bg-note-green-dark text-white transition-all duration-300 shadow-sm">
            Chat with YT video
          </button>
          </Link>
           <Link to="/pdf">
          <button className="text-sm font-semibold px-5 py-2 rounded-full bg-note-fg hover:bg-note-green-dark text-white transition-all duration-300 shadow-sm">
            Chat with PDF
          </button>
          </Link>
        </div>

        <button
          className="md:hidden text-note-fg/60 hover:text-note-fg"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-note-bg border-t border-note-fg/[0.08] px-6 py-4 space-y-3 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-note-fg/50 hover:text-note-fg transition-colors font-mono text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full text-sm font-semibold px-5 py-2 rounded-full bg-note-fg hover:bg-note-green-dark text-white transition-all duration-300 shadow-sm">
              Start Free
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ============================================================
// HERO SECTION
// ============================================================
const stats = [
  { icon: Clock, value: "8+", label: "Hours Saved / week" },
  { icon: Mic, value: "98%", label: "Transcription Accuracy" },
  { icon: FileText, value: "100+", label: "Notes Generated" },
];

const phrases = ["Lecture Notes.", "Meeting Recaps.", "YouTube Insights.", "PDF Summaries."];

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIndex.current];
      if (!deleting.current) {
        setTypedText(current.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTypedText(current.slice(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) {
          deleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 55 : 90);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative pt-36 pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(122, 158, 126, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-note-green/[0.35] bg-note-green/10 text-note-green-dark font-mono"
        style={{ fontSize: "11px", letterSpacing: "0.06em" }}
      >
        <Sparkles size={11} />
        <span>AI-Powered Note Intelligence — Now in Beta</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.3 }}
        className="relative mt-10 text-5xl md:text-7xl leading-tight tracking-tight max-w-4xl text-note-fg font-serif font-normal"
      >
        Your AI that turns
        <br />
        <span className="italic text-note-green">voice into </span>
        <span className="text-note-fg">{typedText}</span>
        <span className="text-note-green animate-pulse">|</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative mt-7 text-base text-note-muted max-w-xl leading-relaxed"
      >
        Capture live lectures, meeting conversations, YouTube videos, and PDFs. NoteAI transforms everything into structured notes, instant summaries, and study flashcards.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="relative mt-10 flex flex-col sm:flex-row gap-4 items-center"
      >
        <Link to="/auth">
        <button className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-note-fg hover:bg-note-green-dark transition-all duration-300 font-semibold text-sm text-white shadow-md">
          Start Taking Notes Free
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
        </Link>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="relative mt-10 flex items-center gap-3 text-note-subtle font-mono"
        style={{ fontSize: "11px" }}
      >
        <div className="flex -space-x-2">
          {["A", "B", "C", "D", "E"].map((letter) => (
            <div
              key={letter}
              className="w-7 h-7 rounded-full border-2 border-note-bg bg-note-green flex items-center justify-center text-[10px] font-bold text-white"
            >
              {letter}
            </div>
          ))}
        </div>
        <span>
          <strong className="text-note-fg">12,000+</strong> students &amp; professionals
        </span>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="relative mt-20 w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-1 py-5 px-3 rounded-2xl bg-white/80 border border-note-fg/[0.06] shadow-sm backdrop-blur-sm"
          >
            <stat.icon size={16} className="text-note-green mb-1" />
            <p className="text-2xl font-bold text-note-fg font-serif">{stat.value}</p>
            <p className="text-center leading-tight text-note-subtle font-mono" style={{ fontSize: "9px", letterSpacing: "0.04em" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Demo card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.75 }}
        className="relative mt-16 w-full max-w-4xl mx-auto"
      >
        {/* Floating summary badge */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-5 -left-3 md:-left-6 z-10 rounded-xl border border-note-fg/10 bg-white px-4 py-3 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={12} className="text-note-green" />
            <span className="font-semibold text-note-fg text-sm font-mono">summary_ready</span>
          </div>
          <p className="text-note-subtle font-mono" style={{ fontSize: "10px" }}>
            3 key topics identified
          </p>
        </motion.div>

        {/* Floating flashcard badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-5 -right-3 md:-right-6 z-10 rounded-xl bg-note-fg px-4 py-3 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={12} className="text-note-green-light" />
            <span className="font-semibold text-white text-sm font-mono">flashcard_generated</span>
          </div>
          <p className="text-white/60 font-mono" style={{ fontSize: "10px" }}>
            Q: What is Gradient Descent?
          </p>
        </motion.div>

        <div className="relative rounded-2xl border border-note-fg/10 bg-white overflow-hidden shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-note-green flex items-center justify-center shadow-sm">
                <Mic size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-note-fg">Live Lecture Recording</p>
                <p className="text-note-subtle font-mono" style={{ fontSize: "10px" }}>
                  Intro to Machine Learning · Prof. A. Turing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-red-400 font-mono" style={{ fontSize: "11px" }}>
              <motion.div
                className="w-2 h-2 rounded-full bg-red-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span>REC 24:31</span>
            </div>
          </div>

          {/* Animated waveform */}
          <div className="flex items-end gap-[3px] h-10 mb-6">
            {Array.from({ length: 60 }).map((_, i) => (
              <WaveBar key={i} delay={i * 0.04} />
            ))}
          </div>

          {/* Two panels: Auto-generated notes + AI Summary */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Auto-generated notes */}
            <div className="rounded-xl bg-note-alt border border-note-fg/[0.06] p-5">
              <div className="flex items-center justify-center mb-4">
                <span className="text-note-green font-mono" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
                  // AUTO-GENERATED NOTES
                </span>
              </div>
              <div className="space-y-3 text-left">
                <p className="text-xs text-note-muted leading-relaxed">
                  <span className="text-note-fg font-semibold">Supervised Learning</span> — model trained on labeled data to predict outputs.
                </p>
                <p className="text-xs text-note-muted leading-relaxed">
                  <span className="text-note-fg font-semibold">Loss Function</span> — measures error between predicted and actual values.
                </p>
                <p className="text-xs text-note-muted leading-relaxed">
                  <span className="text-note-fg font-semibold">Gradient Descent</span> — iteratively minimizes the loss by adjusting weights.
                </p>
              </div>
            </div>

            {/* AI Summary */}
            <div className="rounded-xl bg-note-alt border border-note-fg/[0.06] p-5">
              <div className="flex items-center justify-center mb-4">
                <span className="text-note-green font-mono" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
                  // AI SUMMARY
                </span>
              </div>
              <p className="text-xs text-note-muted leading-relaxed text-center mb-4">
                Covers foundations of supervised ML — how models learn from labeled datasets via loss functions and gradient descent to minimize prediction errors during training.
              </p>
              <div className="flex gap-2 justify-center">
                <span className="px-3 py-1 rounded-full border border-note-fg/10 text-note-muted font-mono" style={{ fontSize: "10px" }}>
                  ml_basics
                </span>
                <span className="px-3 py-1 rounded-full border border-note-fg/10 text-note-muted font-mono" style={{ fontSize: "10px" }}>
                  optimization
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================================
// FEATURES SECTION
// ============================================================
const features = [
  {
    id: "live",
    icon: Mic,
    tag: "Live Notes",
    iconBg: "bg-note-green",
    title: "Real-Time Voice Note Taking",
    description:
      "Capture every word during lectures, classes, or brainstorming sessions. Our AI listens, transcribes, and organizes your thoughts as they happen — so you never miss a key insight.",
    bullets: [
      "Instant speech-to-text transcription",
      "Smart paragraph & topic grouping",
      "Live keyword highlighting",
      "Auto speaker identification",
    ],
  },
  {
    id: "meeting",
    icon: Users,
    tag: "Meeting Notes",
    iconBg: "bg-note-green-dark",
    title: "Effortless Meeting Notes",
    description:
      "Join any meeting and let NoteAI handle the documentation. Get structured action items, decisions, and summaries delivered the moment the call ends.",
    bullets: [
      "Auto-join Zoom, Meet, Teams",
      "Action item extraction",
      "Speaker-labeled notes",
      "Shared team workspace",
    ],
  },
  {
    id: "youtube",
    icon: Youtube,
    tag: "YouTube Notes",
    iconBg: "bg-note-green-dark",
    title: "YouTube Video → Structured Notes",
    description:
      "Paste any YouTube link and get complete, timestamped notes in seconds. Perfect for online courses, conference talks, and educational content.",
    bullets: [
      "Paste link → get notes",
      "Timestamped sections",
      "Key concept extraction",
      "Works with any public video",
    ],
  },
  {
    id: "pdf",
    icon: FileText,
    tag: "PDF Notes",
    iconBg: "bg-note-green",
    title: "PDF → Intelligent Notes",
    description:
      "Upload research papers, textbooks, or any PDF. NoteAI reads, analyzes, and transforms dense documents into structured, easy-to-review notes.",
    bullets: [
      "Drag-and-drop PDF upload",
      "Automatic chapter detection",
      "Key quote highlighting",
      "Cross-reference linking",
    ],
  },
];

const LiveNotesPreviewCard = () => (
  <div className="rounded-2xl border border-note-fg/[0.08] bg-white p-8 shadow-sm">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-2.5 h-2.5 rounded-full bg-note-green" />
      <span className="text-note-subtle uppercase font-mono" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
        LIVE NOTES · ACTIVE
      </span>
    </div>

    <div className="rounded-xl bg-note-alt border border-note-fg/[0.06] p-6">
      <div className="flex items-center gap-2 text-red-400 font-mono mb-4" style={{ fontSize: "11px" }}>
        <motion.div
          className="w-2 h-2 rounded-full bg-red-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span>REC · 24:31</span>
      </div>

      <div className="flex items-end gap-[3px] h-8 mb-5">
        {Array.from({ length: 28 }).map((_, i) => (
          <WaveBar key={i} delay={i * 0.07} />
        ))}
      </div>

      <p className="text-note-green font-mono mb-3 uppercase" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
        // LIVE_TRANSCRIPT
      </p>
      <p className="text-xs text-note-muted leading-relaxed italic">
        "...gradient descent iteratively updates weights to minimize the cost function, converging toward the global minimum..."
      </p>

      <div className="mt-5 pt-4 border-t border-note-fg/[0.06] flex items-center justify-between">
        <span className="text-note-subtle font-mono uppercase" style={{ fontSize: "9px", letterSpacing: "0.06em" }}>
          NOTEAI · PROCESSED
        </span>
        <div className="w-2.5 h-2.5 rounded-full bg-note-green" />
      </div>
    </div>
  </div>
);

const DefaultPreviewCard = ({ active }: { active: typeof features[0] }) => (
  <div className="rounded-2xl border border-note-fg/[0.08] bg-white p-8 shadow-sm">
    <div className={`w-12 h-12 rounded-xl ${active.iconBg} flex items-center justify-center mb-6 shadow-sm`}>
      <active.icon size={22} className="text-white" />
    </div>
    <h3 className="text-xl text-note-fg mb-3 font-serif">{active.title}</h3>
    <p className="text-note-muted text-sm leading-relaxed mb-6">{active.description}</p>
    <div className="rounded-xl bg-note-alt border border-note-fg/[0.06] p-5">
      <p className="text-note-green font-mono mb-2" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
        // preview
      </p>
      <div className="space-y-2">
        {active.bullets.map((b) => (
          <div key={b} className="flex items-center gap-2 text-xs text-note-muted">
            <Check size={12} className="text-note-green" />
            {b}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = features[activeIndex];
  const [showLiveAlt, setShowLiveAlt] = useState(false);

  useEffect(() => {
    if (active.id !== "live") {
      setShowLiveAlt(false);
      return;
    }
    const interval = setInterval(() => {
      setShowLiveAlt((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, [active.id]);

  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    featureRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.55 }
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const cardKey = active.id === "live" && showLiveAlt ? "live-alt" : active.id;

  return (
    <section id="features" className="relative py-24 px-6 bg-note-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="text-note-green uppercase mb-3 font-mono"
            style={{ fontSize: "10px", letterSpacing: "0.12em" }}
          >
            // core_features
          </p>
          <h2 className="text-4xl md:text-5xl leading-tight text-note-fg font-serif font-normal">
            Every source.
            <br />
            <em className="text-note-green">One platform.</em>
          </h2>
          <p className="mt-4 text-note-muted max-w-lg text-sm leading-relaxed">
            Whether you're in a lecture hall, on a Zoom call, or deep in research — NoteAI captures and structures it all.
          </p>
        </motion.div>

        {/* Desktop: side-by-side layout */}
        <div className="hidden md:flex gap-16">
          <div className="flex-1 space-y-0">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                ref={(el) => { featureRefs.current[i] = el; }}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`py-14 border-b border-note-fg/[0.08] last:border-0 cursor-pointer ${
                  i === activeIndex ? "opacity-100" : "opacity-60 hover:opacity-80"
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${feat.iconBg} flex items-center justify-center shadow-sm`}>
                    <feat.icon size={18} className="text-white" />
                  </div>
                  <span className="text-note-subtle uppercase font-mono" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl text-note-fg mb-4 leading-snug font-serif font-normal">
                  {feat.title}
                </h3>
                <p className="text-note-muted leading-relaxed mb-7 text-sm">{feat.description}</p>
                <ul className="space-y-2.5">
                  {feat.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-note-muted">
                      <div className="w-5 h-5 rounded-full bg-note-green flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-white" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
                <button className="mt-7 flex items-center gap-1.5 text-sm font-semibold text-note-green hover:opacity-70 transition-opacity">
                  Learn more <ChevronRight size={15} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Right side preview with animation */}
          <div className="flex-1 sticky top-24 self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={cardKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                {active.id === "live" && showLiveAlt ? (
                  <LiveNotesPreviewCard />
                ) : (
                  <DefaultPreviewCard active={active} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-6">
          {features.map((feat) => (
            <div key={feat.title} className="rounded-2xl border border-note-fg/[0.08] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${feat.iconBg} flex items-center justify-center shadow-sm`}>
                  <feat.icon size={18} className="text-white" />
                </div>
                <span className="text-note-subtle uppercase font-mono" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                  {feat.tag}
                </span>
              </div>
              <h3 className="text-xl text-note-fg mb-3 font-serif font-normal">{feat.title}</h3>
              <p className="text-note-muted text-sm leading-relaxed mb-4">{feat.description}</p>
              <ul className="space-y-2">
                {feat.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-note-muted">
                    <Check size={12} className="text-note-green" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// POWER TOOLS SECTION
// ============================================================
const PowerToolsSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-16">
          <p className="text-note-green uppercase mb-3 font-mono" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
            // ai_superpowers
          </p>
          <h2 className="text-4xl md:text-5xl leading-tight text-note-fg font-serif font-normal">
            Don't just take notes.
            <br />
            <em className="text-note-green">Master them.</em>
          </h2>
          <p className="mt-4 text-note-muted max-w-lg text-sm leading-relaxed">
            After capturing your notes, NoteAI helps you understand, remember, and revise — faster than ever before.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-2xl border border-note-fg/[0.08] bg-white p-8 group hover:border-note-green/[0.35] transition-colors shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-note-green flex items-center justify-center mb-6 shadow-sm">
                <Zap size={20} className="text-white" />
              </div>
              <h3 className="text-2xl text-note-fg mb-3 font-serif font-normal">Instant Summaries</h3>
              <p className="text-note-muted text-sm leading-relaxed mb-6">
                NoteAI compresses hours of content into a crisp, accurate summary you can read in under 2 minutes.
              </p>
              <div className="rounded-xl bg-note-alt border border-note-fg/[0.06] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={13} className="text-note-green" />
                  <span className="text-note-green font-mono" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>// ai_summary</span>
                  <span className="ml-auto text-note-subtle font-mono" style={{ fontSize: "9px" }}>2_min_read</span>
                </div>
                <p className="text-[11px] text-note-muted leading-relaxed">
                  The lecture covers three foundational ML concepts: supervised learning, loss functions, and gradient descent.
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-note-green/[0.15] text-note-green-dark font-mono" style={{ fontSize: "9px" }}>3_key_topics</span>
                  <span className="px-2 py-0.5 rounded-full bg-note-green-dark/10 text-note-green-dark font-mono" style={{ fontSize: "9px" }}>1hr → 2min</span>
                </div>
              </div>
              <ul className="mt-6 space-y-2">
                {["One-click summary generation", "Adjustable summary length", "Highlighted key insights"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-note-muted">
                    <Check size={13} className="text-note-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-full rounded-2xl border border-note-fg/[0.08] bg-white p-8 group hover:border-note-green/[0.35] transition-colors shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-note-green-dark flex items-center justify-center mb-6 shadow-sm">
                <BookOpen size={20} className="text-white" />
              </div>
              <h3 className="text-2xl text-note-fg mb-3 font-serif font-normal">Study Flashcards</h3>
              <p className="text-note-muted text-sm leading-relaxed mb-6">
                From any set of notes, NoteAI auto-generates Q&A flashcards built for spaced repetition.
              </p>
              <div className="relative">
                <div className="rounded-xl bg-note-alt border border-note-fg/[0.08] p-5 shadow-sm absolute top-4 left-4 right-4 z-[1]" style={{ transform: "rotate(1.5deg)" }} />
                <div className="rounded-xl bg-note-alt border border-note-fg/[0.08] p-5 shadow-sm absolute top-2 left-2 right-2 z-[2]" style={{ transform: "rotate(0deg)" }} />
                <div className="rounded-xl bg-note-alt border border-note-fg/[0.08] p-5 shadow-sm relative z-[3]" style={{ transform: "rotate(-1.5deg)" }}>
                  <p className="text-note-green font-semibold mb-2 uppercase font-mono" style={{ fontSize: "9px", letterSpacing: "0.1em" }}>// flashcard_03 / 24</p>
                  <p className="font-semibold text-note-fg mb-3 text-sm font-serif">Q: What is the purpose of a loss function in ML?</p>
                  <div className="pt-3 border-t border-note-fg/[0.08]">
                    <p className="text-note-subtle mb-1 font-mono" style={{ fontSize: "9px" }}>// answer:</p>
                    <p className="text-xs text-note-muted leading-relaxed">It measures the difference between predictions and actual targets, guiding optimization during training.</p>
                  </div>
                </div>
              </div>
              <ul className="mt-6 space-y-2">
                {["Auto-generated from any notes", "Spaced repetition scheduling", "Export to Anki or Quizlet"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-note-muted">
                    <Check size={13} className="text-note-green-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// HOW IT WORKS SECTION
// ============================================================
const steps = [
  { icon: Volume2, num: "1", title: "Capture or Import", desc: "Speak live, paste a YouTube link, or upload a PDF. NoteAI handles any input format." },
  { icon: Brain, num: "2", title: "AI Processes", desc: "Our LLM engine transcribes, segments, and identifies the most important concepts." },
  { icon: Layers, num: "3", title: "Get Smart Notes", desc: "Receive beautifully structured notes with headings, bullets, and key takeaways." },
  { icon: Sparkles, num: "4", title: "Summary & Flashcards", desc: "Generate a concise summary or study flashcards with one click." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-24 px-6 bg-note-alt">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-note-green uppercase mb-3 font-mono" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
            // how_it_works
          </p>
          <h2 className="text-4xl md:text-5xl text-note-fg font-serif font-normal">
            Four steps to <em className="text-note-green">smarter notes</em>
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-note-green/30 to-transparent hidden md:block" />
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-2xl bg-white border border-note-fg/[0.08] flex items-center justify-center shadow-sm">
                      <step.icon size={26} className="text-note-green" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-note-fg flex items-center justify-center text-white shadow-sm font-mono" style={{ fontSize: "9px" }}>
                      {step.num}
                    </div>
                  </div>
                  <h4 className="text-sm mb-2 text-note-fg font-serif font-semibold">{step.title}</h4>
                  <p className="text-xs text-note-subtle leading-relaxed">{step.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// YOUTUBE DEMO SECTION
// ============================================================
const YouTubeDemoSection = () => {
  return (
    <section className="relative py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="rounded-2xl border border-note-fg/[0.08] bg-white p-8 md:p-12 text-center shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-note-green-dark flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Youtube size={22} className="text-white" />
            </div>
            <h3 className="text-3xl text-note-fg mb-3 font-serif font-normal">
              Try with any YouTube video
            </h3>
            <p className="text-note-muted text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Paste a YouTube URL and get structured, timestamped notes in seconds. No account needed to try.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1 flex items-center gap-3 rounded-full bg-note-alt border border-note-fg/10 px-5 py-3">
                <Link size={15} className="text-note-subtle flex-shrink-0" />
                <span className="text-note-subtle font-mono" style={{ fontSize: "11px" }}>
                  paste_youtube_url_here…
                </span>
              </div>
              <button className="px-6 py-3 rounded-full bg-note-fg hover:bg-note-green-dark font-semibold text-sm text-white transition-all duration-300 shadow-sm flex-shrink-0">
                Generate Notes
              </button>
            </div>
            <p className="text-note-subtle mt-4 font-mono" style={{ fontSize: "10px" }}>
              works with any public youtube video · no sign-up required
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ============================================================
// TESTIMONIALS SECTION
// ============================================================
const testimonials = [
  { quote: "I used to spend 3 hours reviewing lecture recordings. NoteAI cuts that to 15 minutes. The flashcards it generates are genuinely better than what I'd make myself.", name: "Priya Sharma", initials: "PS", role: "Medical Student" },
  { quote: "Our team meetings used to vanish into thin air. Now every decision, action item, and insight is captured automatically. It's changed how we operate.", name: "Jordan Lee", initials: "JL", role: "Product Manager" },
  { quote: "As a researcher, I read 20+ papers a week. NoteAI turns each one into structured notes in seconds. My literature review process is 5x faster.", name: "Marcus Chen", initials: "MC", role: "PhD Researcher" },
];

const Stars5 = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={13} className="fill-note-green text-note-green" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-24 px-6 bg-note-alt">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <p className="text-note-green uppercase mb-3 font-mono" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
            // testimonials
          </p>
          <h2 className="text-4xl md:text-5xl text-note-fg font-serif font-normal">
            Loved by <em className="text-note-green">learners</em>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="h-full rounded-2xl border border-note-fg/[0.08] bg-white p-7 flex flex-col shadow-sm"
              >
                <Quote size={22} className="text-note-green/[0.35] mb-4" />
                <p className="text-sm text-note-muted leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-note-green flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-note-fg font-serif">{t.name}</p>
                    <p className="text-note-subtle font-mono" style={{ fontSize: "10px" }}>{t.role}</p>
                  </div>
                  <div className="ml-auto"><Stars5 /></div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// PRICING SECTION
// ============================================================
const plans = [
  { name: "Starter", desc: "Great for trying it out", price: "$0", period: "/ forever", cta: "Get Started Free", ctaStyle: "border border-note-fg/[0.15] hover:border-note-green/50 text-note-muted hover:text-note-fg bg-transparent", highlight: false, features: ["5 hours live recording/mo", "10 YouTube links/mo", "5 PDF uploads/mo", "Basic summaries", "50 flashcards/mo"], checkColor: "text-note-subtle" },
  { name: "Pro", desc: "For students & professionals", price: "$12", period: "/ per month", cta: "Start 14-Day Trial", ctaStyle: "bg-note-fg hover:bg-note-green-dark text-white shadow-sm", highlight: true, features: ["Unlimited live recording", "Unlimited YouTube links", "Unlimited PDF uploads", "AI summaries & flashcards", "Priority processing", "Export to Notion, Docs"], checkColor: "text-note-green" },
  { name: "Team", desc: "For teams & organizations", price: "$39", period: "/ per user/mo", cta: "Contact Sales", ctaStyle: "border border-note-fg/[0.15] hover:border-note-green/50 text-note-muted hover:text-note-fg bg-transparent", highlight: false, features: ["Everything in Pro", "Up to 10 members", "Shared note library", "Meeting integrations", "Admin dashboard", "Priority support"], checkColor: "text-note-subtle" },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <p className="text-note-green uppercase mb-3 font-mono" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
            // pricing
          </p>
          <h2 className="text-4xl md:text-5xl text-note-fg font-serif font-normal">
            Simple, <em className="text-note-green">transparent</em> pricing
          </h2>
          <p className="mt-4 text-note-muted max-w-sm mx-auto text-sm">
            Start free, upgrade when you need more. No surprise fees.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative rounded-2xl p-7 border transition-all shadow-sm ${
                  plan.highlight ? "border-note-green/40 bg-note-alt shadow-md" : "border-note-fg/[0.08] bg-white"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-note-fg text-white shadow-sm font-mono" style={{ fontSize: "9px", letterSpacing: "0.06em" }}>
                    most_popular
                  </div>
                )}
                <p className="font-bold text-lg mb-1 text-note-fg font-serif">{plan.name}</p>
                <p className="text-note-subtle mb-5 font-mono" style={{ fontSize: "10px" }}>{plan.desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-note-fg font-serif">{plan.price}</span>
                  <span className="text-note-subtle mb-1 font-mono" style={{ fontSize: "10px" }}>{plan.period}</span>
                </div>
                <button className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 mb-7 ${plan.ctaStyle}`}>
                  {plan.cta}
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-note-muted">
                      <Check size={12} className={plan.checkColor} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// CTA SECTION
// ============================================================
const CTASection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-note-alt">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="rounded-2xl border border-note-green/30 bg-white p-12 text-center shadow-sm">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl bg-note-green flex items-center justify-center mx-auto mb-8 shadow-md"
            >
              <Mic size={26} className="text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl mb-4 leading-tight text-note-fg font-serif font-normal">
              Start capturing smarter
              <br />
              <em className="text-note-green">notes today</em>
            </h2>
            <p className="text-note-muted text-base mb-10 max-w-md mx-auto leading-relaxed">
              Join students, researchers, and professionals who've transformed how they learn and work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
              <button className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-note-fg hover:bg-note-green-dark transition-all duration-300 font-semibold text-base text-white shadow-md">
                Get Started — It's Free
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
            </div>
            <p className="text-note-subtle mt-5 font-mono" style={{ fontSize: "10px" }}>
              no credit card required · free forever plan available
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const footerLinks = ["Privacy Policy", "Terms of Service", "Contact", "Blog", "Changelog"];

const Footer = () => {
  return (
    <footer className="relative border-t border-note-fg/[0.08] py-12 px-6 bg-note-bg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-note-green flex items-center justify-center">
            <Mic size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm text-note-fg font-serif">
            Note<span className="text-note-green">AI</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-note-subtle hover:text-note-muted transition-colors font-mono"
              style={{ fontSize: "10px" }}
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-note-subtle font-mono" style={{ fontSize: "10px" }}>
          © 2025 NoteAI
        </p>
      </div>
    </footer>
  );
};

// ============================================================
// MAIN INDEX PAGE
// ============================================================
const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-note-bg text-note-fg">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PowerToolsSection />
      <HowItWorksSection />
      <YouTubeDemoSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

// ============================================================
// TAILWIND CONFIG (tailwind.config.ts)
// ============================================================
/*
note: {
  bg: "#F4F6F3",
  fg: "#2B2B2B",
  green: "#7A9E7E",
  "green-dark": "#4D7A52",
  "green-light": "#A8C5AC",
  muted: "#5C5C5C",
  subtle: "#8C8C8C",
  alt: "#EEF2EE",
},
*/

// ============================================================
// INDEX.CSS — Custom font classes
// ============================================================
/*
.font-serif {
  font-family: Georgia, "Times New Roman", serif;
  }
  .font-mono {
    font-family: ui-monospace, "Courier New", monospace;
*/
