"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Check, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getServiceById } from "@/lib/services-data";
import { Button } from "@/components/ui";
import { Header, Footer, FloatingButtons } from "@/components/layout";

export default function ServiceDetailPage() {
  const params = useParams();
  const service = getServiceById(params.id as string);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Xizmat topilmadi</h1>
            <Link href="/" className="text-primary hover:underline">
              Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${service.color} py-20 pt-32`}>
        <div className="container-custom">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Barcha xizmatlar</span>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-2xl"
          >
            {service.fullDescription}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Benefits */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-6">Afzalliklar</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm"
                  >
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="text-secondary" size={18} />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Procedures & Prices */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-6">Xizmatlar va narxlar</h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {service.procedures.map((procedure, index) => (
                  <div
                    key={index}
                    className={`p-6 ${index !== service.procedures.length - 1 ? "border-b" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{procedure.name}</h3>
                        <p className="text-gray-600 text-sm">{procedure.description}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock size={16} />
                          <span>{procedure.duration}</span>
                        </div>
                        <span className="font-bold text-primary whitespace-nowrap">
                          {procedure.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-6">Ko&apos;p beriladigan savollar</h2>
              <div className="space-y-4">
                {service.faq.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-5 flex items-center justify-between text-left"
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="text-primary" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={20} />
                      )}
                    </button>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="px-5 pb-5"
                      >
                        <p className="text-gray-600">{item.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
            >
              <h3 className="font-heading font-bold text-xl mb-4">Navbatga yozilish</h3>
              <p className="text-gray-600 mb-6">
                Bepul konsultatsiya uchun hoziroq yoziling. Biz siz bilan 30 daqiqa ichida bog&apos;lanamiz.
              </p>
              <Button href="/#appointment" className="w-full mb-4">
                Navbatga yozilish
              </Button>
              <div className="text-center">
                <span className="text-gray-500 text-sm">yoki qo&apos;ng&apos;iroq qiling</span>
                <a
                  href="tel:+998901234567"
                  className="block text-primary font-semibold text-lg mt-1 hover:underline"
                >
                  +998 90 123 45 67
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <FloatingButtons />
    </>
  );
}
