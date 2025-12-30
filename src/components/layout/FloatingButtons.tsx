"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3">
      {/* Telegram */}
      <motion.a
        href="https://t.me/dentcare"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { duration: 2, repeat: Infinity } }}
        className="group relative w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <Send size={24} className="text-white" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Telegram
        </span>
        {/* Pulse effect */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#0088cc]"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/998901234567"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { duration: 2, repeat: Infinity, delay: 0.5 } }}
        className="group relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <MessageCircle size={24} className="text-white" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp
        </span>
        {/* Pulse effect */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.a>
    </div>
  );
}
