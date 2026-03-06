import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dashboard1 from "@/assets/dashboard-1.jpg";
import dashboard2 from "@/assets/dashboard-2.jpg";
import dashboard3 from "@/assets/dashboard-3.jpg";
import dashboard4 from "@/assets/dashboard-4.jpg";

const slides = [
  { src: dashboard1, alt: "ERP Analytics Dashboard" },
  { src: dashboard2, alt: "HR Management Dashboard" },
  { src: dashboard3, alt: "ESG Sustainability Dashboard" },
  { src: dashboard4, alt: "Business Intelligence Dashboard" },
];

const DashboardCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
      {/* Dots */}
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
