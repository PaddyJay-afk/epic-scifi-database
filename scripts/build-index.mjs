import fs from "node:fs/promises";
import path from "node:path";
import MiniSearch from "minisearch";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

async function readFilmShards() {
  const filmsDir = path.join(root, "data", "films");
  const files = (await fs.readdir(filmsDir))
    .filter((f) => f.endsWith(".json"))
    .sort();

  const all = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(filmsDir, file), "utf8");
    const parsed = JSON.parse(raw);
    all.push(...parsed);
  }
  return all;
}

async function main() {
  const films = await readFilmShards();

  const miniSearch = new MiniSearch({
    fields: ["title", "directors", "cast", "synopsisShort", "keywords", "genres"],
    storeFields: [
      "id", "title", "year", "directors", "cast", "genres",
      "synopsisShort", "posterPath", "rating", "keywords",
    ],
    searchOptions: {
      boost: { title: 3, directors: 2, keywords: 2, cast: 1.5 },
      fuzzy: 0.3,
      prefix: true,
    },
  });

  miniSearch.addAll(films);

  const indexDir = path.join(root, "public");
  await fs.mkdir(indexDir, { recursive: true });

  const indexPath = path.join(indexDir, "search-index.json");
  await fs.writeFile(indexPath, JSON.stringify(miniSearch.toJSON()));

  // Also write a flat films.json for direct access
  const filmsPath = path.join(indexDir, "films.json");
  await fs.writeFile(filmsPath, JSON.stringify(films));

  console.log(
    `✅ Search index built: ${films.length} films indexed → ${indexPath}`
  );
}

main().catch((err) => {
  console.error("❌ Index build failed");
  console.error(err);
  process.exit(1);
});
