"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Sound } from "@/lib/sound";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Ares Reformas"
              width={40}
              height={40}
              className="h-10 w-auto transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-black text-white tracking-tight hidden sm:block">
              ARES
            </span>
            <span className="text-xl font-light text-red-500 group-hover:text-red-400 transition-colors hidden sm:block">
              Reformas
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => Sound.play("hover")}
                className={cn(
                  "relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 rounded-lg",
                  pathname === link.href
                    ? "text-red-500"
                    : "text-gray-300 hover:text-white"
                )}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-red-600/10 rounded-lg border border-red-600/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
            <Link
              href="/presupuesto"
              onMouseEnter={() => Sound.play("hover")}
              className="ml-4 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm uppercase tracking-wider transition-colors shadow-lg shadow-red-600/25"
            >
              Pedir Presupuesto
            </Link>
          </div>

          <button
            onClick={() => {
              Sound.play("click");
              setMenuOpen(!menuOpen);
            }}
            className="md:hidden p-2 text-white hover:text-red-400 transition-colors cursor-pointer"
            aria-label="Menú"
          >
            {menuOpen ? <HiXMark size={28} /> : <HiBars3 size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="px-4 py-6 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => Sound.play("click")}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-lg font-semibold transition-colors",
                    pathname === link.href
                      ? "text-red-500 bg-red-600/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/presupuesto"
                onClick={() => Sound.play("click")}
                className="block px-4 py-3 mt-4 bg-red-600 text-white text-center font-bold rounded-lg"
              >
                Pedir Presupuesto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
