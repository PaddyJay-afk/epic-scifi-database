import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const FilmSchema = z.object({
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
  rating: z
    .object({
      source: z.enum(["tmdb", "imdb", "rt"]),
      value: z.union([z.number(), z.string()]),
    })
    .optional(),
  keywords: z.array(z.string().min(1)).default([]),
  posterPath: z.string().optional(),
  backdropPath: z.string().optional(),
  updatedAt: z.string().datetime(),
});

const FilmArraySchema = z.array(FilmSchema);

async function main() {
  const filmsDir = path.join(root, "data", "films");
  const files = (await fs.readdir(filmsDir))
    .filter((f) => f.endsWith(".json"))
    .sort();

  if (!files.length) {
    throw new Error("No JSON shards found in data/films");
  }

  let total = 0;
  for (const file of files) {
    const raw = await fs.readFile(path.join(filmsDir, file), "utf8");
    const parsed = JSON.parse(raw);
    const validated = FilmArraySchema.parse(parsed);
    total += validated.length;
  }

  console.log(`✅ Data validation passed for ${total} films across ${files.length} shard(s).`);
}

main().catch((err) => {
  console.error("❌ Data validation failed");
  console.error(err);
  process.exit(1);
});
