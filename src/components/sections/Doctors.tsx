"use client";

import { motion } from "framer-motion";
import { Award, Calendar, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { AnimatedSection, Card } from "../ui";

const doctors = [
  { name: "Dr. Aziz Karimov", specialization: "Bosh shifokor, Implantolog", experience: 15, image: "https://i.pinimg.com/736x/dc/52/82/dc5282f0620e844afd28e5314d2446ff.jpg" },
  { name: "Dr. Nilufar Rahimova", specialization: "Ortodont", experience: 12, image: "https://i.pinimg.com/736x/66/e7/60/66e7603717030e2c41cd035a0a2a48ab.jpg" },
  { name: "Dr. Jasur Toshmatov", specialization: "Terapevt", experience: 10, image: "https://i.pinimg.com/736x/18/e4/d5/18e4d582221c40f2f1f7eaa72c4b312d.jpg" },
  { name: "Dr. Madina Aliyeva", specialization: "Bolalar stomatoligi", experience: 8, image: "https://i.pinimg.com/1200x/8b/b4/f7/8bb4f765b0ca4cf8166a3b5131fcd207.jpg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateY: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function Doctors() {
  return (
    <section id="doctors" className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 200 }}
            className="text-primary font-semibold mb-4 block"
          >
            Jamoa
          </motion.span>
          <h2 className="section-title mx-auto">Bizning <span className="text-primary">shifokorlarimiz</span></h2>
          <p className="section-subtitle mx-auto mt-4">Tajribali va malakali mutaxassislar jamoasi</p>
        </AnimatedSection>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {doctors.map((doctor, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group text-center overflow-hidden p-0">
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  {doctor.image ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={doctor.image} 
                        alt={doctor.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover overlay with actions */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent flex flex-col items-center justify-end pb-6 gap-3"
                  >
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Phone size={18} className="text-primary" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <MessageCircle size={18} className="text-primary" />
                      </motion.button>
                    </div>
                    <span className="text-white font-medium">Profil ko&apos;rish</span>
                  </motion.div>

                  {/* Experience badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" as const }}
                    className="absolute top-3 right-3 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-xs font-bold">{doctor.experience}+</span>
                  </motion.div>
                </div>
                <div className="p-6">
                  <motion.h3 
                    className="font-heading font-semibold text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    {doctor.name}
                  </motion.h3>
                  <p className="text-primary text-sm mb-4">{doctor.specialization}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1, color: "#0ea5e9" }}
                    >
                      <Calendar size={16} />
                      <span>{doctor.experience} yil</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1, color: "#f59e0b" }}
                    >
                      <Award size={16} />
                      <span>Sertifikat</span>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
