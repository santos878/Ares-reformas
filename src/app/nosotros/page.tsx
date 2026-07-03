"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/Button";

const team = [
  { name: "Carlos Martínez", role: "CEO & Fundador", desc: "20 años de experiencia en el sector de la construcción y rehabilitación." },
  { name: "Laura García", role: "Directora de Diseño", desc: "Arquitecta de interiores con premios nacionales de diseño." },
  { name: "Miguel Torres", role: "Director de Obra", desc: "Ingeniero civil, supervisor de más de 300 proyectos." },
  { name: "Ana Ruiz", role: "Responsable de Calidad", desc: "Garantiza que cada proyecto cumpla los más altos estándares." },
];

const timeline = [
  { year: "2010", event: "Fundación de Ares Reformas" },
  { year: "2013", event: "Primer gran proyecto: rehabilitación de edificio histórico" },
  { year: "2016", event: "Apertura de showroom en Madrid" },
  { year: "2019", event: "Premio a la mejor reforma del año" },
  { year: "2022", event: "Expansión a toda la Comunidad de Madrid" },
  { year: "2024", event: "+250 proyectos completados con éxito" },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText
            text="Sobre Nosotros"
            className="text-5xl sm:text-6xl font-black text-white text-center"
            as="h1"
          />
          <AnimatedSection delay={0.2}>
            <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto text-center">
              Desde 2010, transformamos espacios con pasión y profesionalidad. 
              Cada proyecto es único y recibe la atención que merece.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <AnimatedSection variant="left">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                Nuestra <span className="text-red-500">historia</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Ares Reformas nació en 2010 con una idea clara: ofrecer reformas de calidad 
                  con un trato cercano y transparente. Lo que empezó como un pequeño taller 
                  familiar se ha convertido en una empresa de referencia en Madrid.
                </p>
                <p>
                  Hoy somos un equipo de más de 30 profesionales: arquitectos, diseñadores, 
                  ingenieros y artesanos que trabajan coordinados para ofrecer resultados 
                  excepcionales en cada proyecto.
                </p>
                <p>
                  Nuestro secreto es simple: escuchamos, planificamos y ejecutamos con 
                  la misma dedicación que si fuera nuestra propia casa.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="right">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                  <span className="text-8xl">🏢</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-600/20 rounded-full blur-3xl" />
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Nuestro <span className="text-red-500">equipo</span>
            </h2>
            <p className="text-gray-400">Los profesionales que harán realidad tu proyecto</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/50 transition-all duration-300 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-red-400 text-sm font-medium mt-1">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-3">{member.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Nuestra <span className="text-red-500">trayectoria</span>
            </h2>
          </AnimatedSection>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 0.1}>
                  <div className="relative pl-12">
                    <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-red-600 border-4 border-black" />
                    <span className="text-red-500 font-black text-xl">{item.year}</span>
                    <p className="text-gray-400 mt-1">{item.event}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection className="text-center mt-24">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              ¿Hablamos de tu proyecto?
            </h2>
            <Button size="lg" onClick={() => window.location.href = "/contacto"}>
              Contacta con nosotros
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
