"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/Button";
import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Sound } from "@/lib/sound";

const categories = ["Todos", "Baños y Cocinas", "Alicatados y Solados", "Pladur y Techos", "Pintura", "Reformas Integrales"];

const projects: { title: string; category: string; location: string; area: string; desc: string; image: string; imageAfter?: string }[] = [
  { title: "Reforma completa de baño", category: "Baños y Cocinas", location: "Bilbao", area: "5m²", desc: "Reforma integral: plato de ducha con mampara, mueble suspendido, porcelánico gran formato, grifería negra mate.", image: "https://i.imgur.com/u6kGnbL.png", imageAfter: "https://i.imgur.com/sE2oGT3.png" },
  { title: "Reforma de salón con suelo laminado", category: "Alicatados y Solados", location: "Getxo", area: "18m²", desc: "Cambio de suelo terrazo por laminado de roble, pintura completa de paredes y techo.", image: "https://i.imgur.com/WeeeA0a.png", imageAfter: "https://i.imgur.com/WQuYeJO.png" },
  { title: "Reforma integral de piso", category: "Reformas Integrales", location: "Bilbao", area: "45m²", desc: "Reforma completa: suelo laminado, pintura de paredes y techo, molduras, iluminación empotrada, recorte de puertas.", image: "https://i.imgur.com/sCtnG1r.png", imageAfter: "https://i.imgur.com/52ItiuJ.png" },
  { title: "Reforma de cocina", category: "Baños y Cocinas", location: "Barakaldo", area: "9m²", desc: "Reforma completa: nuevos armarios, encimera, porcelánico gran formato, grifería moderna y fregadero bajo encimera.", image: "https://i.imgur.com/WFZgxB7.png", imageAfter: "https://i.imgur.com/RgZbPbM.png" },
];

export default function ProyectosPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
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
                  Sound.play("click");
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => Sound.play("hover")}
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
                  onMouseEnter={() => Sound.play("hover")}
                  className="group h-full rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/50 transition-all duration-300 overflow-hidden"
                >
                    {project.imageAfter ? (
                      <div className="aspect-[16/10] grid grid-cols-2 relative overflow-hidden">
                        <div
                          className="bg-cover bg-center bg-no-repeat relative"
                          style={{ backgroundImage: `url('${project.image}')` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <span className="absolute top-3 left-3 text-white text-xs font-bold bg-black/60 px-2 py-1 rounded">ANTES</span>
                        </div>
                        <div
                          className="bg-cover bg-center bg-no-repeat relative"
                          style={{ backgroundImage: `url('${project.imageAfter}')` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <span className="absolute top-3 left-3 text-red-400 text-xs font-bold bg-black/60 px-2 py-1 rounded">DESPUÉS</span>
                          <span className="absolute bottom-3 left-3 text-white font-medium text-sm">
                            {project.area}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="aspect-[16/10] bg-cover bg-center bg-no-repeat relative overflow-hidden"
                        style={{ backgroundImage: `url('${project.image}')` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-4 text-white font-medium">
                          {project.area}
                        </span>
                      </div>
                    )}
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
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-500 text-lg">Próximamente mostrarán nuestros proyectos con fotos antes y después.</p>
                </div>
              )}
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