"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { HiCheck, HiArrowRight } from "react-icons/hi2";

const services = [
  {
    title: "Reformas Integrales",
    desc: "Transformamos tu hogar por completo. Desde la demolición hasta los acabados finales, gestionamos todo el proceso con un único interlocutor.",
    features: ["Cocinas y baños", "Salones y dormitorios", "Acabados de lujo", "Gestión de licencias"],
  },
  {
    title: "Diseño de Cocinas",
    desc: "Creamos cocinas funcionales y con personalidad. Materiales premium, electrodomésticos eficientes y un diseño que se adapta a tu estilo de vida.",
    features: ["Diseño 3D personalizado", "Encimeras de cuarzo/silestone", "Electrodomésticos eficientes", "Carpintería a medida"],
  },
  {
    title: "Reformas de Baños",
    desc: "Convertimos tu baño en un spa personal. Platos de ducha, bañeras exentas, revestimientos exclusivos y la mejor iluminación.",
    features: ["Duchas de obra", "Bañeras exentas", "Revestimientos porcelánicos", "Mobiliario diseño"],
  },
  {
    title: "Rehabilitación de Edificios",
    desc: "Rehabilitamos comunidades enteras, fachadas y cubiertas. Mejoramos la eficiencia energética y la accesibilidad.",
    features: ["Fachadas y cubiertas", "Aislamiento térmico", "Ascensores", "ITE y certificados"],
  },
  {
    title: "Interiorismo",
    desc: "Servicio integral de interiorismo. Te acompañamos en la elección de cada detalle para crear un espacio coherente y con personalidad.",
    features: ["Asesoría de estilo", "Planos y renders", "Selección de mobiliario", "Decoración final"],
  },
  {
    title: "Eficiencia Energética",
    desc: "Mejoramos el confort de tu hogar mientras reduces el consumo. Aislamiento, climatización y energías renovables.",
    features: ["Aislamiento térmico/acústico", "Climatización eficiente", "Placas solares", "Certificados energéticos"],
  },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText
            text="Nuestros Servicios"
            className="text-5xl sm:text-6xl font-black text-white"
            as="h1"
          />
          <AnimatedSection delay={0.3}>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Ofrecemos soluciones completas para tu hogar o negocio. Seas particular o comunidad, tenemos el servicio que necesitas.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group h-full p-8 lg:p-10 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-red-600/50 transition-all duration-500"
                >
                  <h2 className="text-2xl font-black text-white mb-4 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-300 text-sm">
                        <span className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
                          <HiCheck className="text-red-500" size={14} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" onClick={() => window.location.href = "/presupuesto"}>
                    Solicitar Presupuesto <HiArrowRight className="ml-2" />
                  </Button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
