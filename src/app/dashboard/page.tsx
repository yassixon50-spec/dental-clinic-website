"use client";

import { motion } from "framer-motion";
import { 
  MessageCircle, Calendar, Target, BookOpen, Bell, Trophy, 
  BarChart3, Phone, Camera, Users, Brain, Clock, Heart,
  CheckCircle, Star, Zap, Shield, Smile, Activity
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatedSection, Button, Card } from "../../components/ui";

const features = [
  {
    id: 'chatbot',
    title: '🤖 AI Tish Maslahatchi',
    description: '24/7 tish salomatligi haqida savollar va javoblar',
    icon: MessageCircle,
    color: 'from-blue-500 to-cyan-500',
    status: 'active'
  },
  {
    id: 'calendar',
    title: '📅 Tish Parvarishi Kalendari',
    description: 'Kunlik eslatmalar va shifokor uchrashuvlari',
    icon: Calendar,
    color: 'from-green-500 to-emerald-500',
    status: 'active'
  },
  {
    id: 'tracker',
    title: '🎯 Salomatlik Tracker',
    description: 'Shaxsiy tish salomatligi hisoblagichi',
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    status: 'active'
  },
  {
    id: 'library',
    title: '📚 Bilim Kutubxonasi',
    description: 'Video darsliklar va foydali ma\'lumotlar',
    icon: BookOpen,
    color: 'from-orange-500 to-red-500',
    status: 'active'
  },
  {
    id: 'notifications',
    title: '🔔 Smart Bildirishnomalar',
    description: 'Tish yuvish va shifokor eslatmalari',
    icon: Bell,
    color: 'from-yellow-500 to-orange-500',
    status: 'active'
  },
  {
    id: 'gamification',
    title: '🏆 O\'yin Tizimi',
    description: 'Ballar, darajalar va mukofotlar',
    icon: Trophy,
    color: 'from-indigo-500 to-purple-500',
    status: 'active'
  },
  {
    id: 'analytics',
    title: '📊 Statistika Dashboard',
    description: 'Shaxsiy hisobotlar va tahlillar',
    icon: BarChart3,
    color: 'from-teal-500 to-green-500',
    status: 'active'
  },
  {
    id: 'consultation',
    title: '📞 Tezkor Konsultatsiya',
    description: 'Video qo\'ng\'iroq orqali shifokor maslahati',
    icon: Phone,
    color: 'from-rose-500 to-pink-500',
    status: 'active'
  },
  {
    id: 'family',
    title: '👨‍👩‍👧‍👦 Oilaviy Profil',
    description: 'Butun oila uchun tish salomatligi',
    icon: Users,
    color: 'from-violet-500 to-purple-500',
    status: 'active'
  }
];

const quickStats = [
  { label: 'Kunlik tish yuvish', value: '2/2', icon: CheckCircle, color: 'text-green-500' },
  { label: 'Haftalik ball', value: '85', icon: Star, color: 'text-yellow-500' },
  { label: 'Keyingi uchrashув', value: '3 kun', icon: Calendar, color: 'text-blue-500' },
  { label: 'Salomatlik darajasi', value: '92%', icon: Heart, color: 'text-red-500' }
];

export default function DashboardPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Salom! Men sizning AI tish maslahatchi botingizman. Qanday yordam bera olaman?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { type: 'user', message: chatInput }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Tishlarni kuniga 2 marta, 2 daqiqa davomida yuvish kerak.',
        'Shirinliklarni kamroq iste\'mol qiling, ko\'proq meva va sabzavot yeng.',
        'Tish cho\'tkasini 3 oyda bir marta almashtiring.',
        'Shifokorga 6 oyda bir marta tashrif buyuring.',
        'Dental ip ishlatishni unutmang - bu juda muhim!'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { type: 'bot', message: randomResponse }]);
    }, 1000);
    
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="text-6xl mb-4">🤖✨</div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  AI Tish Maslahatchi Dashboard
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  Tish salomatligingizni saqlash uchun barcha kerakli vositalar bir joyda!
                </p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
              >
                {quickStats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Features Grid */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Barcha Xizmatlar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tish salomatligingiz uchun zamonaviy AI vositalar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card 
                  className="p-6 h-full cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-700"
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Faol
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* AI Chat Demo */}
        {selectedFeature === 'chatbot' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <Card className="p-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">AI Tish Maslahatchi</h3>
                  <p className="text-gray-600 dark:text-gray-300">24/7 yordam</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 h-64 overflow-y-auto mb-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Savolingizni yozing..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleChatSend} className="px-6">
                  Yuborish
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Call to Action */}
        <AnimatedSection>
          <Card className="mt-16 p-12 text-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 border-4 border-blue-200 dark:border-blue-700">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Tish salomatligingizni yangi darajaga olib chiqing!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              AI maslahatchi va zamonaviy vositalar yordamida tishlaringizni mukammal holatda saqlang
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#appointment">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 rounded-full shadow-lg">
                  <Calendar className="mr-2" />
                  Shifokorga yozilish
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setSelectedFeature('chatbot')}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xl px-8 py-4 rounded-full shadow-lg"
              >
                <MessageCircle className="mr-2" />
                AI bilan suhbat
              </Button>
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}