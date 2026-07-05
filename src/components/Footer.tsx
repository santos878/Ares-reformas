"use client";

import Link from "next/link";
import { HiPhone, HiEnvelope, HiMapPin } from "react-icons/hi2";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";
import { AnimatedSection } from "./AnimatedSection";
import { Sound } from "@/lib/sound";

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <AnimatedSection>
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-black text-white">ARES</span>
                <span className="text-2xl font-light text-red-500">Reformas</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transformamos espacios con dedicación y profesionalidad. Especialistas en reformas integrales con diseño y calidad.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <a href="tel:+34623293274" onMouseEnter={() => Sound.play("hover")} className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors text-sm">
                <HiPhone className="text-red-500 flex-shrink-0" />
                623 29 32 74
              </a>
              <a href="mailto:aaresreformas@gmail.com" onMouseEnter={() => Sound.play("hover")} className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors text-sm">
                <HiEnvelope className="text-red-500 flex-shrink-0" />
                aaresreformas@gmail.com
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <HiMapPin className="text-red-500 flex-shrink-0 mt-0.5" />
                <span>País Vasco</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h3 className="text-white font-bold text-lg mb-4">Enlaces</h3>
            <div className="space-y-2">
              {[
                { href: "/servicios", label: "Servicios" },
                { href: "/proyectos", label: "Proyectos" },
                { href: "/nosotros", label: "Sobre Nosotros" },
                { href: "/contacto", label: "Contacto" },
                { href: "/presupuesto", label: "Presupuesto" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => Sound.play("hover")}
                  className="block text-gray-400 hover:text-red-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h3 className="text-white font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a href="https://instagram.com/ares_reformas" target="_blank" rel="noopener noreferrer" onMouseEnter={() => Sound.play("hover")} onClick={() => Sound.play("click")} className="p-3 bg-gray-900 hover:bg-red-600 rounded-lg text-gray-400 hover:text-white transition-all">
                <FaInstagram size={20} />
              </a>
            </div>
          </AnimatedSection>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Ares Reformas. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/aviso-legal" onMouseEnter={() => Sound.play("hover")} className="hover:text-gray-300 transition-colors">
              Aviso Legal
            </Link>
            <Link href="/privacidad" onMouseEnter={() => Sound.play("hover")} className="hover:text-gray-300 transition-colors">
              Privacidad
            </Link>
            <Link href="/cookies" onMouseEnter={() => Sound.play("hover")} className="hover:text-gray-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
