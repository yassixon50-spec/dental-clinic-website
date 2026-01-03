"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles, CheckCircle, XCircle, Users, Calendar } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatedSection, Button, Card } from "../../components/ui";

const goodFoods = [
  {
    name: "Olma",
    icon: "🍎",
    benefit: "Tishlarni tozalaydi va milkni mustahkamlaydi",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=200&fit=crop"
  },
  {
    name: "Sut",
    icon: "🥛",
    benefit: "Kaltsiy bilan boy, tishlarni kuchaytiradi",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop"
  },
  {
    name: "Pishloq",
    icon: "🧀",
    benefit: "Tish emalini himoya qiladi",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=200&fit=crop"
  },
  {
    name: "Sabzavotlar",
    icon: "🥕",
    benefit: "Vitaminlar bilan to'la, tishlarni tozalaydi",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop"
  },
  {
    name: "Baliq",
    icon: "🐟",
    benefit: "Fosfor va kaltsiy manbai",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=200&fit=crop"
  },
  {
    name: "Yong'oq",
    icon: "🥜",
    benefit: "Tishlarni kuchaytiruvchi minerallar",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=300&h=200&fit=crop"
  }
];

const badFoods = [
  {
    name: "Shirinliklar",
    icon: "🍭",
    reason: "Tishlarni buzadi va karies hosil qiladi",
    image: "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=300&h=200&fit=crop"
  },
  {
    name: "Gazli ichimliklar",
    icon: "🥤",
    reason: "Shakar va kislota tishlarni zarar qiladi",
    image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=200&fit=crop"
  },
  {
    name: "Shokolad",
    icon: "🍫",
    reason: "Ko'p shakar tishlarni buzadi",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=200&fit=crop"
  },
  {
    name: "Chipsi",
    icon: "🍟",
    reason: "Tish oralig'ida qoladi va bakteriya o'stiradi",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300&h=200&fit=crop"
  }
];

const tips = [
  {
    title: "Kuniga 2 marta tish yuvish",
    description: "Ertalab va kechqurun tishlarni 2 daqiqa davomida yuving",
    icon: "🦷",
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "Shifokorga 6 oyda bir bor boring",
    description: "Muntazam tekshiruv tishlaringizni sog'lom saqlaydi",
    icon: "👨‍⚕️",
    color: "from-green-400 to-green-600"
  },
  {
    title: "Tish cho'tkasini 3 oyda almashtiring",
    description: "Eski cho'tka tishlarni yaxshi tozalamaydi",
    icon: "🪥",
    color: "from-purple-400 to-purple-600"
  },
  {
    title: "Ko'p suv iching",
    description: "Suv og'izni tozalaydi va bakteriyalarni yuvadi",
    icon: "💧",
    color: "from-cyan-400 to-cyan-600"
  }
];

const funFacts = [
  "Tishlar tananing eng qattiq qismi!",
  "Bolalar 20 ta sut tishi bilan tug'iladi",
  "Fil tishi 4 kg og'irlikda bo'lishi mumkin!",
  "Tishlar barmoq izlari kabi noyobdir",
  "Qadimgi odamlar tish cho'tkasi o'rniga novdadan foydalanganlar"
];

