"use client";

import { motion } from "framer-motion";
import { Stethoscope, Sparkles, SmilePlus, Baby, Scan, Syringe, ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimatedSection, Button, Card } from "../ui";

const services = [
  { id: "therapy", icon: Stethoscope, title: "Terapevtik davolash", description: "Kariyes davolash, plomba qo'yish, ildiz kanallari davolash", color: "from-blue-500 to-blue-600", image: "https://i.pinimg.com/736x/7f/83/9d/7f839d7c39da9b46a8a1fd135ea014f8.jpg" },
  { id: "implantation", icon: Syringe, title: "Implantatsiya", description: "Zamonaviy implantlar bilan tishlarni tiklash", color: "from-purple-500 to-purple-600", image: "https://i.pinimg.com/1200x/46/33/af/4633af6728d092c277457565ee5cabd8.jpg" },
  { id: "whitening", icon: Sparkles, title: "Tish oqartirish", description: "Professional oqartirish va estetik xizmatlar", color: "from-amber-500 to-orange-500", image: "https://i.pinimg.com/1200x/c5/a9/90/c5a990bb0814e4a8795e7b7de3b8ba84.jpg" },
  { id: "orthodontics", icon: SmilePlus, title: "Ortodontiya", description: "Breketlar va tish tekislash tizimlari", color: "from-green-500 to-emerald-500", image: "https://i.pinimg.com/1200x/da/c8/aa/dac8aac96996e083deea8b0f40c4fdbe.jpg" },
  { id: "pediatric", icon: Baby, title: "Bolalar stomatologiyasi", description: "Bolalar uchun maxsus yondashuv va davolash", color: "from-pink-500 to-rose-500", image: "https://i.pinimg.com/736x/44/f3/05/44f30531a21be10b8638ebc854a13936.jpg" },
  { id: "diagnostics", icon: Scan, title: "Diagnostika", description: "3D rentgen va zamonaviy diagnostika usullari", color: "from-cyan-500 to-teal-500", image: "https://i.pinimg.com/1200x/81/94/4f/81944f71a8a797238ce266f2a4363206.jpg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
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

export default function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold mb-4 block"
          >
            Xizmatlar
          </motion.span>
          <h2 className="section-title mx-auto">Bizning <span className="text-primary">xizmatlarimiz</span></h2>
          <p className="section-subtitle mx-auto mt-4">Barcha turdagi stomatologiya xizmatlarini bir joyda oling</p>
        </AnimatedSection>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group h-full overflow-hidden p-0">
                <div className="relative h-48 overflow-hidden">
                  {service.image ? (
                    <div className="relative w-full h-full">
                      <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                      <service.icon className="text-white/50" size={64} />
                    </div>
                  )}
                  <motion.div 
                    className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="text-white" size={24} />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="flex gap-3 mt-auto">
                    <Button variant="ghost" size="sm" href={`/services/${service.id}`} className="text-primary">Batafsil</Button>
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <Button size="sm" href="#appointment" icon={<ArrowRight size={16} />}>Yozilish</Button>
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
