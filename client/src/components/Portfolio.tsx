import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, Play } from "lucide-react";
import pcfImg from "@assets/PCF.PNG";
import drinkImg from "@assets/new drink.PNG";
import mizBtsVideo from "@assets/Miz BTS.MOV";
import joeMamasVideo from "@assets/joe-mamas-website-showcase.MOV";
import weddingDroneVideo from "@assets/Wedding Drone.MOV";
import reviewsVideo from "@assets/Reviews.mp4";
const jimHouseVideo = "https://jawdrop-productions-eta.vercel.app/assets/JimHouseDroneReel-4x3-DZJLnZOR.mp4";

type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  video?: string;
  objectPosition?: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Pat Connaughton Foundation",
    description: "Recent project showcasing bold creative direction and visual storytelling.",
    category: "Design",
    image: pcfImg,
    objectPosition: "center 30%",
  },
  {
    id: 2,
    title: "BTS With The Miz",
    description: "Short-form video content that grabs attention and stops the scroll.",
    category: "Video",
    video: mizBtsVideo,
    objectPosition: "center 30%",
  },
  {
    id: 3,
    title: "Drink",
    description: "Eye-catching product photography that makes you want to reach for a glass.",
    category: "Photography",
    image: drinkImg,
  },
  {
    id: 4,
    title: "$1.3M Luxury Listing",
    description: "Cinematic drone footage that sells the lifestyle before the front door even opens.",
    category: "Video",
    video: jimHouseVideo,
  },
  {
    id: 5,
    title: "Sky-High I Do's",
    description: "Aerial cinematography that captures the grandeur of the moment from a perspective only a drone can deliver.",
    category: "Drone",
    video: weddingDroneVideo,
  },
  {
    id: 6,
    title: "Website Launch Motion Graphic",
    description: "Dynamic motion graphics that bring ideas or accomplishments to life with movement and energy.",
    category: "Video",
    video: joeMamasVideo,
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const expandedData = portfolioItems.find((i) => i.id === expandedItem);

  return (
    <section id="portfolio" className="py-20 bg-jaw-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Recent Work</h2>
          <p className="text-xl text-jaw-silver max-w-3xl mx-auto">
            A look at what I've created for businesses across the Lake Country area and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer flex flex-col"
              onClick={() => setExpandedItem(item.id)}
            >
              {/* Cropped preview */}
              <div className="aspect-[4/3] overflow-hidden relative">
                {item.video ? (
                  <>
                    <video
                      src={item.video}
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ objectPosition: item.objectPosition || "center" }}
                    />
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full group-hover:bg-white/50 transition-colors duration-300">
                        <Play size={18} className="text-white ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ objectPosition: item.objectPosition || "center" }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                  </>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-jaw-silver mb-2 flex-1">{item.description}</p>
                <span className="text-sm text-jaw-silver">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded overlay - shows full image or video */}
        {expandedItem && expandedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setExpandedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-4xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedItem(null)}
                className="absolute -top-4 -right-4 z-10 bg-white text-jaw-gray p-2 rounded-full shadow-lg hover:bg-jaw-silver transition-colors"
              >
                <X size={20} />
              </button>

              {expandedData.video ? (
                <video
                  src={expandedData.video}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[85vh] rounded-xl shadow-2xl"
                />
              ) : (
                <img
                  src={expandedData.image}
                  alt={expandedData.title}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl pointer-events-none">
                <h3 className="text-2xl font-bold text-white">
                  {expandedData.title}
                </h3>
                <p className="text-jaw-silver mt-1">
                  {expandedData.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
