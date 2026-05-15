import { AnimatePresence } from "framer-motion";
import type { Film } from "@/types";
import { FilmCard } from "@/components/FilmCard";

interface FilmGridProps {
  films: Film[];
  onSelectFilm: (film: Film) => void;
}

export function FilmGrid({ films, onSelectFilm }: FilmGridProps) {
  return (
    <section aria-label="Film results">
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {films.map((film, index) => (
            <FilmCard key={film.id} film={film} index={index} onSelect={onSelectFilm} />
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
}
