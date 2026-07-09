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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1752225494606-ae09aca08bea?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
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

      {/* Experiencia + Talento Joven */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-red-500 font-semibold tracking-[0.3em] uppercase text-sm">
              Nuestra filosofía
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
              Donde la <span className="text-red-500">experiencia</span> encuentra al <span className="text-red-500">talento</span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
              En Ares Reformas creemos en el equilibrio: nuestros maestros con años de oficio 
              enseñan y guían a jóvenes que empiezan. Así garantizamos calidad impecable 
              y damos la primera oportunidad a quien merece crecer.
            </p>
          </AnimatedSection>

          {/* Stats Row */}
          <AnimatedSection className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { number: "+5", label: "Años de experiencia" },
              { number: "250+", label: "Proyectos realizados" },
              { number: "12+", label: "Jóvenes formados" },
              { number: "97%", label: "Clientes satisfechos" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => Sound.play("hover")}
                className="group text-center p-6 rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/90 border border-gray-800 hover:border-red-600/50 transition-all duration-300"
              >
                <p className="text-4xl sm:text-5xl font-black text-red-500 group-hover:scale-110 transition-transform">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </AnimatedSection>

          {/* Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1} variant="up">
              <motion.article
                whileHover={{ y: -8 }}
                onMouseEnter={() => Sound.play("hover")}
                className="group relative h-full p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/90 border border-gray-800 hover:border-red-600/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mb-6 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <HiShieldCheck size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-red-400 transition-colors">
                    Profesionales <span className="text-red-500">experimentados</span>
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Maestros con más de 5 años de oficio que dominan cada fase: 
                    demolición, fontanería, electricidad, albañilería, carpintería y acabados. 
                    Saben lo que funciona y lo que no. Calidad garantizada.
                  </p>
                </div>
              </motion.article>
            </AnimatedSection>

            <AnimatedSection delay={0.2} variant="up">
              <motion.article
                whileHover={{ y: -8 }}
                onMouseEnter={() => Sound.play("hover")}
                className="group relative h-full p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/90 border border-gray-800 hover:border-red-600/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-600/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mb-6 text-green-400 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <HiSparkles size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-green-400 transition-colors">
                    Jóvenes <span className="text-green-400">talento</span>
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Les damos su primera oportunidad real. Aprenden con los mejores, 
                    se forman en obra y crecen con nosotros. Ganas, frescura y compromiso. 
                    Apostar por ellos es apostar por el futuro de la profesión.
                  </p>
                </div>
              </motion.article>
            </AnimatedSection>
          </div>

          {/* Bottom message */}
          <AnimatedSection delay={0.4} className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-red-600/10 to-green-600/10 border border-red-600/20">
              <HiHeart className="text-red-400 size-5" />
              <p className="text-gray-300 text-sm sm:text-base">
                <span className="font-bold text-white">+20 profesionales</span> entre veteranos y aprendices. 
                Un equipo que crece contigo.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Nationalities */}
    </>
  );
}