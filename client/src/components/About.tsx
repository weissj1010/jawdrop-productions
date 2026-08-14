import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap } from "lucide-react";
import aboutImage from "@assets/2.jpg";

function useCountUp(target: number, isActive: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isActive, target, duration]);
  return count;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const projectCount = useCountUp(200, isInView, 2500);
  const clientCount = useCountUp(100, isInView, 2500);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-jaw-gray mb-6">
              I Make Your Business
              <br />
              <span className="text-jaw-dark-silver">ABSOLUTELY LEGENDARY</span>
            </h2>
            <p className="text-lg text-jaw-dark-silver mb-6 leading-relaxed">
              For almost 20 years, I lived the service industry. Bartending, serving, managing, all of it. Then a few years ago, someone handed me the keys to a small business's social media, and something clicked.
            </p>
            <p className="text-lg text-jaw-dark-silver mb-6 leading-relaxed">
              I wasn't interested in just posting specials. I wanted people to feel something when they scrolled past a burger photo or a promo flyer. I wanted hooks that actually stopped thumbs. Turns out, I had a knack for it and I couldn't stop.
            </p>
            <p className="text-lg text-jaw-dark-silver mb-6 leading-relaxed">
              That's how JAW DROP Productions was born. I help small businesses create content that's original, polished, and built to turn heads. No recycled templates. No filler. No agency markup. Just real work, made from scratch, with strategy and style behind every piece.
            </p>
            <p className="text-lg text-jaw-dark-silver mb-8 leading-relaxed">
              Whether you need a brunch menu, a promo video, or drone footage from your next big event, you're getting my full attention every single time.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-bold text-jaw-gray mb-2"
                >
                  {projectCount}+
                </motion.div>
                <div className="text-jaw-dark-silver">Projects Delivered</div>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-3xl font-bold text-jaw-gray mb-2"
                >
                  {clientCount}%
                </motion.div>
                <div className="text-jaw-dark-silver">Client Focused</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src={aboutImage}
              alt="JAW Drop Productions"
              className="rounded-2xl shadow-2xl w-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-jaw-silver text-jaw-gray p-6 rounded-xl shadow-lg"
            >
              <Zap className="text-3xl mb-2" />
              <div className="font-bold">FOCUSED WORK</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}