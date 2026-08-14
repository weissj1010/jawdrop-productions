import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import backgroundImage from "@assets/IMG_4718_1749663103681.jpeg";

export default function Hero() {
  const [shimmerDone, setShimmerDone] = useState(false);

  useEffect(() => {
    // After slide (1.8s delay + 0.8s duration) + shimmer sweep (2s) = ~4.6s
    const timer = setTimeout(() => setShimmerDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with uploaded image */}
      <div className="absolute inset-0 bg-gradient-to-r from-jaw-gray/85 to-jaw-blue/80 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4 pt-20">
        <div className="mb-6">
          {/* "I'M NOT A CONTENT VENDOR" - exaggerated exhale animation */}
          <motion.h1
            initial={{ opacity: 0, scale: 2.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 0.3, delay: 0.2 },
              scale: { duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            I'M NOT A CONTENT VENDOR
          </motion.h1>

          {/* "I'M A BRAND COLLABORATOR" - slides down then shimmers to gold */}
          <motion.h1
            initial={{ opacity: 0, y: -30, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            transition={{
              duration: 0.8,
              delay: 1.8,
              ease: "easeOut",
            }}
            className={`text-4xl md:text-6xl font-bold leading-tight ${shimmerDone ? 'shimmer-gold-active' : 'shimmer-gold'}`}
          >
            I'M A BRAND COLLABORATOR
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-40 opacity-90 max-w-2xl mx-auto"
        >
          This Didn't Start In A Studio. It Started Behind A Bar.
          <br />
          <span style={{ color: '#C5A44E' }}>Content With Purpose. Design With Strategy.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-8 justify-center"
        >
          <button
            onClick={() => scrollToSection("portfolio")}
            className="border-2 border-jaw-silver text-jaw-silver hover:bg-jaw-silver hover:text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300"
          >
            Work That’s Stopped The Scroll
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-jaw-silver hover:bg-jaw-gold text-jaw-gray font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Let’s Build Something Bold
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-white text-2xl opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
