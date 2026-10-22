"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { portfolioData } from "@/data/portfolio";

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const { contact } = portfolioData.profile;

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));

  const href = `${contact.whatsapp}?text=${encodeURIComponent("Hi Faizan, I found your portfolio and would like to discuss a project.")}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Faizan on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-[#06290f] shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
        >
          <FaWhatsapp className="h-6 w-6" />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40 group-hover:pr-1 sm:inline">
            Let&apos;s chat
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
