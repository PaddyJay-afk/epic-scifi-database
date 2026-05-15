import { z } from "zod";

export const RatingSchema = z.object({
  source: z.enum(["tmdb", "imdb", "rt"]),
  value: z.union([z.number(), z.string()]),
});

export const FilmSchema = z.object({
  id: z.string().min(1),
  tmdbId: z.number().int().positive().optional(),
  imdbId: z.string().optional(),
  title: z.string().min(1),
  originalTitle: z.string().optional(),
  year: z.number().int().min(1888).max(2100),
  runtimeMin: z.number().int().positive().optional(),
  genres: z.array(z.string().min(1)).default([]),
  directors: z.array(z.string().min(1)).default([]),
  cast: z.array(z.string().min(1)).default([]),
  synopsisShort: z.string().min(1),
  synopsisLong: z.string().optional(),
  rating: RatingSchema.optional(),
  keywords: z.array(z.string().min(1)).default([]),
  posterPath: z.string().optional(),
  backdropPath: z.string().optional(),
  updatedAt: z.string().datetime(),
});

export const FilmArraySchema = z.array(FilmSchema);
export type Film = z.infer<typeof FilmSchema>;
export type Rating = z.infer<typeof RatingSchema>;
