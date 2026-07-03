"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/Button";
import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Reforma Integral", "Cocina", "Baño", "Rehabilitación", "Interiorismo"];

const projects = [
  { title: "Ático dúplex con terraza", category: "Reforma Integral", location: "Salamanca, Madrid", area: "120m²", desc: "Reforma integral de ático con vistas panorámicas. Se unificaron espacios, se añadió una terraza con jardín vertical y se instaló un sistema de domótica avanzada." },
  { title: "Cocina abierta minimalista", category: "Cocina", location: "Chamberí, Madrid", area: "25m²", desc: "Cocina abierta al salón con isla central, encimera de cuarzo blanco, electrodomésticos integrados y armarios lacados en negro mate." },
  { title: "Baño spa con drench", category: "Baño", location: "Retiro, Madrid", area: "12m²", desc: "Baño principal con plato de ducha a ras de suelo, mampara minimalista, bañera exenta y revestimiento porcelánico efecto mármol." },
  { title: "Rehabilitación fachada histórica", category: "Rehabilitación", location: "Centro, Madrid", area: "450m²", desc: "Rehabilitación completa de fachada protegida. Restauración de balcones de forja, limpieza de piedra natural y mejora de aislamiento térmico." },
  { title: "Oficina corporativa", category: "Interiorismo", location: "Tetuán, Madrid", area: "200m²", desc: "Diseño de oficina abierta con zonas de coworking, cabinas insonorizadas, sala de reuniones ejecutiva y área de descanso con café." },
  { title: "Casa rural sostenible", category: "Reforma Integral", location: "Sierra de Madrid", area: "180m²", desc: "Reforma de casa rural con criterios de bioconstrucción. Materiales naturales, aislamiento de corcho, calefacción por suelo radiante y recuperación de aguas pluviales." },
];

export default function ProyectosPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText
            text="Nuestros Proyectos"
            className="text-5xl sm:text-6xl font-black text-white"
            as="h1"
          />
          <AnimatedSection delay={0.3}>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Cada proyecto cuenta una historia. Descubre cómo transformamos espacios 
              en hogares y lugares de trabajo únicos.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                }}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
                  activeCategory === cat
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((project, i) => (
                <AnimatedSection key={project.title + i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group h-full rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-6xl opacity-50">🏗️</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        <span className="text-xs text-gray-500">{project.area}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-1">{project.location}</p>
                      <p className="text-gray-400 text-sm mt-3 line-clamp-3">{project.desc}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatedSection className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              ¿Tienes un proyecto en mente? Cuéntanos tu idea y te haremos un presupuesto personalizado.
            </p>
            <Button size="lg" onClick={() => window.location.href = "/presupuesto"}>
              Solicita tu presupuesto <HiArrowRight className="ml-2" />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
