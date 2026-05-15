import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = "Scanning deep-space archives…" }: LoadingStateProps) {
  return (
    <motion.div
      className="flex min-h-[30vh] flex-col items-center justify-center gap-4 rounded-3xl border border-cosmic-600/70 bg-cosmic-900/45 p-6 text-center backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl" />
        <LoaderCircle className="relative h-10 w-10 animate-spin text-accent" />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cosmic-100/80">{label}</p>
    </motion.div>
  );
}
