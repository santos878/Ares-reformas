"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { HiCheck, HiArrowRight } from "react-icons/hi2";
import { Sound } from "@/lib/sound";

const services = [
  {
    title: "Baños y Cocinas",
    desc: "Diseño y reforma integral de baños y cocinas. Platos de ducha, bañeras exentas, muebles a medida, encimeras de cuarzo/silestone, grifería de diseño.",
    icon: "🚿🍳",
    features: ["Platos de ducha a ras", "Muebles a medida", "Encimeras premium", "Grifería diseño"],
  },
  {
    title: "Alicatados y Solados",
    desc: "Instalación de todo tipo de cerámica, porcelánico, gres, piedra natural. Grandes formatos, rectificados, juntas mínimas. Suelos radiantes.",
    icon: "🧱",
    features: ["Porcelánico gran formato", "Piedra natural", "Suelos radiantes", "Juntas mínimas"],
  },
  {
    title: "Pladur y Falsos Techos",
    desc: "Tabiquería seca, trasdosados, falsos techos registrables, aislamiento acústico/térmico, techos decorativos con iluminación integrada.",
    icon: "🏗️",
    features: ["Aislamiento acústico", "Techos registrables", "Iluminación integrada", "Formas curvas"],
  },
  {
    title: "Pintura Interior",
    desc: "Pintura lisa, estucos, efectos decorativos, esmaltado de carpintería, lacado de puertas, tratamiento antihumedad, pintura ecológica.",
    icon: "🎨",
    features: ["Estucos venecianos", "Efectos decorativos", "Lacado puertas", "Pintura ecológica"],
  },
  {
    title: "Reformas Completas y Parciales",
    desc: "Gestión integral: demoliciones, fontanería, electricidad, carpintería, acabados. Un solo interlocutor, plazos cumplidos, garantía 5 años.",
    icon: "🏠",
    features: ["Gestión llaves en mano", "Fontanería/Electricidad", "Carpintería a medida", "Garantía 5 años"],
  },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-1.5 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-semibold tracking-wider uppercase">
              Nuestros Servicios
            </span>
          </motion.div>
          <AnimatedText
            text="Qué hacemos"
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95]"
            as="h1"
          />
          <AnimatedSection delay={0.3} className="mt-6 max-w-3xl mx-auto">
            <p className="text-gray-400 text-lg leading-relaxed">
              Más de 5 años transformando hogares en País Vasco. 
              Cada servicio se ejecuta con materiales de primera y acabados impecables.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.08} variant="up">
                <motion.article
                  whileHover={{ y: -8, boxShadow: "0 30px 60px -15px rgba(220, 38, 38, 0.2)" }}
                  onMouseEnter={() => Sound.play("hover")}
                  className="group relative h-full p-8 lg:p-10 rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/90 border border-gray-800 hover:border-red-600/50 transition-all duration-500 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                    className="relative z-10 flex items-center gap-3 mb-6"
                  >
                    <motion.span
                      className="text-4xl"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    >
                      {service.icon}
                    </motion.span>
                    <motion.h2
                      className="text-2xl font-black text-white group-hover:text-red-400 transition-colors"
                    >
                      {service.title}
                    </motion.h2>
                  </motion.div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 + 0.3 }}
                    className="relative z-10 text-gray-400 leading-relaxed mb-6"
                  >
                    {service.desc}
                  </motion.p>
                  <motion.ul
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 + 0.4 }}
                    className="relative z-10 space-y-3 mb-8"
                  >
                    {service.features.map((feature, fi) => (
                      <motion.li
                        key={feature}
                        layout
                        className="flex items-center gap-3 text-gray-300 text-sm"
                      >
                        <motion.span
                          className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0"
                        >
                          <HiCheck className="text-red-500" size={14} />
                        </motion.span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 + 0.5 }}
                    className="relative z-10"
                  >
                    <Button variant="outline" size="sm" onClick={() => window.location.href = "/presupuesto"}>
                      Presupuesto <HiArrowRight className="ml-2" />
                    </Button>
                  </motion.div>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              ¿Listo para empezar?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Cuéntanos tu proyecto y te enviamos presupuesto detallado en 24h. Sin compromiso.
            </p>
            <Button size="lg" onClick={() => window.location.href = "/presupuesto"}>
              Solicitar Presupuesto Gratuito
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}