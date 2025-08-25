"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="section-container pt-16 sm:pt-24 pb-10 text-center">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-2"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Hi, I’m <span className="text-primary">Maulana Yusuf</span> 👋
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Programmer & Gamer
          </p>
        </motion.div>

        <motion.div
          className="relative"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-playful pastel-surface border border-white/40 backdrop-blur">
            <span className="text-5xl" role="img" aria-label="developer">
              👨‍💻
            </span>
          </div>
        </motion.div>

        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("contact");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          whileHover={{ rotate: [-1, 1, -1], transition: { duration: 0.4 } }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary px-6 py-3 rounded-2xl shadow-playful inline-flex items-center gap-2"
        >
          Get in touch <span>📬</span>
        </motion.a>
      </div>
    </section>
  );
}
