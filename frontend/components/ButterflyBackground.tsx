"use client";

import { motion } from "framer-motion";

const ButterflyBackground = () => {
  const butterflies = Array.from({ length: 17 });
  const colors = ["#FFD166", "#FAE8B8", "#FFE7C4", "#EED9B2"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {butterflies.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: colors[i % colors.length],
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 150 - 75, 0],
            rotate: [0, 15, -15, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          🦋
        </motion.div>
      ))}
    </div>
  );
};

export default ButterflyBackground;
