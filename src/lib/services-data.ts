export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  color: string;
  images: string[];
  benefits: string[];
  procedures: {
    name: string;
    description: string;
    duration: string;
    price: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: "therapy",
    title: "Terapevtik davolash",
    description: "Kariyes davolash, plomba qo'yish, ildiz kanallari davolash",
    fullDescription: "Terapevtik stomatologiya - bu tishlarning eng keng tarqalgan kasalliklarini davolash sohasidir. Bizning mutaxassislarimiz zamonaviy usullar va materiallar yordamida kariyes, pulpit va periodontitni samarali davolaydi.",
    icon: "Stethoscope",
    color: "from-blue-500 to-blue-600",
    images: ["https://i.pinimg.com/736x/84/66/cc/8466ccb33b77dec32a97db1f17d65cc1.jpg"],
    benefits: [
      "Og'riqsiz davolash",
      "Zamonaviy plomba materiallari",
      "Uzoq muddatli natija",
      "Tishning tabiiy ko'rinishini saqlash"
    ],
    procedures: [
      { name: "Oddiy plomba", description: "Kichik kariyes davolash", duration: "30-45 daqiqa", price: "150,000 so'm" },
      { name: "Estetik plomba", description: "Ko'rinadigan tishlarga", duration: "45-60 daqiqa", price: "250,000 so'm" },
      { name: "Ildiz kanali davolash", description: "Pulpit davolash", duration: "60-90 daqiqa", price: "300,000 so'm" },
      { name: "Tish tiklash", description: "Buzilgan tishni tiklash", duration: "60 daqiqa", price: "400,000 so'm" }
    ],
    faq: [
      { question: "Plomba qancha vaqt xizmat qiladi?", answer: "Sifatli plomba 5-10 yil xizmat qilishi mumkin." },
      { question: "Davolash og'riqli bo'ladimi?", answer: "Yo'q, zamonaviy anesteziya bilan og'riqsiz davolaymiz." }
    ]
  },
  {
    id: "implantation",
    title: "Implantatsiya",
    description: "Zamonaviy implantlar bilan tishlarni tiklash",
    fullDescription: "Dental implantatsiya - bu yo'qolgan tishlarni tiklashning eng zamonaviy va samarali usuli. Implant tabiiy tish ildizini to'liq almashtiradi va 20+ yil xizmat qiladi.",
    icon: "Syringe",
    color: "from-purple-500 to-purple-600",
    images: ["https://i.pinimg.com/1200x/19/df/f4/19dff41b6de16272d8ff7ab7bc9c2dee.jpg"],
    benefits: [
      "Umrbod xizmat qiladi",
      "Tabiiy ko'rinish",
      "Qo'shni tishlarni kesish shart emas",
      "Suyak to'qimasini saqlaydi"
    ],
    procedures: [
      { name: "Koreys implant", description: "Osstem, Dentium brendlari", duration: "1-2 soat", price: "3,500,000 so'm" },
      { name: "Shveytsariya implant", description: "Straumann brendi", duration: "1-2 soat", price: "6,000,000 so'm" },
      { name: "Metall-keramika toj", description: "Implant ustiga toj", duration: "2 tashrif", price: "800,000 so'm" },
      { name: "Sirkoniy toj", description: "Premium toj", duration: "2 tashrif", price: "1,500,000 so'm" }
    ],
    faq: [
      { question: "Implant qancha vaqtda o'rnatiladi?", answer: "Jarayon 30-60 daqiqa davom etadi, to'liq bitish 3-6 oy." },
      { question: "Implant og'riqli bo'ladimi?", answer: "Operatsiya anesteziya ostida o'tkaziladi, og'riq bo'lmaydi." }
    ]
  },
  {
    id: "whitening",
    title: "Tish oqartirish",
    description: "Professional oqartirish va estetik xizmatlar",
    fullDescription: "Professional tish oqartirish xizmati sizning tabassumingizni 6-8 ton oqroq qiladi. Biz xavfsiz va samarali usullardan foydalanamiz.",
    icon: "Sparkles",
    color: "from-amber-500 to-orange-500",
    images: ["https://i.pinimg.com/736x/5b/cd/3c/5bcd3cd8ede3e7234142954ed0eea3e8.jpg"],
    benefits: [
      "1 seansda natija",
      "6-8 ton oqroq",
      "Tish emalini buzmaydigan usul",
      "Uzoq muddatli natija"
    ],
    procedures: [
      { name: "ZOOM oqartirish", description: "Eng samarali usul", duration: "60-90 daqiqa", price: "500,000 so'm" },
      { name: "Lazer oqartirish", description: "Tez natija", duration: "45-60 daqiqa", price: "600,000 so'm" },
      { name: "Uy oqartirish to'plami", description: "Uyda foydalanish uchun", duration: "2 hafta", price: "300,000 so'm" },
      { name: "Professional tozalash", description: "Tish toshi tozalash", duration: "30-45 daqiqa", price: "200,000 so'm" }
    ],
    faq: [
      { question: "Oqartirish tishga zarar keltirmaydimi?", answer: "Yo'q, professional usullar tish emalini buzmaydigan." },
      { question: "Natija qancha vaqt saqlanadi?", answer: "To'g'ri parvarish bilan 1-2 yil saqlanadi." }
    ]
  },
  {
    id: "orthodontics",
    title: "Ortodontiya",
    description: "Breketlar va tish tekislash tizimlari",
    fullDescription: "Ortodontiya - bu tishlar va jag'larning noto'g'ri joylashuvini tuzatish sohasidir. Biz har xil yoshdagi bemorlar uchun individual davolash rejasini tuzamiz.",
    icon: "SmilePlus",
    color: "from-green-500 to-emerald-500",
    images: ["https://i.pinimg.com/1200x/fc/f4/12/fcf4129079675c8ebd2c7dd5b722983b.jpg"],
    benefits: [
      "Chiroyli tabassum",
      "To'g'ri tishlov",
      "Yuz shaklini yaxshilash",
      "Og'iz sog'lig'ini yaxshilash"
    ],
    procedures: [
      { name: "Metall breketlar", description: "Klassik variant", duration: "12-24 oy", price: "4,000,000 so'm" },
      { name: "Keramik breketlar", description: "Ko'rinmas variant", duration: "12-24 oy", price: "6,000,000 so'm" },
      { name: "Safir breketlar", description: "Premium variant", duration: "12-24 oy", price: "8,000,000 so'm" },
      { name: "Invisalign", description: "Ko'rinmas kappalar", duration: "6-18 oy", price: "15,000,000 so'm" }
    ],
    faq: [
      { question: "Breket qancha vaqt taqiladi?", answer: "Odatda 12-24 oy, holatga qarab." },
      { question: "Kattalar ham breket taqa oladimi?", answer: "Ha, yoshdan qat'i nazar davolash mumkin." }
    ]
  },
  {
    id: "pediatric",
    title: "Bolalar stomatologiyasi",
    description: "Bolalar uchun maxsus yondashuv va davolash",
    fullDescription: "Bolalar stomatologiyasi - bu kichik bemorlarimiz uchun maxsus yondashuv. Bizning shifokorlarimiz bolalar bilan ishlash tajribasiga ega va ularni tish shifokoridan qo'rqmaslikka o'rgatadi.",
    icon: "Baby",
    color: "from-pink-500 to-rose-500",
    images: ["https://i.pinimg.com/736x/d6/b8/4b/d6b84b2ef044597f975fa0baf10dcfe5.jpg"],
    benefits: [
      "Bolalarga do'stona muhit",
      "Og'riqsiz davolash",
      "Tajribali pediatr shifokorlar",
      "O'yin orqali davolash"
    ],
    procedures: [
      { name: "Profilaktik ko'rik", description: "Tishlarni tekshirish", duration: "20-30 daqiqa", price: "Bepul" },
      { name: "Sut tishi plombasi", description: "Bolalar plombasi", duration: "30 daqiqa", price: "100,000 so'm" },
      { name: "Ftor bilan qoplash", description: "Tish mustahkamlash", duration: "15 daqiqa", price: "80,000 so'm" },
      { name: "Germetizatsiya", description: "Kariyes profilaktikasi", duration: "20 daqiqa", price: "120,000 so'm" }
    ],
    faq: [
      { question: "Necha yoshdan boshlab tish shifokoriga borish kerak?", answer: "Birinchi tish chiqqandan so'ng, 1 yoshdan." },
      { question: "Bolam tish shifokoridan qo'rqadi, nima qilish kerak?", answer: "Bizning shifokorlarimiz bolalar bilan ishlash tajribasiga ega." }
    ]
  },
  {
    id: "diagnostics",
    title: "Diagnostika",
    description: "3D rentgen va zamonaviy diagnostika usullari",
    fullDescription: "Zamonaviy diagnostika usullari aniq tashxis qo'yish va to'g'ri davolash rejasini tuzish imkonini beradi. Bizda eng so'nggi 3D rentgen va diagnostika uskunalari mavjud.",
    icon: "Scan",
    color: "from-cyan-500 to-teal-500",
    images: ["https://i.pinimg.com/1200x/4f/db/0a/4fdb0aac4b017fb999ab89ef31cf3524.jpg"],
    benefits: [
      "Aniq tashxis",
      "Kam nurlanish",
      "Tez natija",
      "3D tasvirlash"
    ],
    procedures: [
      { name: "Panoramik rentgen", description: "Barcha tishlar tasviri", duration: "5 daqiqa", price: "100,000 so'm" },
      { name: "3D CT skanerlash", description: "To'liq 3D tasvir", duration: "10 daqiqa", price: "250,000 so'm" },
      { name: "Intraoral kamera", description: "Og'iz ichini ko'rish", duration: "10 daqiqa", price: "50,000 so'm" },
      { name: "Diagnostik konsultatsiya", description: "Shifokor bilan", duration: "30 daqiqa", price: "Bepul" }
    ],
    faq: [
      { question: "Rentgen xavflimi?", answer: "Zamonaviy uskunalar minimal nurlanish beradi, xavfsiz." },
      { question: "Homilador ayollar rentgen qila oladimi?", answer: "Homiladorlik davrida rentgen tavsiya etilmaydi." }
    ]
  }
];

export const getServiceById = (id: string): ServiceDetail | undefined => {
  return servicesData.find(service => service.id === id);
};
