"use client";

import { motion } from "framer-motion";
import { Shield, Stethoscope, Sparkles, Heart, CheckCircle, Play } from "lucide-react";
import Image from "next/image";
import { AnimatedSection } from "../ui";

const advantages = [
  { icon: Stethoscope, title: "Tajribali shifokorlar", description: "15+ yillik tajribaga ega mutaxassislar jamoasi" },
  { icon: Sparkles, title: "Zamonaviy uskunalar", description: "Eng so'nggi texnologiyalar va uskunalar bilan jihozlangan" },
  { icon: Shield, title: "To'liq sterillik", description: "Xalqaro standartlarga mos sterilizatsiya tizimi" },
  { icon: Heart, title: "Bolalar uchun qulay", description: "Bolalar uchun maxsus yondashuv va qulay muhit" },
];

const features = ["Og'riqsiz davolash usullari", "Shaxsiy yondashuv har bir bemorga", "Qulay to'lov shartlari", "Bepul konsultatsiya"];

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-semibold mb-4 block"
            >
              Biz haqimizda
            </motion.span>
            <h2 className="section-title">15 yildan ortiq <span className="text-primary">ishonchli xizmat</span></h2>
            <p className="section-subtitle mb-8">
              DentCare klinikasi 2009 yildan beri Toshkent aholisiga yuqori sifatli stomatologiya xizmatlarini taqdim etib kelmoqda. Bizning maqsadimiz — har bir bemorga individual yondashuv va eng yaxshi natijalarni ta&apos;minlash.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }} 
                  whileHover={{ x: 5, color: "#0ea5e9" }}
                  className="flex items-center gap-3 cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  </motion.div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgb(0 0 0 / 0.1)" }}
              transition={{ type: "spring" as const, stiffness: 300 }}
            >
              <motion.div 
                className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="text-primary" size={32} />
              </motion.div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Sertifikatlangan klinika</h4>
                <p className="text-gray-600 text-sm">ISO 9001:2015 xalqaro sertifikatiga ega</p>
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring" as const, stiffness: 200 }}
              >
                <div className="relative w-full h-[500px]">
                  <Image src="https://i.pinimg.com/1200x/7a/a0/d3/7aa0d3e9f723f9ca77563492b7cc40aa.jpg" alt="DentCare klinikasi" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  
                  {/* Play button overlay */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl"
                    >
                      <Play size={32} className="text-primary ml-1" fill="currentColor" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.4 }} 
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="text-white" size={28} />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-3xl font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    >
                      15,000+
                    </motion.p>
                    <p className="text-gray-600 text-sm">Mamnun bemorlar</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.5 }} 
                whileHover={{ scale: 1.05, x: 5 }}
                className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-4 hidden lg:block"
              >
                <div className="space-y-3">
                  {advantages.slice(0, 3).map((advantage, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 360, backgroundColor: "rgba(14, 165, 233, 0.2)" }}
                        transition={{ duration: 0.5 }}
                      >
                        <advantage.icon className="text-primary" size={20} />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-700">{advantage.title}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
