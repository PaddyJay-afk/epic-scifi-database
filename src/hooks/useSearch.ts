import { useEffect, useMemo, useState } from "react";
import MiniSearch from "minisearch";
import type { Film, SearchDocument, SearchFilters } from "@/types";

interface UseSearchParams {
  films: Film[];
  query: string;
  filters: SearchFilters;
}

interface UseSearchResult {
  results: Film[];
  loadingIndex: boolean;
  searchReady: boolean;
}

function toRatingNumber(film: Film): number {
  const value = film.rating?.value;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function matchesFallbackQuery(film: Film, normalizedQuery: string): boolean {
  const haystack = [
    film.title,
    film.synopsisShort,
    film.synopsisLong ?? "",
    film.directors.join(" "),
    film.cast.join(" "),
    film.genres.join(" "),
    film.keywords.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

function applySort(films: Film[], sortBy: SearchFilters["sortBy"]): Film[] {
  const sorted = [...films];

  sorted.sort((a, b) => {
    switch (sortBy) {
      case "year-desc":
        return b.year - a.year;
      case "year-asc":
        return a.year - b.year;
      case "rating-desc":
        return toRatingNumber(b) - toRatingNumber(a);
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "relevance":
      default:
        return b.year - a.year;
    }
  });

  return sorted;
}

export function useSearch({ films, query, filters }: UseSearchParams): UseSearchResult {
  const [miniSearch, setMiniSearch] = useState<MiniSearch<SearchDocument> | null>(null);
  const [loadingIndex, setLoadingIndex] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadIndex() {
      try {
        setLoadingIndex(true);

        const response = await fetch("/search-index.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch search index: ${response.status}`);
        }

        const serializedIndex = await response.text();

        const index = MiniSearch.loadJSON<SearchDocument>(serializedIndex, {
          fields: ["title", "directors", "cast", "synopsisShort", "keywords", "genres"],
          storeFields: ["id"],
          idField: "id",
          searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: {
              title: 3,
              keywords: 2,
              genres: 1.8,
              directors: 1.5,
              cast: 1.2,
              synopsisShort: 1,
            },
          },
        });

        if (!cancelled) {
          setMiniSearch(index);
        }
      } catch {
        if (!cancelled) {
          setMiniSearch(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingIndex(false);
        }
      }
    }

    void loadIndex();

    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let filtered = films.filter((film) => {
      const matchesGenre =
        filters.selectedGenres.length === 0 ||
        filters.selectedGenres.every((genre) => film.genres.includes(genre));

      const filmDecade = Math.floor(film.year / 10) * 10;
      const matchesDecade = filters.decade === null || filmDecade === filters.decade;

      const rating = toRatingNumber(film);
      const matchesRating = filters.minRating === null || rating >= filters.minRating;

      return matchesGenre && matchesDecade && matchesRating;
    });

    if (!normalizedQuery) {
      if (filters.sortBy === "relevance") {
        return applySort(filtered, "year-desc");
      }
      return applySort(filtered, filters.sortBy);
    }

    if (miniSearch) {
      const ranked = miniSearch.search(normalizedQuery, {
        prefix: (term, index, terms) => index === terms.length - 1 || term.length > 3,
        fuzzy: (term) => (term.length > 4 ? 0.2 : 0),
      });

      const rankMap = new Map<string, number>();
      ranked.forEach((entry, index) => {
        rankMap.set(String(entry.id), index);
      });

      filtered = filtered.filter((film) => rankMap.has(film.id));

      if (filters.sortBy === "relevance") {
        filtered.sort((a, b) => (rankMap.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (rankMap.get(b.id) ?? Number.MAX_SAFE_INTEGER));
        return filtered;
      }

      return applySort(filtered, filters.sortBy);
    }

    filtered = filtered.filter((film) => matchesFallbackQuery(film, normalizedQuery));

    if (filters.sortBy === "relevance") {
      return applySort(filtered, "year-desc");
    }

    return applySort(filtered, filters.sortBy);
  }, [films, filters, miniSearch, query]);

  return {
    results,
    loadingIndex,
    searchReady: Boolean(miniSearch),
  };
}
