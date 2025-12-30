"use client";

import { AnimatedSection, Accordion } from "../ui";

const faqItems = [
  {
    question: "Davolash og'riqli bo'ladimi?",
    answer: "Yo'q, biz zamonaviy anesteziya usullaridan foydalanamiz. Barcha muolajalar og'riqsiz o'tkaziladi. Siz faqat engil bosim sezishingiz mumkin, lekin og'riq bo'lmaydi.",
  },
  {
    question: "Qancha vaqtda bir marta tish shifokoriga borish kerak?",
    answer: "Profilaktik ko'rik uchun 6 oyda bir marta tish shifokoriga tashrif buyurish tavsiya etiladi. Bu tish kasalliklarini erta bosqichda aniqlash va oldini olishga yordam beradi.",
  },
  {
    question: "Implantatsiya qancha vaqt oladi?",
    answer: "Implant o'rnatish jarayoni 30-60 daqiqa davom etadi. Ammo to'liq davolash (implant o'rnatish, bitish davri va toj o'rnatish) 3-6 oy davom etishi mumkin.",
  },
  {
    question: "Kafolat berasizlarmi?",
    answer: "Ha, biz barcha ishlarimizga kafolat beramiz. Plombalarga 2 yil, implantlarga 5 yil, tojlarga 3 yil kafolat beriladi.",
  },
  {
    question: "Bo'lib to'lash imkoniyati bormi?",
    answer: "Ha, biz qulay bo'lib to'lash imkoniyatini taqdim etamiz. Siz davolash narxini 3, 6 yoki 12 oyga bo'lib to'lashingiz mumkin.",
  },
  {
    question: "Qabul qilish uchun oldindan yozilish kerakmi?",
    answer: "Ha, oldindan yozilish tavsiya etiladi. Bu sizga qulay vaqtni tanlash va navbatda kutmaslik imkonini beradi. Shoshilinch holatlarda esa darhol qabul qilamiz.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold mb-4 block">FAQ</span>
          <h2 className="section-title mx-auto dark:text-white">
            Ko&apos;p beriladigan <span className="text-primary">savollar</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4 dark:text-gray-400">
            Eng ko&apos;p so&apos;raladigan savollarga javoblar
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
