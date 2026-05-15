import { useEffect, useMemo, useState } from "react";
import type { Film } from "@/types";

interface UseFilmsResult {
  films: Film[];
  loading: boolean;
  error: string | null;
  genres: string[];
  decades: number[];
}

export function useFilms(): UseFilmsResult {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFilms() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/films.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch films: ${response.status}`);
        }

        const data = (await response.json()) as Film[];
        if (!cancelled) {
          setFilms(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error while loading films");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadFilms();

    return () => {
      cancelled = true;
    };
  }, []);

  const genres = useMemo(() => {
    const set = new Set<string>();
    for (const film of films) {
      for (const genre of film.genres) {
        set.add(genre);
      }
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [films]);

  const decades = useMemo(() => {
    const set = new Set<number>();
    for (const film of films) {
      set.add(Math.floor(film.year / 10) * 10);
    }
    return [...set].sort((a, b) => b - a);
  }, [films]);

  return { films, loading, error, genres, decades };
}
