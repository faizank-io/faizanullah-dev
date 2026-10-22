// Case studies for AI / automation work.

export const aiProjectDetails = {
  "tiger-ai-assistant": {
    title: "TIGER — AI Voice Assistant",
    subtitle: "Real-Time Desktop AI Assistant with a Holographic HUD, Voice Control & Computer Automation",
    liveUrl: null,
    githubUrl: null,
    techStack: ["Python", "Gemini Live API", "PyQt6", "sounddevice", "psutil", "Voice AI"],
    badge: "AI Assistant · Demo Video",
    credit:
      "Built on the open-source MARK LV (JARVIS) project by FatihMakes, licensed CC BY-NC 4.0.",
    metrics: [
      { label: "Interface", value: "Voice + text", unit: "" },
      { label: "AI engine", value: "Gemini Live", unit: "streaming" },
      { label: "Understands", value: "EN + Urdu", unit: "replies in EN" },
      { label: "Platform", value: "Desktop", unit: "Win · macOS · Linux" },
    ],
    overview:
      "TIGER is a personal AI assistant for the desktop. It listens for voice or typed commands, answers out loud with a lip-synced holographic avatar, and acts on the computer — opening apps, searching the web, reading the news and weather, handling files and reporting on system health. It understands English and Urdu and replies in clear English, and the full-screen HUD shows everything it is doing in real time.",
    architecture: {
      description:
        "A Python application with a PyQt6 heads-up display. Microphone audio is streamed to the Gemini Live API for native speech-to-speech conversation, while typed commands go through the same pipeline. The model calls into a set of action modules — browser control, file handling, web search, weather, YouTube, reminders, screen reading and system monitoring — and their results are spoken back and shown in the HUD panels.",
      flow: [
        "Voice / Typed Command",
        "Gemini Live API",
        "Tool Call",
        "Action Module",
        "Spoken Reply + Avatar",
        "HUD Panels Update",
      ],
      highlights: [
        "Speech-to-speech conversation over the Gemini Live API, with typed commands as an alternative",
        "Holographic avatar with lip-sync, plus LISTENING / SPEAKING states so you always know what it's doing",
        "Live system monitor for CPU, memory, network and uptime, with spoken warnings when resources run low",
        "Action modules for apps, browser, files, web search, news, weather, YouTube and reminders",
      ],
    },
    challenges: [],
    features: [
      { title: "Voice Conversation", description: "Talk naturally and get spoken answers in real time — in English or Urdu, answered in English." },
      { title: "Computer Control", description: "Open applications, control the browser, manage files and play videos by voice." },
      { title: "Live Information", description: "Weather, top news by topic and web search results shown directly in the HUD." },
      { title: "System Monitor", description: "CPU, memory and network usage tracked live, with alerts when something needs attention." },
      { title: "File Understanding", description: "Drop in images, PDFs, documents, code or data files and ask questions about them." },
    ],
    codeSnippet: null,
  },
};
