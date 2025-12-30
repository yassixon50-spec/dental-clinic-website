"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Award, Users } from "lucide-react";
import Image from "next/image";
import { Button, Counter } from "../ui";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience", icon: Award },
  { value: 10000, suffix: "+", label: "Happy Patients", icon: Users },
  { value: 8, suffix: "", label: "Expert Doctors", icon: Shield },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-blue-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-primary-light/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
            >
              Your Healthy Smile —{" "}
              <span className="text-secondary">Our Mission</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
            >
              Modern equipment, experienced doctors and painless treatment
              methods. We provide you with the best dental services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                href="#appointment"
                size="lg"
                icon={<ArrowRight size={20} />}
              >
                Book Appointment
              </Button>
              <Button
                href="#about"
                variant="outline"
                size="lg"
                icon={<Play size={20} />}
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white !hover:text-gray-900 [&:hover]:text-gray-900"
              >
                About Us
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <Counter
                    end={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20" />
                <div className="absolute inset-4 rounded-2xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src="https://i.pinimg.com/1200x/d4/9b/bd/d49bbd77e32fb61532254e45b1bd748c.jpg"
                      alt="Dental Clinic"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Shield className="text-secondary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">100%</p>
                    <p className="text-sm text-gray-500">Guarantee</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Award className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">15+ Years</p>
                    <p className="text-sm text-gray-500">Experience</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
