import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  loadingIndex: boolean;
}

export function SearchBar({ value, onChange, onClear, loadingIndex }: SearchBarProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <label htmlFor="film-search" className="sr-only">
        Search films
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cosmic-200/70" />
      <input
        id="film-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={loadingIndex ? "Initializing quantum index…" : "Search titles, cast, genres, keywords…"}
        className="h-12 w-full rounded-2xl border border-cosmic-600/80 bg-cosmic-900/60 pl-12 pr-12 text-sm text-cosmic-50 placeholder:text-cosmic-200/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_25px_rgba(0,212,255,0.12)] backdrop-blur transition focus:border-accent/70 focus:outline-none focus:ring-2 focus:ring-accent/40"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-cosmic-200/70 transition hover:bg-cosmic-700/70 hover:text-cosmic-50"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
