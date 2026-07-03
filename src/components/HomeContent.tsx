"use client";

import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { AnimatedSection } from "./AnimatedSection";
import { Button } from "./Button";

const services = [
  {
    title: "Baños y Cocinas",
    desc: "Diseño y reforma integral. Platos de ducha, bañeras exentas, muebles a medida, encimeras de cuarzo/silestone, grifería de diseño.",
    icon: "🚿🍳",
  },
  {
    title: "Alicatados y Solados",
    desc: "Cerámica, porcelánico, gres, piedra natural. Grandes formatos, rectificados, juntas mínimas. Suelos radiantes.",
    icon: "🧱",
  },
  {
    title: "Pladur y Falsos Techos",
    desc: "Tabiquería seca, trasdosados, techos registrables, aislamiento acústico/térmico, techos decorativos con iluminación integrada.",
    icon: "🏗️",
  },
  {
    title: "Pintura Interior",
    desc: "Pintura lisa, estucos, efectos decorativos, esmaltado de carpintería, lacado de puertas, tratamiento antihumedad, pintura ecológica.",
    icon: "🎨",
  },
  {
    title: "Reformas Completas y Parciales",
    desc: "Gestión integral: demoliciones, fontanería, electricidad, carpintería, acabados. Un solo interlocutor, plazos cumplidos, garantía 5 años.",
    icon: "🏠",
  },
];

const projects = [
  { title: "Ático dúplex", category: "Reforma integral", image: "/projects/atico.jpg" },
  { title: "Cocina minimalista", category: "Cocina", image: "/projects/cocina.jpg" },
  { title: "Baño de lujo", category: "Baño", image: "/projects/bano.jpg" },
  { title: "Casa rural", category: "Rehabilitación", image: "/projects/casa.jpg" },
];

export function HomeContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-57480d5f8a07?q=80&w=1920')",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1),transparent_70%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-8"
          >
            Transformamos
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              tus espacios
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Reformas integrales con diseño, calidad y compromiso. 
            Hacemos realidad el hogar que siempre has soñado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" onClick={() => window.location.href = "/presupuesto"}>
              Solicitar Presupuesto
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = "/proyectos"}>
              Ver Proyectos
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-red-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative py-24 bg-black border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: "250+", label: "Proyectos completados" },
              { number: "15+", label: "Años de experiencia" },
              { number: "98%", label: "Clientes satisfechos" },
              { number: "5", label: "Años de garantía" },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-black text-red-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-red-500 font-semibold tracking-[0.3em] uppercase text-sm">
              Nuestros Servicios
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
              Todo lo que necesitas
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Ofrecemos soluciones completas para tu hogar o negocio. 
              Desde reformas integrales hasta trabajos especializados.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/50 transition-all duration-300"
                >
                  <span className="text-4xl mb-4 block">{service.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              ¿Listo para transformar tu hogar?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Solicita un presupuesto sin compromiso y descubre cómo podemos 
              hacer realidad el espacio que siempre has deseado.
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