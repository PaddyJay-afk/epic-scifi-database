export type RatingSource = "tmdb" | "imdb" | "rt";

export interface Rating {
  source: RatingSource;
  value: number | string;
}

export interface Film {
  id: string;
  title: string;
  year: number;
  directors: string[];
  cast: string[];
  genres: string[];
  synopsisShort: string;
  synopsisLong?: string;
  keywords: string[];
  posterPath?: string;
  backdropPath?: string;
  rating?: Rating;
  updatedAt: string;
}

export interface SearchDocument {
  id: string;
  title: string;
  directors: string[];
  cast: string[];
  synopsisShort: string;
  keywords: string[];
  genres: string[];
}

export type SortOption = "relevance" | "year-desc" | "year-asc" | "rating-desc" | "title-asc";

export interface SearchFilters {
  selectedGenres: string[];
  decade: number | null;
  minRating: number | null;
  sortBy: SortOption;
}

export interface FilmStats {
  totalFilms: number;
  visibleFilms: number;
  averageYear: number;
  averageRating: number | null;
  genreCount: number;
}
