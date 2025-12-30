"use client";

import { motion } from "framer-motion";
import { Zap, Heart, Shield, Wallet, Cpu, Clock } from "lucide-react";
import { AnimatedSection } from "../ui";

const reasons = [
  { icon: Zap, title: "Og'riqsiz davolash", description: "Zamonaviy anesteziya usullari bilan og'riqsiz davolash kafolatlanadi", color: "bg-amber-500", hoverColor: "group-hover:bg-amber-600" },
  { icon: Heart, title: "Individual yondashuv", description: "Har bir bemor uchun shaxsiy davolash rejasi tuziladi", color: "bg-rose-500", hoverColor: "group-hover:bg-rose-600" },
  { icon: Shield, title: "Kafolat", description: "Barcha ishlarimizga 5 yilgacha kafolat beramiz", color: "bg-emerald-500", hoverColor: "group-hover:bg-emerald-600" },
  { icon: Wallet, title: "Halol narxlar", description: "Yashirin to'lovlarsiz, shaffof narx siyosati", color: "bg-blue-500", hoverColor: "group-hover:bg-blue-600" },
  { icon: Cpu, title: "Zamonaviy texnologiya", description: "Eng so'nggi uskunalar va materiallar bilan ishlaymiz", color: "bg-purple-500", hoverColor: "group-hover:bg-purple-600" },
  { icon: Clock, title: "Qulay vaqt", description: "Sizga qulay vaqtda qabul qilamiz, haftaning 6 kuni", color: "bg-cyan-500", hoverColor: "group-hover:bg-cyan-600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function WhyUs() {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="text-primary font-semibold mb-4 block"
          >
            Afzalliklar
          </motion.span>
          <h2 className="section-title mx-auto">Nega aynan <span className="text-primary">bizni tanlashingiz kerak?</span></h2>
          <p className="section-subtitle mx-auto mt-4">Biz bilan ishlashning asosiy afzalliklari</p>
        </AnimatedSection>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              className="group flex gap-5 p-6 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0_0_0/0.08)] hover:shadow-[0_20px_50px_rgb(0_0_0/0.15)] transition-all cursor-pointer"
            >
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 ${reason.color} ${reason.hoverColor} rounded-xl flex items-center justify-center flex-shrink-0 transition-colors shadow-lg`}
              >
                <reason.icon className="text-white" size={28} />
              </motion.div>
              <div>
                <motion.h3 
                  className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors"
                >
                  {reason.title}
                </motion.h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
              </div>
              
              {/* Hover indicator */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-b-2xl"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
