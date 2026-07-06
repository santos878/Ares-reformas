"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { AIChatBox, Message } from "./AIChatBox";
import { Sound } from "@/lib/sound";

const SYSTEM_PROMPT = `Eres el asistente virtual de Ares Reformas, una empresa de reformas integrales en País Vasco. Ayudas a los usuarios con información sobre servicios, presupuestos, proyectos y contacto. Responde en español, de forma breve y profesional.`;

const FAQ_RESPONSES: Record<string, string> = {
  servicios: "Ofrecemos reformas integrales: cocinas, baños, rehabilitaciones, suelos, electricidad, fontanería y diseño de interiores. ¿Qué te interesa?",
  presupuesto: "Para solicitar un presupuesto gratuito, puedes rellenar el formulario en la sección 'Presupuesto' o llamarnos al 623 293 274.",
  contacto: "Puedes contactarnos por WhatsApp al 623 293 274, por email o rellenando el formulario de contacto en nuestra web.",
  proyectos: "Puedes ver nuestros proyectos realizados en la sección 'Proyectos' de la web. Tenemos ejemplos de cocinas, baños y reformas completas.",
  cocina: "Nos especializamos en reformas de cocinas completas: muebles, encimeras, fontanería, electricidad y electrodomésticos. Solicita presupuesto sin compromiso.",
  baño: "Reformamos baños completos: azulejos, plato de ducha, mueble de baño, fontanería y accesorios. Te asesoramos en diseño y materiales.",
  horario: "Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 13:00.",
  zona: "Trabajamos en toda la provincia de País Vasco: Vizcaya, Guipúzcoa y Álava.",
  precio: "Los precios varían según el tipo de reforma. Para un presupuesto exacto, necesitamos ver el espacio. ¿Quieres que te llamemos?",
  contacto电话: "Nuestro teléfono es 623 293 274. También puedes escribirnos por WhatsApp.",
};

function findResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(key)) return value;
  }
  if (lower.includes("hola") || lower.includes("buenos") || lower.includes("buenas")) {
    return "¡Hola! Soy el asistente de Ares Reformas. ¿En qué puedo ayudarte? Pregúntame sobre servicios, presupuestos o proyectos.";
  }
  if (lower.includes("gracias")) {
    return "¡De nada! Si necesitas algo más, aquí estoy. ¡Que tengas un buen día!";
  }
  if (lower.includes("adiós") || lower.includes("adios") || lower.includes("hasta luego")) {
    return "¡Hasta luego! Recuerda que puedes escribirnos por WhatsApp al 623 293 274. ¡Nos vemos!";
  }
  return "Gracias por tu pregunta. Para información más detallada, puedes llamarnos al 623 293 274 o escribirnos por WhatsApp. ¿Hay algo más en lo que pueda ayudarte?";
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "assistant", content: "¡Hola! Soy el asistente virtual de Ares Reformas. ¿En qué puedo ayudarte?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback((content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    Sound.play("click");

    setTimeout(() => {
      const response = findResponse(content);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
      Sound.play("success");
    }, 800 + Math.random() * 600);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)]"
          >
            <div className="rounded-xl border border-gray-800 bg-[#0a0a0a] shadow-2xl shadow-black/50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#111]">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AR</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Ares Reformas</p>
                    <p className="text-xs text-green-400">En línea</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    Sound.play("nav");
                  }}
                  className="size-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <HiXMark size={18} />
                </button>
              </div>

              <AIChatBox
                messages={messages}
                onSendMessage={handleSend}
                isLoading={isLoading}
                height="400px"
                emptyStateMessage="¿En qué puedo ayudarte?"
                suggestedPrompts={["Servicios", "Presupuesto", "Proyectos", "Contacto"]}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setIsOpen((prev) => !prev);
          Sound.play("click");
        }}
        className="fixed bottom-6 right-20 z-50 size-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 hover:bg-red-700 transition-colors cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <HiXMark size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <HiChatBubbleLeftRight size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
