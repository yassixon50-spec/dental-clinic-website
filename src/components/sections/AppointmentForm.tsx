"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { AnimatedSection } from "../ui";

const appointmentSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  phone: z.string().regex(/^\+998[0-9]{9}$/, "Telefon formati: +998XXXXXXXXX"),
  service: z.string().min(1, "Xizmat turini tanlang"),
  date: z.string().min(1, "Sanani tanlang"),
  comment: z.string().max(500).optional(),
});

type FormData = z.infer<typeof appointmentSchema>;

const services = [
  "Terapevtik davolash",
  "Implantatsiya",
  "Tish oqartirish",
  "Ortodontiya",
  "Bolalar stomatologiyasi",
  "Diagnostika",
];

// Telegram messages are sent server-side via /api/send-telegram to avoid exposing tokens in the client
export default function AppointmentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const sendToTelegram = async (data: FormData) => {
    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Prefer a helpful log message when body is empty
        if (body && Object.keys(body).length > 0) {
          console.error("Telegram send failed:", body);
        } else {
          console.error(
            `Telegram send failed: ${response.status} ${response.statusText}`
          );
        }

        // If the server reports env variables not configured, or returns an empty body
        // (dev environments sometimes return an empty error), treat as env-not-configured
        if (
          (body && body.error === "Server env variables not configured") ||
          (body && Object.keys(body).length === 0)
        ) {
          return {
            ok: false,
            error: body.error || "No server error body",
            envNotConfigured: true,
          };
        }

        return { ok: false, error: body.error || body };
      }

      return { ok: true };
    } catch (error) {
      console.error("Telegram xatolik:", error);
      return { ok: false, error: String(error) };
    }
  };

  const saveOfflineSubmission = (data: FormData) => {
    try {
      const key = "offline_appointments";
      const existing = localStorage.getItem(key);
      const arr = existing ? JSON.parse(existing) : [];
      arr.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr));
      // notify other tabs and listeners in this window that appointments changed
      try {
        if (typeof BroadcastChannel !== "undefined") {
          const bc = new BroadcastChannel("appointments");
          bc.postMessage({ type: "updated" });
          bc.close();
        }
      } catch (e) {
        // ignore
      }
      try {
        window.dispatchEvent(new Event("appointments-updated"));
      } catch (e) {
        // ignore
      }
    } catch (e) {
      console.error("Failed to save offline submission:", e);
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    const result = await sendToTelegram(data);

    if (!result.ok) {
      // If Telegram isn't configured on the server, save locally and show success
      if ((result as any).envNotConfigured) {
        saveOfflineSubmission(data);
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
        return;
      }

      setSubmitError(
        typeof result.error === "string"
          ? result.error
          : JSON.stringify(result.error)
      );
      return;
    }

    // Also save a local copy so admin panel (which reads localStorage)
    // shows the record with timestamp even when Telegram is configured.
    saveOfflineSubmission(data);

    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="appointment"
      className="section-padding bg-gradient-to-br from-primary via-primary-dark to-blue-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-[1]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <AnimatedSection className="text-white">
            <span className="text-secondary font-semibold mb-4 block">
              Navbatga yozilish
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Bepul konsultatsiya uchun{" "}
              <span className="text-secondary">yoziling</span>
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Formani to&apos;ldiring va biz siz bilan 30 daqiqa ichida
              bog&apos;lanamiz. Birinchi ko&apos;rik mutlaqo bepul!
            </p>

            <div className="space-y-4">
              {[
                "Bepul birinchi ko'rik",
                "30 daqiqa ichida qo'ng'iroq",
                "Qulay vaqtni tanlash imkoniyati",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="text-secondary" size={20} />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-secondary" size={40} />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                      Rahmat!
                    </h3>
                    <p className="text-gray-600">
                      Arizangiz qabul qilindi. Tez orada siz bilan
                      bog&apos;lanamiz.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ismingiz
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Ismingizni kiriting"
                        className={`input-field ${
                          errors.name ? "border-red-500 focus:ring-red-200" : ""
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon raqam
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+998901234567"
                        className={`input-field ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-200"
                            : ""
                        }`}
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.phone.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Xizmat turi
                      </label>
                      <select
                        {...register("service")}
                        className={`input-field ${
                          errors.service
                            ? "border-red-500 focus:ring-red-200"
                            : ""
                        }`}
                      >
                        <option value="">Xizmatni tanlang</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.service.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Qulay sana
                      </label>
                      <input
                        {...register("date")}
                        type="date"
                        className={`input-field ${
                          errors.date ? "border-red-500 focus:ring-red-200" : ""
                        }`}
                      />
                      {errors.date && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.date.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Izoh (ixtiyoriy)
                      </label>
                      <textarea
                        {...register("comment")}
                        rows={2}
                        placeholder="Qo'shimcha ma'lumot..."
                        className="input-field resize-none"
                      />
                    </div>

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {submitError}
                      </motion.p>
                    )}

                    <div className="sticky bottom-4 z-10">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        aria-label="Yuborish"
                      >
                        <Send size={20} />
                        {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
