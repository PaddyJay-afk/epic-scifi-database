import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Star, Users, X } from "lucide-react";
import type { Film } from "@/types";

interface FilmModalProps {
  film: Film | null;
  onClose: () => void;
}

function ratingToText(film: Film): string {
  const value = film.rating?.value;
  if (typeof value === "number") return value.toFixed(1);
  if (typeof value === "string") return value;
  return "Unrated";
}

export function FilmModal({ film, onClose }: FilmModalProps) {
  useEffect(() => {
    if (!film) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [film, onClose]);

  return (
    <AnimatePresence>
      {film && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-cosmic-950/80 backdrop-blur-md" />

          <motion.article
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-cosmic-500/70 bg-cosmic-900/90 shadow-[0_0_80px_rgba(0,212,255,0.22)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={film.title}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full border border-cosmic-500/80 bg-cosmic-900/80 p-2 text-cosmic-50 transition hover:border-accent/60 hover:text-accent"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative h-64 w-full overflow-hidden sm:h-80">
              {(film.backdropPath || film.posterPath) && (
                <img
                  src={film.backdropPath ?? film.posterPath}
                  alt={film.title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/45 to-transparent" />
              <div className="absolute bottom-4 left-4 right-12">
                <h3 className="font-display text-2xl uppercase tracking-wide text-cosmic-50 sm:text-3xl">{film.title}</h3>
                <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-warning/60 bg-warning/15 px-3 py-1 font-mono text-xs text-warning">
                  <Star className="h-3.5 w-3.5" /> {ratingToText(film)}
                </p>
              </div>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-[220px_1fr] sm:p-6">
              <aside>
                <div className="overflow-hidden rounded-2xl border border-cosmic-600/80 bg-cosmic-800/50">
                  {film.posterPath ? (
                    <img src={film.posterPath} alt={`${film.title} poster`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex aspect-[2/3] items-center justify-center text-sm text-cosmic-200/60">No Poster</div>
                  )}
                </div>

                <dl className="mt-4 space-y-2 text-xs text-cosmic-100/85">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    <dt className="font-mono uppercase tracking-[0.14em] text-cosmic-200/70">Year:</dt>
                    <dd>{film.year}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-accent" />
                    <dt className="font-mono uppercase tracking-[0.14em] text-cosmic-200/70">Cast:</dt>
                    <dd className="line-clamp-2">{film.cast.slice(0, 3).join(", ")}</dd>
                  </div>
                </dl>
              </aside>

              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cosmic-200/70">Synopsis</p>
                  <p className="mt-2 text-sm leading-relaxed text-cosmic-100/90">{film.synopsisLong ?? film.synopsisShort}</p>
                </div>

                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cosmic-200/70">Directors</p>
                  <p className="mt-2 text-sm text-cosmic-100/90">{film.directors.join(", ")}</p>
                </div>

                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cosmic-200/70">Genres</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {film.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cosmic-200/70">Keywords</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {film.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-cosmic-500/70 bg-cosmic-800/70 px-2.5 py-1 text-xs text-cosmic-100"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
