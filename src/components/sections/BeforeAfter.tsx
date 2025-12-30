"use client";

import Image from "next/image";
import { AnimatedSection } from "../ui";

const cases = [
  {
    image:
      "https://i.pinimg.com/736x/19/c3/54/19c3547702651e1871623361db6e0db1.jpg",
    treatment: "Tish oqartirish",
    description: "Professional oqartirish natijasi",
  },
  {
    image:
      "https://i.pinimg.com/1200x/3c/f0/7c/3cf07c479053cb0b2d938f49fb05d5ad.jpg",
    treatment: "Ortodontiya",
    description: "Breketlar bilan davolash",
  },
  {
    image:
      "https://i.pinimg.com/1200x/16/03/88/16038895a6afbff2b9ade86e1cb2b3a8.jpg",
    treatment: "Implantatsiya",
    description: "Implant o'rnatish natijasi",
  },
];

export default function BeforeAfter() {
  return (
    <section id="before-after" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold mb-4 block">
            Natijalar
          </span>
          <h2 className="section-title mx-auto dark:text-white">
            Oldin va <span className="text-primary">keyin</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 dark:text-gray-400">
            Bizning ishlarimiz natijalarini ko&apos;ring
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0_0_0/0.08)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.treatment}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Rasm</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.treatment}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
