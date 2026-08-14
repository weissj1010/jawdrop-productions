import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "home", label: "Home" },
    { href: "about", label: "About" },
    { href: "services", label: "Services" },
    { href: "portfolio", label: "Portfolio" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-jaw-gray/95 backdrop-blur-sm border-b border-jaw-silver"
          : "bg-jaw-gray/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`font-bold transition-all duration-500 text-lg uppercase ${isScrolled ? 'hover:text-yellow-200' : 'hover:text-jaw-silver'}`}
                style={{
                  fontFamily: "'Teko', sans-serif",
                  letterSpacing: '0.05em',
                  color: isScrolled ? '#C5A44E' : '#ffffff',
                  textShadow: isScrolled ? '0 0 8px rgba(197, 164, 78, 0.3)' : 'none',
                  WebkitTextStroke: isScrolled ? '0.5px #000' : 'none',
                  paintOrder: 'stroke fill',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white absolute right-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-jaw-silver"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`block w-full text-left px-4 py-2 font-bold hover:bg-jaw-blue transition-all duration-500 uppercase ${isScrolled ? 'hover:text-yellow-200' : 'hover:text-jaw-silver'}`}
                    style={{
                      fontFamily: "'Teko', sans-serif",
                      letterSpacing: '0.05em',
                      color: isScrolled ? '#C5A44E' : '#ffffff',
                      textShadow: isScrolled ? '0 0 8px rgba(197, 164, 78, 0.3)' : 'none',
                      WebkitTextStroke: isScrolled ? '0.5px #000' : 'none',
                      paintOrder: 'stroke fill',
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
