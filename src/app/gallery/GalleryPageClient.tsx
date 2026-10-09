"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Image as ImageIcon,
  Play,
  X,
  Maximize2,
  Calendar,
  Layers,
} from "lucide-react";
import type { MediaItem } from "@/types";

const fallbackGallery: MediaItem[] = [
  {
    _id: "gal-1",
    title: "Inaugural Lamp Lighting Ceremony & Dignitary Welcome",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    category: "inauguration",
    eventYear: "2025",
  },
  {
    _id: "gal-2",
    title: "International Keynote Plenary Session in Silver Jubilee Hall",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    category: "keynote",
    eventYear: "2025",
  },
  {
    _id: "gal-3",
    title: "Interactive Parallel Technical Paper Presentation Sessions",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    category: "sessions",
    eventYear: "2025",
  },
  {
    _id: "gal-4",
    title: "Delegates & Scholars Networking at Open Quadrangle",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    category: "networking",
    eventYear: "2025",
  },
  {
    _id: "gal-5",
    title: "Poster Exhibition & Research Prototype Evaluation",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    category: "sessions",
    eventYear: "2024",
  },
  {
    _id: "gal-6",
    title: "Valedictory Best Paper Awards & Felicitation",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80",
    category: "valedictory",
    eventYear: "2024",
  },
  {
    _id: "gal-7",
    title: "MES Kalladi College Campus & Verdant Western Ghats Foothills",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    category: "campus",
    eventYear: "2027",
  },
  {
    _id: "gal-8",
    title: "Scholarly Panel Discussion on Emerging Technologies",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    category: "keynote",
    eventYear: "2025",
  },
];

export default function GalleryPageClient() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch("/api/media");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setMediaItems(json.data);
        } else {
          setMediaItems(fallbackGallery);
        }
      } catch {
        setMediaItems(fallbackGallery);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, []);

  const categories = [
    { label: "All Moments", value: "all" },
    { label: "Inauguration", value: "inauguration" },
    { label: "Keynotes", value: "keynote" },
    { label: "Paper Sessions", value: "sessions" },
    { label: "Networking", value: "networking" },
    { label: "Campus", value: "campus" },
  ];

  const filteredItems = mediaItems.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="container-xl py-12 lg:py-16">
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${selectedCategory === cat.value
                ? "bg-amber-400 text-black shadow-lg shadow-amber-900/30 font-bold"
                : "bg-surface-2 text-white/70 hover:text-white border border-white/5 hover:border-white/10"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry / Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-surface-2 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id || index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setActiveItem(item)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/8 bg-surface-2 aspect-[4/3]"
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                    {item.eventYear || "MESKCON"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:text-amber-400 group-hover:scale-110 transition-all">
                    {item.mediaType === "video" ? (
                      <Play size={14} className="fill-current ml-0.5" />
                    ) : (
                      <Maximize2 size={14} />
                    )}
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="text-white font-display font-semibold text-sm line-clamp-2 drop-shadow-md group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-white/50">
                    <Layers size={12} className="text-amber-400" />
                    <span className="capitalize">{item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveItem(null)}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-surface-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="relative aspect-[16/10] w-full bg-black">
                {activeItem.mediaType === "video" ? (
                  <video
                    src={activeItem.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={activeItem.url}
                    alt={activeItem.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                )}
              </div>
              <div className="p-6 bg-surface border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-white font-display font-bold text-lg">
                    {activeItem.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-amber-400" />
                      Edition: {activeItem.eventYear || "2027"}
                    </span>
                    <span className="capitalize">
                      Category: {activeItem.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}