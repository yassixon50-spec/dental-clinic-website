"use client";

import { motion } from "framer-motion";
import { Gift, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui";

export default function PromoBanner() {
  return (
    <section className="py-8 bg-gradient-to-r from-secondary via-emerald-500 to-teal-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 100, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <Gift size={28} />
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={18} />
                <span className="text-sm font-medium text-white/90">Maxsus taklif!</span>
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold">
                Birinchi ko&apos;rik mutlaqo BEPUL!
              </h3>
            </div>
          </div>

          <Button
            href="#appointment"
            variant="primary"
            size="lg"
            icon={<ArrowRight size={20} />}
            className="bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl"
          >
            Hoziroq yoziling
          </Button>
        </div>
      </div>
    </section>
  );
}
