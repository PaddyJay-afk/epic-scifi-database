import { motion } from "framer-motion";
import { BarChart3, CalendarRange, Layers3, Star } from "lucide-react";
import type { FilmStats } from "@/types";

interface StatsBarProps {
  stats: FilmStats;
}

function statValue(value: number | null, digits = 0): string {
  if (value === null || Number.isNaN(value)) return "—";
  return value.toFixed(digits);
}

export function StatsBar({ stats }: StatsBarProps) {
  const items = [
    {
      label: "Visible",
      value: `${stats.visibleFilms}/${stats.totalFilms}`,
      icon: BarChart3,
      tone: "text-accent",
    },
    {
      label: "Avg Year",
      value: statValue(stats.averageYear),
      icon: CalendarRange,
      tone: "text-cosmic-100",
    },
    {
      label: "Avg Rating",
      value: statValue(stats.averageRating, 1),
      icon: Star,
      tone: "text-warning",
    },
    {
      label: "Genres",
      value: String(stats.genreCount),
      icon: Layers3,
      tone: "text-cosmic-100",
    },
  ];

  return (
    <motion.section
      className="grid grid-cols-2 gap-3 rounded-2xl border border-cosmic-600/70 bg-cosmic-900/45 p-4 backdrop-blur sm:grid-cols-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="rounded-xl border border-cosmic-700/80 bg-cosmic-800/40 px-3 py-2">
            <p className="font-mono text-[0.63rem] uppercase tracking-[0.18em] text-cosmic-200/65">{item.label}</p>
            <p className={`mt-1 inline-flex items-center gap-1.5 font-display text-lg ${item.tone}`}>
              <Icon className="h-4 w-4" />
              {item.value}
            </p>
          </div>
        );
      })}
    </motion.section>
  );
}
