import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { Addnew } from "./expense/add-new";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-indigo-900 via-purple-900 to-rose-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 0.9],
              opacity: [0, 0.5, 0.3],
              transition: {
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
            }}
          />
        ))}
      </div>

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-200 opacity-70"
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [0, -20, 5],
            rotate: [0, 10, -10],
            transition: {
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <Star size={Math.random() * 16 + 12} />
        </motion.div>
      ))}

      <motion.header
        className={`fixed top-0 w-full z-50 ${
          scrolled ? "bg-black/50 backdrop-blur-lg py-2" : "py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-white font-bold text-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                VaultIQ
              </span>
            </motion.div>
          </div>
        </div>
      </motion.header>
      <main className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div
          className="container mx-auto text-center z-10"
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            variants={fadeIn}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Take Control of Your Finances.
            </motion.span>
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Track, Save, and Grow.
            </motion.span>
            <motion.span
              className="block mt-2 text-lg md:text-xl lg:text-2xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Smart budgeting made easy—manage expenses effortlessly and build a
              better future.
            </motion.span>
          </motion.h1>
          <div className="flex justify-center items-center mt-14">
            <div>
              <Addnew />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
