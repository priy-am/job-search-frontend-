"use client";
import { motion } from "framer-motion";

export default function PrettyLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      {/* Rotating Gradient Ring */}
      <motion.div
        className="w-24 h-24 border-4 border-t-transparent border-r-purple-400 border-b-purple-500 border-l-purple-600 rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />00*

      {/* Pulse text or logo */}
      <motion.h1
        className="mt-6 text-xl font-semibold tracking-wide text-purple-300"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        Loading Awesomeness...
      </motion.h1>
    </div>
  );
}
