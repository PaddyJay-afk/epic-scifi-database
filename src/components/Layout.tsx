import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cosmic-950 text-cosmic-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-[-25%] right-[-5%] h-[28rem] w-[28rem] rounded-full bg-cosmic-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,212,255,0.1),transparent_35%),radial-gradient(circle_at_80%_90%,rgba(138,138,219,0.18),transparent_35%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(232,232,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,232,255,0.05)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
