import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    // { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: FaTiktok, href: "#", label: "TikTok" },
  ];

  const serviceLinks = [
    "Promotional Videos",
    "Testimonial Videos",
    "Social Media Content",
    "Product Demos",
    "Event Coverage",
  ];

  return (
    <footer className="bg-jaw-gray text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold text-jaw-silver mb-4">
              JAW Drop Productions
            </h3>
            <p className="text-jaw-silver mb-6 max-w-md">
              Original content. Real strategy. Built for small businesses that want to stand out.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-jaw-dark-silver hover:bg-jaw-silver hover:text-jaw-gray text-white p-3 rounded-lg transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-jaw-silver">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-jaw-silver">
              {/* <li>(555) 123-4567</li> */}
              {/*<li>hello@jawdropproductions.com</li> */}
              <li>Milwaukee, WI</li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Start A Project
                </button>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-jaw-dark-silver mt-8 pt-8 text-center text-jaw-silver"
        >
          <p>
            &copy; 2026 JAW Drop Productions. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
