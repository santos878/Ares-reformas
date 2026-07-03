"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/Button";
import { BeforeAfter, BeforeAfterGrid } from "@/components/BeforeAfter";
import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Baños y Cocinas", "Alicatados y Solados", "Pladur y Techos", "Pintura", "Reformas Integrales"];

const projects = [
  { title: "Baño moderno + Cocina abierta", category: "Baños y Cocinas", location: "Bilbao", area: "35m²", desc: "Reforma completa: plato de ducha, mueble suspendido, cocina con isla y encimera silestone.", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800" },
  { title: "Porcelánico gran formato salón", category: "Alicatados y Solados", location: "Donostia", area: "60m²", desc: "Suelo porcelánico 120x120 rectificado, junta 1mm, zócalo a ras. Calefacción radiante.", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800" },
  { title: "Falso techo iluminación LED", category: "Pladur y Techos", location: "Vitoria", area: "45m²", desc: "Techo registrable con downlights LED dimables, aislamiento acústico lana roca.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { title: "Estuco veneciano dormitorio", category: "Pintura", location: "Getxo", area: "20m²", desc: "Paredes en estuco veneciano brillo perlado, techo blanco mate, lacado puertas.", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800" },
  { title: "Reforma integral piso 90m²", category: "Reformas Integrales", location: "Barakaldo", area: "90m²", desc: "Redistribución completa: 3 hab, 2 baños, cocina office, suelos, pintura, carpintería.", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800" },
];

const beforeAfterItems = [
  {
    title: "Baño años 90 → Spa moderno",
    category: "Baños y Cocinas",
    beforeSrc: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800",
    afterSrc: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800",
  },
  {
    title: "Cocina cerrada → Open concept",
    category: "Baños y Cocinas",
    beforeSrc: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800",
    afterSrc: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800",
  },
  {
    title: "Suelo gris viejo → Porcelánico 120x120",
    category: "Alicatados y Solados",
    beforeSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800",
    afterSrc: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800",
  },
  {
    title: "Techo viejo → LED integrado",
    category: "Pladur y Techos",
    beforeSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    afterSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
  },
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
                    <div
                      className="aspect-[16/10] bg-cover bg-center bg-no-repeat relative overflow-hidden"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 text-white font-medium">
                        {project.area}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
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

      <BeforeAfterGrid items={beforeAfterItems} />
    </>
  );
}