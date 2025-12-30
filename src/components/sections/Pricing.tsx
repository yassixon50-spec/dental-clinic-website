"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Star } from "lucide-react";
import { AnimatedSection, Button } from "../ui";

const pricingCategories = [
  {
    title: "Terapiya",
    popular: false,
    items: [
      { service: "Konsultatsiya", price: "Bepul" },
      { service: "Plomba (oddiy)", price: "150 000" },
      { service: "Plomba (estetik)", price: "250 000" },
      { service: "Ildiz kanali davolash", price: "300 000" },
    ],
  },
  {
    title: "Implantatsiya",
    popular: true,
    items: [
      { service: "Implant (Koreys)", price: "3 500 000" },
      { service: "Implant (Shveytsariya)", price: "6 000 000" },
      { service: "Toj (metall-keramika)", price: "800 000" },
      { service: "Toj (sirkoniy)", price: "1 500 000" },
    ],
  },
  {
    title: "Estetika",
    popular: false,
    items: [
      { service: "Tish oqartirish", price: "500 000" },
      { service: "Professional tozalash", price: "200 000" },
      { service: "Vinir (1 dona)", price: "1 200 000" },
      { service: "Tish toshi tozalash", price: "150 000" },
    ],
  },
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
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="text-primary font-semibold mb-4 block"
          >
            Narxlar
          </motion.span>
          <h2 className="section-title mx-auto dark:text-white">
            Shaffof <span className="text-primary">narx siyosati</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 dark:text-gray-400">
            Yashirin to&apos;lovlarsiz, aniq narxlar
          </p>
        </AnimatedSection>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {pricingCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0_0_0/0.08)] hover:shadow-[0_20px_50px_rgb(0_0_0/0.15)] transition-shadow ${
                category.popular ? "ring-2 ring-secondary" : ""
              }`}
            >
              {/* Popular badge */}
              {category.popular && (
                <motion.div 
                  initial={{ x: 100, rotate: 45 }}
                  animate={{ x: 0, rotate: 45 }}
                  className="absolute top-6 -right-8 bg-secondary text-white text-xs font-bold px-10 py-1 transform rotate-45 shadow-lg"
                >
                  <span className="flex items-center gap-1">
                    <Star size={12} fill="white" /> MASHHUR
                  </span>
                </motion.div>
              )}

              {/* Header */}
              <div className={`relative p-6 text-white overflow-hidden ${
                category.popular 
                  ? "bg-gradient-to-r from-secondary to-amber-500" 
                  : "bg-gradient-to-r from-primary to-primary-dark"
              }`}>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <h3 className="font-heading font-semibold text-xl relative z-10 flex items-center gap-2">
                  {category.popular && <Sparkles size={20} />}
                  {category.title}
                </h3>
              </div>

              {/* Items */}
              <div className="p-6">
                <ul className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      whileHover={{ x: 8, backgroundColor: "rgba(14, 165, 233, 0.05)" }}
                      className="flex items-center justify-between py-3 px-2 rounded-lg border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="text-secondary" size={18} />
                        </motion.div>
                        <span className="text-gray-700 dark:text-gray-300">{item.service}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.price === "Bepul" ? (
                          <motion.span 
                            className="text-secondary"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {item.price}
                          </motion.span>
                        ) : (
                          <>{item.price} so&apos;m</>
                        )}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    href="#appointment"
                    variant={category.popular ? "secondary" : "outline"}
                    className="w-full mt-6"
                    icon={<ArrowRight size={18} />}
                  >
                    Yozilish
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <motion.p 
            className="text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            * Narxlar taxminiy. Aniq narx shifokor ko&apos;rigidan keyin belgilanadi.
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
}
