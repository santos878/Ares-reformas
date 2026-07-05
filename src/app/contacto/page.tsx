"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { ContactForm } from "@/components/ContactForm";
import { HiPhone, HiEnvelope, HiMapPin, HiClock } from "react-icons/hi2";
import { Sound } from "@/lib/sound";

export default function ContactoPage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText
            text="Contacto"
            className="text-5xl sm:text-6xl font-black text-white"
            as="h1"
          />
          <AnimatedSection delay={0.2}>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Cuéntanos tu proyecto o resuelve tus dudas. 
              Te respondemos en menos de 24 horas.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <AnimatedSection variant="left" className="lg:col-span-2">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800">
                <h2 className="text-2xl font-black text-white mb-8">Envíanos un mensaje</h2>
                <ContactForm />
              </div>
            </AnimatedSection>

            <AnimatedSection variant="right" className="space-y-6">
              <div onMouseEnter={() => Sound.play("hover")} className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/30 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-4">Información de contacto</h3>
                <div className="space-y-4">
                  <a href="tel:+34623293274" onMouseEnter={() => Sound.play("hover")} className="flex items-start gap-3 text-gray-400 hover:text-red-400 transition-colors">
                    <HiPhone className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">Teléfono</p>
                      <p className="text-sm">623 29 32 74</p>
                    </div>
                  </a>
                  <a href="mailto:aaresreformas@gmail.com" onMouseEnter={() => Sound.play("hover")} className="flex items-start gap-3 text-gray-400 hover:text-red-400 transition-colors">
                    <HiEnvelope className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">Email</p>
                      <p className="text-sm">aaresreformas@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-gray-400">
                    <HiMapPin className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">Dirección</p>
                      <p className="text-sm">País Vasco</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-400">
                    <HiClock className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">Horario</p>
                      <p className="text-sm">Lun - Vie: 9:00 - 19:00<br />Sáb: 10:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div onMouseEnter={() => Sound.play("hover")} className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/30 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-3">Respuesta rápida</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Si prefieres, solicita directamente un presupuesto sin compromiso. 
                  Te llamamos en menos de 24 horas.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
