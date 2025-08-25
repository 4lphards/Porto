"use client";
import { motion } from "framer-motion";

const facts = [
  { icon: "💻", text: "Full-stack developer" },
  { icon: "🎮", text: "Gamer" },
  { icon: "☕", text: "Coffee lover" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.35, duration: 0.6 },
  },
} as const;

export default function About() {
  return (
    <section className="section-container py-12 sm:py-16" id="about">
      <div className="rounded-2xl border border-white/50 pastel-surface p-6 sm:p-8 shadow-playful">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">About</h2>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {facts.map((f) => (
            <motion.li
              key={f.text}
              variants={item}
              className="flex items-center gap-3 bg-white/60 dark:bg-white/10 rounded-xl p-4 border border-white/50"
            >
              <span className="text-2xl" aria-hidden>
                {f.icon}
              </span>
              <span className="text-foreground">{f.text}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
