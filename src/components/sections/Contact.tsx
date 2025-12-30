"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { AnimatedSection, Card } from "../ui";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+998 90 123 45 67",
    href: "tel:+998901234567",
    color: "bg-blue-500",
  },
  {
    icon: Send,
    title: "Telegram",
    value: "@dentcare",
    href: "https://t.me/dentcare",
    color: "bg-[#0088cc]",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+998 90 123 45 67",
    href: "https://wa.me/998901234567",
    color: "bg-[#25D366]",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@dentcare.uz",
    href: "mailto:info@dentcare.uz",
    color: "bg-red-500",
  },
];

const workingHours = [
  { day: "Dushanba - Juma", hours: "9:00 - 18:00" },
  { day: "Shanba", hours: "9:00 - 15:00" },
  { day: "Yakshanba", hours: "Dam olish" },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold mb-4 block">Aloqa</span>
          <h2 className="section-title mx-auto dark:text-white">
            Biz bilan <span className="text-primary">bog&apos;laning</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 dark:text-gray-400">
            Savollaringiz bo&apos;lsa, biz bilan bog&apos;laning
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -5 }}
                    className="block"
                  >
                    <Card className="text-center h-full">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <item.icon className="text-white" size={24} />
                      </motion.div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.value}</p>
                    </Card>
                  </motion.a>
                </AnimatedSection>
              ))}
            </div>

            {/* Address & Working Hours */}
            <AnimatedSection delay={0.4}>
              <Card>
                <div className="flex items-start gap-4 mb-6 pb-6 border-b dark:border-gray-700">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Manzil</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Toshkent shahri, Chilonzor tumani,<br />
                      1-mavze, 15-uy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Ish vaqti</h4>
                    <ul className="space-y-2">
                      {workingHours.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{item.day}</span>
                          <span className={item.hours === "Dam olish" ? "text-red-500" : "text-gray-900 dark:text-white font-medium"}>
                            {item.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Map */}
          <AnimatedSection delay={0.2}>
            <div className="h-full min-h-[400px] bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0_0_0/0.08)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0234567890123!2d69.2034567!3d41.3112345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjQiTiA2OcKwMTInMTIuNCJF!5e0!3m2!1sen!2s!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DentCare Location"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
