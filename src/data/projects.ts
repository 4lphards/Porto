export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links?: ProjectLink[];
  icon?: string; // optional emoji/icon for playful vibe
};

export type ProjectCategory = {
  name: string;
  projects: Project[];
};

export const projectCatalog: ProjectCategory[] = [
  {
    name: "Games",
    projects: [
      {
        id: "game-ui",
        title: "Game UI",
        description: "Playful interface for a casual game with animated HUD and menus.",
        technologies: ["TypeScript", "React", "Framer Motion"],
        links: [
          { label: "Demo", url: "#" },
          { label: "Repo", url: "#" },
        ],
        icon: "🎮",
      },
    ],
  },
  {
    name: "Work",
    projects: [
      {
        id: "portfolio",
        title: "Portfolio Website",
        description: "Clean personal portfolio with pastel theme and micro-interactions.",
        technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
        links: [
          { label: "Live", url: "#" },
          { label: "Repo", url: "#" },
        ],
        icon: "💻",
      },
      {
        id: "chatbot",
        title: "Chatbot",
        description: "Conversational AI assistant with tool integrations.",
        technologies: ["Node.js", "OpenAI", "Express"],
        links: [
          { label: "Demo", url: "#" },
          { label: "Repo", url: "#" },
        ],
        icon: "🤖",
      },
    ],
  },
];
