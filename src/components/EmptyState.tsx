import { motion } from "framer-motion";
import { Orbit, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.section
      className="flex min-h-[30vh] flex-col items-center justify-center rounded-3xl border border-cosmic-600/70 bg-cosmic-900/45 px-6 py-12 text-center backdrop-blur"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 rounded-full border border-accent/50 bg-accent/10 p-4 text-accent shadow-[0_0_30px_rgba(0,212,255,0.25)]">
        <Orbit className="h-7 w-7" />
      </div>
      <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-cosmic-50">No transmissions found</h3>
      <p className="mt-3 max-w-xl text-sm text-cosmic-100/80">
        Your current query filters out every result in the archive. Reset parameters and continue
        exploring the galaxy of cinematic science fiction.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-cosmic-500/80 bg-cosmic-800/70 px-4 py-2 text-sm text-cosmic-50 transition hover:border-accent/60 hover:text-accent"
      >
        <RotateCcw className="h-4 w-4" /> Reset Search
      </button>
    </motion.section>
  );
}
