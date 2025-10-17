import MoodSwipeDeck from "@/components/MoodSwipeDeck";
import ButterflyBackground from "@/components/ButterflyBackground";

export default function Home() {
  return (
    <main className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-amber-50 to-rose-100 overflow-hidden">
      <ButterflyBackground />
      <div className="z-10">
        <h1 className="text-4xl font-bold text-[#4B2E05] mb-6 text-center">
          How are you feeling today? 🌙
        </h1>
        <MoodSwipeDeck />
      </div>
    </main>
  );
}