export default function KidsPage() {
  const [selectedTab, setSelectedTab] = useState<'good' | 'bad' | 'tips'>('good');
  const [currentFact, setCurrentFact] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameQuestion, setGameQuestion] = useState(0);

  const gameQuestions = [
    {
      question: "Kuniga necha marta tish yuvish kerak?",
      options: ["1 marta", "2 marta", "3 marta", "5 marta"],
      correct: 1,
      emoji: "🦷"
    },
    {
      question: "Qaysi ovqat tishlar uchun foydali?",
      options: ["Shokolad", "Olma", "Shirinlik", "Gazli ichimlik"],
      correct: 1,
      emoji: "🍎"
    },
    {
      question: "Tish cho'tkasini qancha vaqtda almashtirish kerak?",
      options: ["1 oyda", "2 oyda", "3 oyda", "6 oyda"],
      correct: 2,
      emoji: "🪥"
    },
    {
      question: "Shifokorga qancha vaqtda bir bor borish kerak?",
      options: ["3 oyda", "6 oyda", "1 yilda", "2 yilda"],
      correct: 1,
      emoji: "👨‍⚕️"
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameQuestion(0);
  };

  const answerQuestion = (selectedAnswer: number) => {
    if (selectedAnswer === gameQuestions[gameQuestion].correct) {
      setScore(score + 1);
    }
    
    if (gameQuestion < gameQuestions.length - 1) {
      setGameQuestion(gameQuestion + 1);
    } else {
      // O'yin tugadi
      setTimeout(() => {
        alert(`🎉 O'yin tugadi! Sizning natijangiz: ${score + (selectedAnswer === gameQuestions[gameQuestion].correct ? 1 : 0)}/${gameQuestions.length}`);
        setGameStarted(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200, 
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                scale: 0 
              }}
              animate={{ 
                y: [null, -20, 0],
                scale: [0, 1, 0.8, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              <div className="text-4xl opacity-20">
                {['⭐', '🦷', '😊', '🌈', '✨'][Math.floor(Math.random() * 5)]}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="text-8xl mb-4">🦷✨</div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Bolalar Tish Dunyosi!
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Tishlaringizni sog'lom saqlashning qiziqarli sirlari!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button 
                size="lg" 
                onClick={startGame}
                className="bg-yellow-100 text-purple-600 text-lg px-8 py-4 rounded-full shadow-lg hover:bg-yellow-100 hover:text-purple-600"
              >
                🎮 O'yin boshlash
              </Button>
              <a href="#appointment">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-yellow-400 text-purple-800 hover:bg-yellow-300 text-lg px-8 py-4 rounded-full shadow-lg"
                >
                  👨‍⚕️ Shifokorga boring
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Fun Facts Carousel */}
        <AnimatedSection>
          <Card className="mb-16 p-8 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-4 border-yellow-300 dark:border-yellow-600">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-purple-800 dark:text-purple-300 flex items-center justify-center gap-3">
                <Sparkles className="text-yellow-500" />
                Qiziqarli faktlar!
                <Sparkles className="text-yellow-500" />
              </h2>
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold text-purple-700 dark:text-purple-200 mb-6"
              >
                {funFacts[currentFact]}
              </motion.div>
              <div className="flex justify-center gap-2">
                {funFacts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFact(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentFact ? 'bg-purple-500 scale-125' : 'bg-purple-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </AnimatedSection>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border-4 border-purple-200 dark:border-purple-700">
            {[
              { id: 'good', label: '😊 Foydali ovqatlar', color: 'bg-green-500' },
              { id: 'bad', label: '😱 Zararli ovqatlar', color: 'bg-red-500' },
              { id: 'tips', label: '💡 Maslahatlar', color: 'bg-blue-500' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                  selectedTab === tab.id
                    ? `${tab.color} text-white shadow-lg scale-105`
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {selectedTab === 'good' && (
            <motion.div
              key="good"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center justify-center gap-3">
                  <CheckCircle size={40} />
                  Tishlar uchun foydali ovqatlar!
                  <CheckCircle size={40} />
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Bu ovqatlar tishlaringizni kuchli va sog'lom qiladi! 💪
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {goodFoods.map((food, index) => (
                  <motion.div
                    key={food.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="p-6 text-center h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-4 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all">
                      <div className="text-6xl mb-4">{food.icon}</div>
                      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={food.image}
                          alt={food.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-3">
                        {food.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {food.benefit}
                      </p>
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold">
                          <Heart size={16} />
                          Super foydali!
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'bad' && (
            <motion.div
              key="bad"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center justify-center gap-3">
                  <XCircle size={40} />
                  Tishlar uchun zararli ovqatlar!
                  <XCircle size={40} />
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Bu ovqatlarni kam yeyish kerak! 🚫
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {badFoods.map((food, index) => (
                  <motion.div
                    key={food.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="p-6 text-center h-full bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-4 border-red-200 dark:border-red-700 hover:border-red-400 dark:hover:border-red-500 transition-all">
                      <div className="text-6xl mb-4">{food.icon}</div>
                      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={food.image}
                          alt={food.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-3">
                        {food.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {food.reason}
                      </p>
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold">
                          <XCircle size={16} />
                          Ehtiyot bo'ling!
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'tips' && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center justify-center gap-3">
                  <Star size={40} />
                  Tish parvarishi maslahatlar!
                  <Star size={40} />
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Bu maslahatlar tishlaringizni doimo sog'lom saqlaydi! ✨
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {tips.map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="p-8 h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-4 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${tip.color} flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg`}>
                        {tip.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">
                        {tip.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg text-center leading-relaxed">
                        {tip.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <AnimatedSection>
          <Card className="mt-16 p-12 text-center bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30 border-4 border-purple-300 dark:border-purple-600">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-purple-800 dark:text-purple-300 mb-6">
              Shifokorga tashrif buyuring!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Bizning do'stona shifokorlarimiz sizning tishlaringizni tekshirib, 
              sog'lom saqlash uchun maxsus maslahatlar berishadi!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#appointment">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-xl px-8 py-4 rounded-full shadow-lg">
                  <Calendar className="mr-2" />
                  Navbat olish
                </Button>
              </a>
              <a href="/">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-pink-500 hover:bg-pink-600 text-white text-xl px-8 py-4 rounded-full shadow-lg"
                >
                  <Users className="mr-2" />
                  Ota-onalar uchun
                </Button>
              </a>
            </div>
          </Card>
        </AnimatedSection>
      </div>

      {/* Game Modal */}
      {gameStarted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{gameQuestions[gameQuestion].emoji}</div>
              <h3 className="text-2xl font-bold mb-6 text-purple-800 dark:text-purple-300">
                Savol {gameQuestion + 1}/{gameQuestions.length}
              </h3>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                {gameQuestions[gameQuestion].question}
              </p>
              
              <div className="space-y-3">
                {gameQuestions[gameQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    className="w-full p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/50 dark:hover:to-pink-800/50 transition-all text-left font-medium text-gray-800 dark:text-gray-200 border-2 border-transparent hover:border-purple-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Ball: {score}/{gameQuestion}
                </div>
                <button
                  onClick={() => setGameStarted(false)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  O'yinni to'xtatish
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}