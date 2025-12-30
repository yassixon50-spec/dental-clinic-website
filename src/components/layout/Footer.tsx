"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "Bosh sahifa", href: "#hero" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Shifokorlar", href: "#doctors" },
  { label: "Narxlar", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const services = [
  "Terapiya",
  "Implantatsiya",
  "Tish oqartirish",
  "Ortodontiya",
  "Bolalar stomatologiyasi",
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11H13V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5V11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13H11V19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19V13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white leading-tight">
                  DentCare
                </span>
                <span className="text-xs text-gray-400">
                  Stomatologiya
                </span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Zamonaviy uskunalar va tajribali shifokorlar bilan sifatli
              stomatologiya xizmatlari.
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/dentcare"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Send size={18} />
              </a>
              <a
                href="https://instagram.com/dentcare"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">
              Tezkor havolalar
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">
              Xizmatlar
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Aloqa</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  size={20}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <a
                    href="tel:+998901234567"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +998 90 123 45 67
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@dentcare.uz"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@dentcare.uz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <span className="text-gray-400">
                  Toshkent sh., Chilonzor tumani, 1-mavze
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  size={20}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div className="text-gray-400">
                  <p>Du-Ju: 9:00 - 18:00</p>
                  <p>Sha: 9:00 - 15:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-900">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 DentCare. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Maxfiylik siyosati
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
