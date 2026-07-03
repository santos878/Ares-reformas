"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent" />
      <div className="relative text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl font-black text-red-500">404</h1>
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-black text-white mt-6"
        >
          Página no encontrada
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mt-4 max-w-md mx-auto"
        >
          La página que buscas no existe o ha sido movida. 
          Vuelve al inicio o contáctanos si necesitas ayuda.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <Link href="/">
            <Button size="lg">Volver al inicio</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
