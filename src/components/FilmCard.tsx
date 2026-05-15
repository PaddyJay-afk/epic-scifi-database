import { motion } from "framer-motion";
import { Calendar, Clock3, Star } from "lucide-react";
import type { Film } from "@/types";

interface FilmCardProps {
  film: Film;
  index: number;
  onSelect: (film: Film) => void;
}

function getRatingValue(film: Film): string {
  const value = film.rating?.value;
  if (typeof value === "number") return value.toFixed(1);
  if (typeof value === "string") return value;
  return "—";
}

function getRuntimeGuess(film: Film): number {
  const length = film.synopsisLong?.length ?? film.synopsisShort.length;
  return 90 + Math.min(90, Math.floor(length / 8));
}

export function FilmCard({ film, index, onSelect }: FilmCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.2) }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-cosmic-600/70 bg-cosmic-900/50 shadow-[0_18px_45px_rgba(2,6,23,0.45)] backdrop-blur"
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
      </div>

      <button type="button" onClick={() => onSelect(film)} className="relative block h-full w-full text-left">
        <div className="relative aspect-[2/3] overflow-hidden bg-cosmic-800">
          {film.posterPath ? (
            <img
              src={film.posterPath}
              alt={film.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-cosmic-200/50">No Poster</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/35 to-transparent" />
          <div className="absolute right-3 top-3 rounded-full border border-warning/50 bg-warning/20 px-2 py-1 font-mono text-[0.68rem] text-warning">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3" /> {getRatingValue(film)}
            </span>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h3 className="line-clamp-2 font-display text-lg tracking-wide text-cosmic-50">{film.title}</h3>
            <p className="mt-1 line-clamp-1 text-xs text-cosmic-100/70">{film.directors.join(", ")}</p>
          </div>

          <p className="line-clamp-3 text-sm text-cosmic-100/80">{film.synopsisShort}</p>

          <div className="flex items-center justify-between border-t border-cosmic-700/80 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cosmic-200/75">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {film.year}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" /> {getRuntimeGuess(film)}m
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
