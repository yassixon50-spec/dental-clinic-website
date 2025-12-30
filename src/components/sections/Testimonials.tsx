"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { AnimatedSection } from "../ui";

const testimonials = [
  {
    id: 1,
    name: "Dilshod Rahmonov",
    image:
      "https://i.pinimg.com/736x/17/59/ed/1759ed8bdbb873226fd711774ce9e954.jpg",
    text: "Juda yaxshi klinika! Shifokorlar juda mehribon va professional. Implantatsiya qildirdim, natijadan juda mamnunman. Hammaga tavsiya qilaman!",
    rating: 5,
  },
  {
    id: 2,
    name: "Gulnora Karimova",
    image:
      "https://i.pinimg.com/736x/5e/fa/d2/5efad2329f782cda14f1c7058da8aa56.jpg",
    text: "Bolam uchun eng yaxshi klinika topdik. Shifokorlar bolalar bilan ishlashni juda yaxshi bilishadi. Bolam endi tish shifokoridan qo'rqmaydi.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sardor Aliyev",
    image:
      "https://i.pinimg.com/736x/dd/53/43/dd5343b1af6862a015633ff7338880e7.jpg",
    text: "Tish oqartirish xizmatidan foydalandim. Natija ajoyib! Professional yondashuv va zamonaviy uskunalar. Rahmat!",
    rating: 5,
  },
  {
    id: 4,
    name: "Madina Tosheva",
    image:
      "https://i.pinimg.com/1200x/0e/5a/be/0e5abeec75224be101a46c3d28ad8b15.jpg",
    text: "Ortodontiya bo'limida davolanyapman. Shifokorlar juda e'tiborli, har safar batafsil tushuntirib berishadi. Narxlar ham maqul.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold mb-4 block">Fikrlar</span>
          <h2 className="section-title mx-auto dark:text-white">
            Mijozlarimiz <span className="text-primary">fikrlari</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 dark:text-gray-400">
            Bizning xizmatlarimizdan foydalangan bemorlar fikrlari
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-[0_4px_40px_rgb(0_0_0/0.1)] p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-12 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Quote className="text-white" size={24} />
            </div>

            {/* Testimonial Content */}
            <div className="relative h-64 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className={
                          i < testimonials[currentIndex].rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {testimonials[currentIndex].image ? (
                      <div className="w-14 h-14 relative rounded-full overflow-hidden">
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {testimonials[currentIndex].name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Bemor</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t dark:border-gray-700">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronLeft size={24} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
