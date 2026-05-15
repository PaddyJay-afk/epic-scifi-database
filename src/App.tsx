import { useMemo, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { FilmGrid } from "@/components/FilmGrid";
import { FilmModal } from "@/components/FilmModal";
import { StatsBar } from "@/components/StatsBar";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { useFilms } from "@/hooks/useFilms";
import { useSearch } from "@/hooks/useSearch";
import type { Film, FilmStats, SearchFilters, SortOption } from "@/types";

const DEFAULT_FILTERS: SearchFilters = {
  selectedGenres: [],
  decade: null,
  minRating: null,
  sortBy: "relevance",
};

function toRatingNumber(value: Film["rating"]): number | null {
  if (!value) return null;
  if (typeof value.value === "number") return value.value;
  const parsed = Number.parseFloat(value.value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function App() {
  const { films, loading, error, genres, decades } = useFilms();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);

  const { results, loadingIndex } = useSearch({ films, query, filters });

  const stats = useMemo<FilmStats>(() => {
    const visibleRatings = results
      .map((film) => toRatingNumber(film.rating))
      .filter((rating): rating is number => rating !== null);

    const avgYear =
      results.length > 0 ? results.reduce((sum, film) => sum + film.year, 0) / results.length : 0;

    const avgRating =
      visibleRatings.length > 0
        ? visibleRatings.reduce((sum, rating) => sum + rating, 0) / visibleRatings.length
        : null;

    const visibleGenres = new Set<string>();
    for (const film of results) {
      for (const genre of film.genres) {
        visibleGenres.add(genre);
      }
    }

    return {
      totalFilms: films.length,
      visibleFilms: results.length,
      averageYear: avgYear,
      averageRating: avgRating,
      genreCount: visibleGenres.size,
    };
  }, [films.length, results]);

  const resetAll = () => {
    setQuery("");
    setFilters(DEFAULT_FILTERS);
  };

  const toggleGenre = (genre: string) => {
    setFilters((prev) => {
      const exists = prev.selectedGenres.includes(genre);
      return {
        ...prev,
        selectedGenres: exists
          ? prev.selectedGenres.filter((item) => item !== genre)
          : [...prev.selectedGenres, genre],
      };
    });
  };

  const setDecade = (decade: number | null) => {
    setFilters((prev) => ({ ...prev, decade }));
  };

  const setMinRating = (minRating: number | null) => {
    setFilters((prev) => ({ ...prev, minRating }));
  };

  const setSortBy = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  return (
    <Layout>
      <Hero totalFilms={films.length} />

      {error ? (
        <section className="rounded-2xl border border-warning/40 bg-warning/10 p-4 text-warning">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em]">
            <AlertTriangle className="h-4 w-4" /> Data uplink failure
          </p>
          <p className="mt-2 text-sm text-cosmic-50/90">{error}</p>
        </section>
      ) : (
        <>
          <SearchBar
            value={query}
            onChange={setQuery}
            onClear={() => setQuery("")}
            loadingIndex={loadingIndex}
          />

          <FilterPanel
            filters={filters}
            genres={genres}
            decades={decades}
            onToggleGenre={toggleGenre}
            onSetDecade={setDecade}
            onSetMinRating={setMinRating}
            onSetSortBy={setSortBy}
            onReset={resetAll}
          />

          <StatsBar stats={stats} />

          {loading ? (
            <LoadingState />
          ) : results.length === 0 ? (
            <EmptyState onReset={resetAll} />
          ) : (
            <FilmGrid films={results} onSelectFilm={setActiveFilm} />
          )}
        </>
      )}

      <FilmModal film={activeFilm} onClose={() => setActiveFilm(null)} />

      <footer className="mt-4 flex items-center justify-between border-t border-cosmic-700/60 pt-4 text-xs text-cosmic-200/70">
        <p className="font-mono uppercase tracking-[0.14em]">
          Cosmic Archive • Curated Sci-Fi Intelligence
        </p>
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-1.5 rounded-full border border-cosmic-600/70 px-3 py-1 text-xs transition hover:border-accent/60 hover:text-accent"
        >
          <RefreshCw className="h-3.5 w-3.5" /> reset
        </button>
      </footer>
    </Layout>
  );
}
