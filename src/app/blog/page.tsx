"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatedSection, Button, Card } from "../../components/ui";

const blogPosts = [
  {
    id: 1,
    title: "Tishlarni to'g'ri tozalash usullari",
    excerpt: "Har kuni tishlarni to'g'ri tozalash - og'iz bo'shlig'i salomatligining asosi. Bu maqolada eng samarali usullarni o'rganasiz.",
    content: "Tishlarni to'g'ri tozalash kundalik gigiena rutinasining eng muhim qismidir...",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop",
    author: "Dr. Aziz Karimov",
    date: "2024-12-25",
    readTime: "5 daqiqa",
    category: "Gigiena",
    tags: ["tish tozalash", "gigiena", "maslahat"]
  },
  {
    id: 2,
    title: "Implantatsiya: Zamonaviy yechim",
    excerpt: "Tish implantatsiyasi - yo'qolgan tishlarni tiklashning eng ilg'or usuli. Jarayonning barcha bosqichlari haqida batafsil.",
    content: "Implantatsiya zamonaviy stomatologiyaning eng katta yutuqlaridan biri...",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    author: "Dr. Jasur Toshmatov",
    date: "2024-12-20",
    readTime: "8 daqiqa",
    category: "Implantatsiya",
    tags: ["implant", "tish tiklash", "zamonaviy texnologiya"]
  },
  {
    id: 3,
    title: "Bolalar tish salomatligi",
    excerpt: "Bolalarda tish parvarishi qachon va qanday boshlanishi kerak? Ota-onalar uchun muhim maslahatlar.",
    content: "Bolalar tish salomatligi kattalar tish salomatligining poydevoridir...",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&h=400&fit=crop",
    author: "Dr. Madina Aliyeva",
    date: "2024-12-15",
    readTime: "6 daqiqa",
    category: "Bolalar stomatologiyasi",
    tags: ["bolalar", "tish parvarishi", "ota-onalar"]
  },
  {
    id: 4,
    title: "Tish oqartirish: Xavfsiz usullar",
    excerpt: "Tishlarni xavfsiz va samarali oqartirish usullari. Professional va uy sharoitidagi metodlar.",
    content: "Oq tishlar - chiroyli tabassum kaliti. Ammo oqartirish jarayoni xavfsiz bo'lishi kerak...",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=400&fit=crop",
    author: "Dr. Nilufar Rahimova",
    date: "2024-12-10",
    readTime: "7 daqiqa",
    category: "Estetik stomatologiya",
    tags: ["oqartirish", "estetika", "tabassum"]
  },
  {
    id: 5,
    title: "Tish og'rig'ini oldini olish",
    excerpt: "Tish og'rig'ining asosiy sabablari va ularni qanday oldini olish mumkin. Profilaktika usullari.",
    content: "Tish og'rig'i eng noqulay his-tuyg'ulardan biri. Uni oldini olish davolashdan osonroq...",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=400&fit=crop",
    author: "Dr. Aziz Karimov",
    date: "2024-12-05",
    readTime: "4 daqiqa",
    category: "Profilaktika",
    tags: ["og'riq", "profilaktika", "oldini olish"]
  },
  {
    id: 6,
    title: "Ortodontiya: Tishlarni to'g'rilash",
    excerpt: "Qiyshiq tishlar muammosi va zamonaviy ortodontik davolash usullari. Breket va Invisalign.",
    content: "Ortodontiya - tishlar va jag'larning noto'g'ri holatini tuzatish sohasi...",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop",
    author: "Dr. Nilufar Rahimova",
    date: "2024-11-30",
    readTime: "9 daqiqa",
    category: "Ortodontiya",
    tags: ["breket", "ortodontiya", "tish to'g'rilash"]
  }
];

const categories = ["Barchasi", "Gigiena", "Implantatsiya", "Bolalar stomatologiyasi", "Estetik stomatologiya", "Profilaktika", "Ortodontiya"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "Barchasi" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Stomatologiya Blog
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-white/90 mb-8"
              >
                Tish salomatligi haqida foydali maqolalar va maslahatlar
              </motion.p>
              
              {/* Search */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative max-w-md mx-auto"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Maqola qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Categories */}
        <AnimatedSection>
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString('uz-UZ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full flex items-center gap-1"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/blog/${post.id}`}>
                    <Button 
                      variant="ghost" 
                      className="group-hover:bg-primary group-hover:text-white transition-all p-0 h-auto font-medium"
                    >
                      Batafsil o'qish
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Maqola topilmadi</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Qidiruv shartlarini o'zgartiring yoki boshqa kategoriyani tanlang
            </p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("Barchasi"); }}>
              Barchasini ko'rsatish
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}