import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="font-sans min-h-screen py-10 sm:py-12 space-y-8 sm:space-y-10">
      <Hero />
      <Projects />
      <About />
      <Contact />
      <footer className="section-container py-10 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Built with Next.js, Tailwind CSS, and Framer Motion. <span role="img" aria-label="robot">🤖</span>
        </p>
      </footer>
    </main>
  );
}
