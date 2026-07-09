"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/Button";
import { HiStar, HiCheckCircle, HiShieldCheck, HiClock, HiHeart, HiSparkles, HiArrowRight, HiMapPin, HiPhone, HiGlobeAlt } from "react-icons/hi2";
import { Sound } from "@/lib/sound";

const reasons = [
  {
    icon: HiStar,
    title: "Equipo experimentado",
    desc: "Profesionales con más de 5 años de oficio. Sabemos lo que hacemos.",
  },
  {
    icon: HiPhone,
    title: "Disponibilidad total",
    desc: "Te atendemos cuando nos necesites. Respuesta rápida, siempre localizables.",
  },
  {
    icon: HiMapPin,
    title: "Todo el País Vasco",
    desc: "Trabajamos en Araba, Bizkaia y Gipuzkoa. Estamos donde estés.",
  },
];

const testimonials = [
  {
    name: "María González",
    location: "Bilbao",
    project: "Reforma integral + cocina",
    rating: 5,
    text: "Transformaron mi piso de los 90 en una casa moderna y luminosa. El trato fue impecable: cumplieron plazos, presupuesto cerrado y la limpieza diaria se nota. El jefe de obra, Miguel, siempre disponible. 100% recomendables.",
  },
  {
    name: "Iñaki Ruiz",
    location: "Donostia",
    project: "Baño completo + alicatado",
    rating: 5,
    text: "Quería un baño tipo spa y lo lograron. Platos de ducha a ras, mampara minimalista, grifería Grohe... El detalle del zócalo a ras de pared marca la diferencia. Profesionales de verdad, no chapuzas.",
  },
  {
    name: "Laura Mendizabal",
    location: "Getxo",
    project: "Pintura decorativa + falsos techos",
    rating: 5,
    text: "Hicieron estuco veneciano en el dormitorio principal y techo con LED integrado. El acabado es de revista. Lo mejor: presupuesto cerrado, sin sorpresas, y dejaron todo impoluto. Volveré a contar con ellos.",
  },
  {
    name: "Jon Ander López",
    location: "Barakaldo",
    project: "Reforma parcial + suelo radiante",
    rating: 5,
    text: "Reforma de salón, cocina y 2 baños con suelo radiante. Coordinaron fontanería, electricidad y carpintería sin que yo tuviera que gestionar nada. Plazo: 6 semanas, cumplido al día. Equipo serio.",
  },
  {
    name: "Ane Soriano",
    location: "Portugalete",
    project: "Cocina abierta + isla",
    rating: 5,
    text: "Nos asesoraron en la distribución y elección de materiales (Silestone, muebles Santos, electrodomésticos Bosch). La isla central es el corazón de la casa. Trato cercano, profesional y transparente.",
  },
  {
    name: "Carlos Fernández",
    location: "Santurtzi",
    project: "Rehabilitación fachada + aislamiento",
    rating: 5,
    text: "Comunidad de 12 vecinos. Rehabilitaron fachada, balcones y aislaron térmicamente. Gestionaron subvenciones, ITE y licencias. Resultado: edificio como nuevo y factura de calefacción bajada un 30%.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-semibold tracking-wider uppercase mb-6"
          >
            Ares Reformas
          </motion.span>
          <AnimatedText
            text="Por qué elegirnos"
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95]"
            as="h1"
          />
          <AnimatedSection delay={0.3} className="mt-6 max-w-3xl mx-auto">
            <p className="text-gray-400 text-lg leading-relaxed">
              Más de 5 años transformando hogares en País Vasco. 
              Profesionales que cumplen lo que prometen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="pb-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Razones para <span className="text-red-500">confiar en nosotros</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              No somos los más baratos. Somos los que entregan lo que firman.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, i) => (
              <AnimatedSection key={reason.title} delay={i * 0.08} variant="up">
                <motion.article
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => Sound.play("hover")}
                  className="group relative h-full p-8 rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/90 border border-gray-800 hover:border-red-600/50 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <motion.div
                      className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-6 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                    >
                      <reason.icon size={28} />
                    </motion.div>
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-red-400 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed flex-1">
                      {reason.desc}
                    </p>
                  </div>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Nationalities */}
      <section className="pb-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(220,38,38,0.04),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-red-500 font-semibold tracking-[0.3em] uppercase text-sm">
              Nuestro equipo
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
              Variedad que <span className="text-red-500">nos hace fuertes</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Un equipo multicultural con profesionales de diferentes orígenes, unidos por la misma pasión: hacer bien las reformas.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { flag: "🇪🇸", name: "Españoles", desc: "Núcleo del equipo" },
              { flag: "🇷🇴", name: "Rumanos", desc: "Especialistas en obra" },
              { flag: "🇦🇷", name: "Argentinos", desc: "Diseño y acabados" },
              { flag: "🇨🇴", name: "Colombianos", desc: "Fontanería y electricidad" },
              { flag: "🇳🇮", name: "Nicaragüenses", desc: "Carpintería y pintura" },
            ].map((nationality, i) => (
              <AnimatedSection key={nationality.name} delay={i * 0.08} variant="up">
                <motion.article
                  whileHover={{ y: -6, scale: 1.02 }}
                  onMouseEnter={() => Sound.play("hover")}
                  className="group text-center p-6 rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/90 border border-gray-800 hover:border-red-600/50 transition-all duration-500"
                >
                  <div className="text-5xl mb-3">{nationality.flag}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {nationality.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{nationality.desc}</p>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-600/10 border border-red-600/20">
              <HiGlobeAlt className="text-red-400 size-5" />
              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">+5 nacionalidades</span> trabajando juntas con un solo objetivo: tu reforma perfecta.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-red-500 font-semibold tracking-[0.3em] uppercase text-sm">
              Testimonios reales
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
              Lo que dicen <span className="text-red-500">nuestros clientes</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Más de 250 proyectos. Estas son algunas voces.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <AnimatedSection key={testimonial.name} delay={i * 0.08} variant="up">
                <motion.article
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => Sound.play("hover")}
                  className="h-full p-8 rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/90 border border-gray-800 hover:border-red-600/30 transition-all duration-500 flex flex-col"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, idx) => (
                      <HiStar key={idx} className="text-yellow-400" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-gray-800 pt-4">
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location} · {testimonial.project}</p>
                  </div>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              ¿Empezamos tu proyecto?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Presupuesto detallado en 24h. Sin compromiso.
            </p>
            <Button size="lg" onClick={() => window.location.href = "/presupuesto"}>
              Solicitar Presupuesto <HiArrowRight className="ml-2" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}