const tools = [
  {
    toolName: "StableDiffusion-CheatSheet",
    toolUrl: "/StableDiffusion-CheatSheet/",
    emoji: "🎨",
    updatedDate: "2024-03-30",
    description: "SD artistical style cheat sheet",
  },
  {
    toolName: "AlternativeTo",
    toolUrl: "https://alternativeto.net/",
    emoji: "🔍",
    updatedDate: "2025-01-20",
    description: "Alternative Software Recommendations",
  },
  {
    toolName: "Gutenberg",
    toolUrl: "https://www.gutenberg.org/",
    emoji: "📚",
    updatedDate: "2025-01-20",
    description: "Free Books",
  },
  {
    toolName: "100font",
    toolUrl: "https://www.100font.com/",
    emoji: "✍️",
    updatedDate: "2025-01-20",
    description: "Free and Open Source Fonts",
  },
  {
    toolName: "PRISM Break",
    toolUrl: "https://prism-break.org/",
    emoji: "⚡️",
    updatedDate: "2025-01-20",
    description: "Privacy Tools",
  },
];
// 按时间倒序排列
tools.sort((a, b) => {
  return new Date(b.updatedDate) - new Date(a.updatedDate);
});

export { tools };
