import { SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";
import type { SearchFilters, SortOption } from "@/types";

interface FilterPanelProps {
  filters: SearchFilters;
  genres: string[];
  decades: number[];
  onToggleGenre: (genre: string) => void;
  onSetDecade: (decade: number | null) => void;
  onSetMinRating: (rating: number | null) => void;
  onSetSortBy: (sortBy: SortOption) => void;
  onReset: () => void;
}

const SORT_OPTIONS: Array<{ label: string; value: SortOption }> = [
  { label: "Relevance", value: "relevance" },
  { label: "Year (Newest)", value: "year-desc" },
  { label: "Year (Oldest)", value: "year-asc" },
  { label: "Rating", value: "rating-desc" },
  { label: "Title", value: "title-asc" },
];

export function FilterPanel({
  filters,
  genres,
  decades,
  onToggleGenre,
  onSetDecade,
  onSetMinRating,
  onSetSortBy,
  onReset,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.selectedGenres.length > 0 || filters.decade !== null || filters.minRating !== null || filters.sortBy !== "relevance";

  return (
    <motion.section
      className="rounded-3xl border border-cosmic-600/70 bg-cosmic-900/40 p-4 shadow-[0_0_30px_rgba(0,212,255,0.12)] backdrop-blur-md sm:p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.18em] text-cosmic-100">
          <SlidersHorizontal className="h-4 w-4 text-accent" />
          Filters
        </h2>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-cosmic-500/70 px-3 py-1 text-xs text-cosmic-100 transition hover:border-accent/60 hover:text-accent"
          >
            <X className="h-3.5 w-3.5" /> Reset
          </button>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cosmic-200/70">Genre</p>
          <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-1">
            {genres.map((genre) => {
              const active = filters.selectedGenres.includes(genre);
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => onToggleGenre(genre)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    active
                      ? "border-accent/70 bg-accent/20 text-accent"
                      : "border-cosmic-600/70 bg-cosmic-800/50 text-cosmic-100 hover:border-cosmic-400"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cosmic-200/70">Decade</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => onSetDecade(null)}
              className={`rounded-xl border px-3 py-1.5 text-xs transition ${
                filters.decade === null
                  ? "border-accent/70 bg-accent/20 text-accent"
                  : "border-cosmic-600/70 bg-cosmic-800/50 text-cosmic-100 hover:border-cosmic-400"
              }`}
            >
              Any
            </button>
            {decades.map((decade) => (
              <button
                key={decade}
                type="button"
                onClick={() => onSetDecade(decade)}
                className={`rounded-xl border px-3 py-1.5 text-xs transition ${
                  filters.decade === decade
                    ? "border-accent/70 bg-accent/20 text-accent"
                    : "border-cosmic-600/70 bg-cosmic-800/50 text-cosmic-100 hover:border-cosmic-400"
                }`}
              >
                {decade}s
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cosmic-200/70">Minimum Rating</p>
            <div className="flex gap-2">
              {[null, 6, 7, 8, 9].map((rating) => {
                const label = rating === null ? "Any" : `${rating}+`;
                const active = filters.minRating === rating;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onSetMinRating(rating)}
                    className={`rounded-xl border px-3 py-1.5 text-xs transition ${
                      active
                        ? "border-accent/70 bg-accent/20 text-accent"
                        : "border-cosmic-600/70 bg-cosmic-800/50 text-cosmic-100 hover:border-cosmic-400"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cosmic-200/70">Sort</p>
            <select
              value={filters.sortBy}
              onChange={(event) => onSetSortBy(event.target.value as SortOption)}
              className="h-10 w-full rounded-xl border border-cosmic-600/80 bg-cosmic-800/60 px-3 text-sm text-cosmic-50 focus:border-accent/70 focus:outline-none focus:ring-2 focus:ring-accent/35"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
