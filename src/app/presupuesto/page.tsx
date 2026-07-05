"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { BudgetForm } from "@/components/BudgetForm";
import { HiShieldCheck, HiClock, HiRocketLaunch } from "react-icons/hi2";
import { Sound } from "@/lib/sound";

export default function PresupuestoPage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText
            text="Solicita tu Presupuesto"
            className="text-5xl sm:text-6xl font-black text-white"
            as="h1"
          />
          <AnimatedSection delay={0.2}>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Cuéntanos tu proyecto y te enviaremos un presupuesto detallado y sin compromiso 
              en menos de 24 horas.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {[
              { icon: HiRocketLaunch, title: "Respuesta rápida", desc: "Te contactamos en menos de 24 horas con un presupuesto personalizado." },
              { icon: HiShieldCheck, title: "Sin compromiso", desc: "El presupuesto es gratuito y sin ninguna obligación por tu parte." },
              { icon: HiClock, title: "Visita técnica", desc: "Valoramos tu espacio in situ para darte el precio más ajustado." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div onMouseEnter={() => Sound.play("hover")} className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/30 transition-all duration-300">
                  <item.icon className="text-red-500 mx-auto mb-4" size={32} />
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="max-w-3xl mx-auto p-8 lg:p-10 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800">
              <h2 className="text-2xl font-black text-white mb-8 text-center">
                Cuéntanos tu proyecto
              </h2>
              <BudgetForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
