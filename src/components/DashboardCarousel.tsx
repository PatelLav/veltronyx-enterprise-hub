import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselSlide {
  src: string;
  alt: string;
}

interface DashboardCarouselProps {
  slides: CarouselSlide[];
  interval?: number;
}

const DashboardCarousel = ({ slides, interval = 4000 }: DashboardCarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border shadow-2xl shadow-primary/10">
      <div className="aspect-video relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current].src}
            alt={slides[current].alt}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-6" : "bg-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCarousel;
