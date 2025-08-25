"use client";
import { motion } from "framer-motion";
import { projectCatalog } from "@/data/projects";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.6 },
  },
} as const;

export default function Projects() {
  return (
    <section className="section-container py-12 sm:py-16" id="projects">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground">Projects</h2>
      <div className="space-y-8">
        {projectCatalog.map((cat) => (
          <div key={cat.name} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">{cat.name}</h3>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {cat.projects.map((p) => (
                <motion.article
                  key={p.id}
                  variants={item}
                  whileHover={{ rotate: [-0.6, 0.6, -0.6], transition: { duration: 0.35 } }}
                  className="card pastel-surface p-5 sm:p-6 border border-white/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl" aria-hidden>{p.icon ?? "💻"}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{p.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{p.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-white/10 border border-white/50">
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.links && p.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {p.links.map((l, idx) => (
                        <a
                          key={`${p.id}-${idx}-${l.label}`}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
