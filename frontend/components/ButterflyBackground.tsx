"use client";

import { motion } from "framer-motion";

const ButterflyBackground = () => {
  const butterflies = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {butterflies.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-200 rounded-full shadow-lg"
          animate={{
            x: [0, Math.random() * 800 - 400],
            y: [0, Math.random() * 600 - 300],
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
};

export default ButterflyBackground;
