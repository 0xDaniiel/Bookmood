import { motion } from "framer-motion";

interface MoodCardProps {
  emoji: string;
  title: string;
  desc: string;
  onSwipe: (direction: "left" | "right") => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ emoji, title, desc, onSwipe }) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 w-80 text-center border border-amber-200"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100) onSwipe("right");
        if (info.offset.x < -100) onSwipe("left");
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-5xl mb-2">{emoji}</div>
      <h3 className="text-xl font-semibold text-[#4B2E05]">{title}</h3>
      <p className="text-sm text-[#6B4E1F] mt-2">{desc}</p>
      <p className="text-xs text-[#A67C52] mt-4 italic">Swipe → or ←</p>
    </motion.div>
  );
};

export default MoodCard;
