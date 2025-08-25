"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  return (
    <section className="section-container py-12 sm:py-16" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-foreground">Contact</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Have a question or want to work together? Drop a message.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>💌 Email: <a className="text-primary hover:underline" href="mailto:myalghani@gmail.com">myalghani@gmail.com</a></li>
            <li>📸 Instagram: <a className="text-primary hover:underline" href="https://instagram.com/madegarsc" target="_blank" rel="noopener noreferrer">@madegarsc</a></li>
          </ul>
        </div>

        <motion.form
          onSubmit={async (e) => {
            e.preventDefault();
            setStatus(null);
            setLoading(true);
            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
              });
              if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || "Failed to send message");
              }
              setStatus({ ok: true, msg: "Thanks! Your message has been sent." });
              setName("");
              setEmail("");
              setSubject("");
              setMessage("");
            } catch (err) {
              const msg = err instanceof Error ? err.message : "Something went wrong.";
              setStatus({ ok: false, msg });
            } finally {
              setLoading(false);
            }
          }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="card bg-white/70 dark:bg-white/10 border border-white/50 p-6 backdrop-blur"
        >
          <label className="block text-sm font-medium text-foreground">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-2xl border border-black/10 dark:border-white/20 bg-white/80 dark:bg-white/5 p-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <label className="block text-sm font-medium text-foreground mt-4">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-2xl border border-black/10 dark:border-white/20 bg-white/80 dark:bg-white/5 p-3 outline-none focus:ring-2 focus:ring-accent"
          />

          <label className="block text-sm font-medium text-foreground mt-4">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Portfolio Contact"
            className="mt-1 w-full rounded-2xl border border-black/10 dark:border-white/20 bg-white/80 dark:bg-white/5 p-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <label className="block text-sm font-medium text-foreground mt-4">Message</label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-black/10 dark:border-white/20 bg-white/80 dark:bg-white/5 p-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <motion.button
            type="submit"
            whileHover={{ rotate: [-1, 1, -1], transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="btn-primary mt-5 px-6 py-3 rounded-2xl shadow-playful inline-flex items-center gap-2 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Say hi 👋"}
          </motion.button>

          <div aria-live="polite" className="mt-4 min-h-6">
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={status.ok ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}
              >
                {status.msg}
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
