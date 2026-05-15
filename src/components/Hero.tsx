import { motion } from "framer-motion";
import { Clapperboard, Sparkles, Telescope } from "lucide-react";

interface HeroProps {
  totalFilms: number;
}

export function Hero({ totalFilms }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-cosmic-600/70 bg-cosmic-900/40 p-6 shadow-[0_0_45px_rgba(0,212,255,0.18)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-cosmic-300/30 blur-3xl" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <motion.p
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.24em] text-accent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            cosmic archive
          </motion.p>

          <motion.h1
            className="font-display text-3xl font-bold uppercase tracking-wide text-cosmic-50 sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Epic Sci-Fi Film Database
          </motion.h1>

          <motion.p
            className="mt-4 max-w-3xl text-sm text-cosmic-100/85 sm:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A curated deep-space catalog of visionary cinema—discover masterpieces across timelines,
            dimensions, and futures untold.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="rounded-2xl border border-cosmic-600/70 bg-cosmic-800/50 px-4 py-3 text-right backdrop-blur">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cosmic-200/70">Titles</p>
            <p className="mt-1 font-display text-2xl text-accent">{totalFilms}</p>
          </div>
          <div className="rounded-2xl border border-cosmic-600/70 bg-cosmic-800/50 px-4 py-3 text-right backdrop-blur">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cosmic-200/70">Status</p>
            <p className="mt-1 inline-flex items-center justify-end gap-2 font-mono text-sm uppercase tracking-[0.15em] text-success">
              <Telescope className="h-4 w-4" /> online
            </p>
          </div>
          <div className="col-span-2 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-2 text-right font-mono text-xs uppercase tracking-[0.16em] text-cosmic-50">
            <span className="inline-flex items-center gap-2">
              <Clapperboard className="h-3.5 w-3.5" /> curated cinematic intelligence
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
