import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Video,
  Check,
  Printer,
  Zap,
  Calendar,
  Camera,
  Sparkles,
  Rocket,
} from "lucide-react";

function iMessageBubble({ text, sender, subtitle, color, isVisible, delay }: { text: string; sender: string; subtitle: string; color: string; isVisible: boolean; delay: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [isVisible, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-start"
    >
      <div className="text-xs font-semibold mb-1 ml-3" style={{ color: color, fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>
        {sender} <span className="font-normal text-gray-400">· {subtitle}</span>
      </div>
      <div
        className="relative px-4 py-3 rounded-2xl rounded-bl-sm max-w-md shadow-sm"
        style={{ backgroundColor: '#E9E9EB' }}
      >
        <p className="text-base leading-relaxed text-black" style={{ fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>
          {text}
        </p>
      </div>
    </motion.div>
  );
}

function TestimonialsSection() {
  const testimonialRef = useRef(null);
  const testimonialInView = useInView(testimonialRef, { once: true });

  const messages = [
    {
      text: "Jonathan Weiss was our amazing guy behind the camera this weekend. I was blown away by his quick turnaround time with productions. He has mass potential to help us get next level status! We are happy to have him.",
      sender: "Lorena L.",
      subtitle: "Lake Country Cards, Owner",
      color: "#34C759",
      delay: 600,
    },
    {
      text: "Certainly couldn't do it without Jonathans help. I'm truly blessed.",
      sender: "Erin D.",
      subtitle: "Sweet E's Confections, Owner",
      color: "#007AFF",
      delay: 1800,
    },
    {
      text: "hes my social media guy and let me tell you he never disappoints! This guy will be texting a response from me at 3 AM when i have an idea, add ons, revises etc. He and his beautiful family are truly an amazing add on to our growing Legends family.",
      sender: "Corey B.",
      subtitle: "Wisconsin Legends, Manager",
      color: "#FF9500",
      delay: 3000,
    },
    {
      text: "Jon was wonderful to work with. He's very attentive, communicates effectively, is punctual, and brings your vision to life! Definitely recommend",
      sender: "Shannon S.",
      subtitle: "Traveling Touch Massage, Owner",
      color: "#AF52DE",
      delay: 4200,
    },
  ];

  return (
    <motion.div
      ref={testimonialRef}
      initial={{ opacity: 0, y: 30 }}
      animate={testimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="mt-16"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-jaw-gray mb-10 text-center">
        Client Testimonials
      </h3>

      {/* iPhone-style group chat */}
      <div className="max-w-md mx-auto">
        {/* iPhone frame */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200" style={{ backgroundColor: '#FFFFFF' }}>
          {/* Status bar */}
          <div className="px-6 pt-3 pb-1 flex justify-between items-center" style={{ backgroundColor: '#F6F6F6' }}>
            <span className="text-xs font-semibold text-gray-800" style={{ fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-1 h-1.5 bg-gray-800 rounded-sm" />
                <div className="w-1 h-2 bg-gray-800 rounded-sm" />
                <div className="w-1 h-2.5 bg-gray-800 rounded-sm" />
                <div className="w-1 h-3 bg-gray-800 rounded-sm" />
              </div>
              <svg className="w-4 h-3 text-gray-800 ml-1" viewBox="0 0 24 16" fill="currentColor"><path d="M1 4.5C1 3.67 1.67 3 2.5 3h19c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-19C1.67 14 1 13.33 1 12.5v-9z" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="2.5" y="4.5" width="17" height="7" rx="0.5" fill="currentColor" opacity="0.9"/><path d="M24 8.5a1.5 1.5 0 01-1.5 1.5V7a1.5 1.5 0 011.5 1.5z" fill="currentColor"/></svg>
            </div>
          </div>

          {/* Chat header */}
          <div className="px-4 py-3 text-center border-b border-gray-200" style={{ backgroundColor: '#F6F6F6' }}>
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#34C759', fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>L</div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#007AFF', fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>E</div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#FF9500', fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>C</div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#AF52DE', fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>S</div>
              </div>
            </div>
            <div className="font-semibold text-base text-gray-900" style={{ fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>JAW DROP Praise</div>
            <div className="text-xs text-gray-400" style={{ fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>4 people</div>
          </div>

          {/* Messages area */}
          <div className="px-4 py-6 space-y-4" style={{ backgroundColor: '#FFFFFF', minHeight: '280px' }}>
            {messages.map((msg, index) => (
              <div key={index}>
                {iMessageBubble({ ...msg, isVisible: testimonialInView })}
              </div>
            ))}
          </div>

          {/* Message input bar */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center gap-2" style={{ backgroundColor: '#F6F6F6' }}>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-lg font-bold" style={{ lineHeight: 1 }}>+</span>
            </div>
            <div className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-300">
              <span className="text-gray-400 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif", textTransform: 'none' }}>iMessage</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import printImg from "@assets/print.jpg";
import droneImg from "@assets/drone.jpg";
import brandImg from "@assets/brand.jpg";
import auditImg from "@assets/audit.jpg";
import managementImg from "@assets/management.jpg";
import videoImg from "@assets/video.jpg";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Printer,
      title: "Print Design That Commands Attention",
      description:
        "Need a menu that actually reflects your brand? I design print materials that look sharp, communicate clearly, and convert.",
      features: ["Menus", "Posters", "Promo flyers", "Event materials"],
      bgImage: printImg,
    },
    {
      icon: Zap,
      title: "Aerial Photo & Video That Changes The Perspective",
      description:
        "I capture your business from angles most people never see. Perfect for showcasing exteriors, rooftops, events, and neighborhoods in a whole new light.",
      features: [
        "Epic flyovers (outdoor, line of sight)",
        "Eye-catching visual variety",
        "Social-ready edits",
      ],
      bgImage: droneImg,
    },
    {
      icon: Sparkles,
      title: "Brand Refresh & Visual Identity",
      description:
        "Outdated logo? Inconsistent visuals? I'll sharpen your look without rebuilding from scratch. A focused refresh kit that makes your brand look polished and intentional everywhere it shows up.",
      features: [
        "Fonts, colors, logo tweaks",
        "Social post templates",
        "Visual guidelines",
      ],
      bgImage: brandImg,
    },
    {
      icon: Camera,
      title: "Social Media Audits That Tell You The Truth",
      description:
        "Not sure why your content isn't landing? I'll review your platforms and give you a clear picture of what's working, what's not, and exactly what needs to change.",
      features: [
        "Bio & brand review",
        "Content analysis",
        "Actionable recommendations",
        "Visual breakdown delivered",
      ],
      bgImage: auditImg,
    },
    {
      icon: Calendar,
      title: "Social Media Management That Gets Results",
      description:
        "Done managing your own page with nothing to show for it? I take the wheel. Content creation, captions, posting, and a real strategy that builds momentum.",
      features: [
        "Weekly content calendar",
        "Reels, carousels, stories",
        "Captions + scheduling",
        "Strategy + reporting",
      ],
      bgImage: managementImg,
    },
    {
      icon: Video,
      title: "Short-Form Video That Actually Grabs Attention",
      description:
        "Reels don't have to feel forced. I create short-form content that reflects your brand and stops people mid-scroll. No awkward moments, just content that works.",
      features: [
        "Filming + editing",
        "Captions + music",
        "Platform-optimized",
        "Custom branded style",
      ],
      bgImage: videoImg,
    },
  ];

  return (
    <section id="services" className="py-20 bg-jaw-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-jaw-gray mb-4">
            What I Bring To The Table
          </h2>
          <p className="text-xl text-jaw-dark-silver max-w-3xl mx-auto">
            Creative services built for small businesses that are serious about standing out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group border border-jaw-silver min-h-[420px]"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-300" />

              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-xl inline-flex mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <service.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-200 mb-6">{service.description}</p>
                <ul className="text-gray-200 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="text-jaw-silver mr-2 flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Testimonials */}
        <TestimonialsSection />
      </div>
    </section>
  );
}
