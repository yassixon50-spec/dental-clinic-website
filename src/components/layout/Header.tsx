"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";
import AdminModal from "./AdminModal";

const menuItems = [
  { label: "Bosh sahifa", href: "#hero" },
  { label: "Haqimizda", href: "#about" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Shifokorlar", href: "#doctors" },
  { label: "Narxlar", href: "#pricing" },
  { label: "Bolalar", href: "/kids", external: true },
  { label: "Blog", href: "/blog", external: true },
  { label: "Aloqa", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
    
    // 2 marta bosish
    if (clickCount === 1) {
      setIsAdminOpen(true);
      setClickCount(0);
    }
    
    // 1 soniyadan keyin reset
    setTimeout(() => setClickCount(0), 1000);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex items-center gap-3 cursor-pointer">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
              isScrolled ? "bg-gray-900" : "bg-gradient-to-br from-primary to-secondary"
            }`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Plus/Cross medical symbol */}
                <path
                  d="M19 11H13V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5V11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13H11V19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19V13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-bold text-xl leading-tight ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}>
                DentCare
              </span>
              <span className={`text-xs ${
                isScrolled ? "text-gray-500" : "text-white/70"
              }`}>
                Dental Clinic
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              item.external ? (
                <Link key={item.href} href={item.href}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`font-medium transition-colors cursor-pointer ${
                      isScrolled
                        ? "text-gray-700 hover:text-primary"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ) : (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  className={`font-medium transition-colors ${
                    isScrolled
                      ? "text-gray-700 hover:text-primary"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </motion.a>
              )
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center gap-4">
            <div
              className={`flex items-center gap-4 text-sm ${
                isScrolled ? "text-gray-600" : "text-white/80"
              }`}
            >
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+998 90 123 45 67</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>9:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AdminModal open={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container-custom py-6 space-y-4">
              {menuItems.map((item) => (
                item.external ? (
                  <Link key={item.href} href={item.href}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-700 hover:text-primary font-medium cursor-pointer"
                    >
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-primary font-medium"
                  >
                    {item.label}
                  </a>
                )
              ))}
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={18} />
                  <span>+998 90 123 45 67</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
