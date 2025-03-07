import { Addnew } from "@/components/expense/add-new";
import { RecentTransactions } from "./expense/transaction-history";
import { User } from "@/components/Sidebar";
import ChartSquare from "./ChartSquare";
import { motion } from "framer-motion";
import {
  DollarSign,
  PieChart,
  Calendar,
  ShoppingBag,
  CreditCard,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = ({ user }: { user: User }) => {
  console.log(user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {user.data.totalAmount === 0 && user.data.currentExpense === 0 ? (
        <div className="h-screen bg-slate-50 w-full overflow-hidden">
          {mounted && (
            <motion.div
              className="h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center mb-6 sm:mb-8 px-2"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                  Start Your Financial Journey
                </h1>
                <p className="text-gray-500 font-bold mt-2 text-sm max-w-md mx-auto">
                  Track, analyze, and optimize your spending habits with our
                  intuitive expense tracker
                </p>
              </motion.div>

              <motion.div
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8 sm:mb-10 md:mb-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-teal-100 to-blue-100"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {[DollarSign, ShoppingBag, CreditCard, Calendar, PieChart].map(
                  (Icon, index) => {
                    const angle = index * (360 / 5) * (Math.PI / 180);
                    const baseRadius = 80;
                    const radiusScale = {
                      sm: 0.8, // Small screens
                      md: 0.9, // Medium screens
                      lg: 1, // Large screens
                    };

                    const getRadius = () => {
                      if (typeof window !== "undefined") {
                        if (window.innerWidth < 640)
                          return baseRadius * radiusScale.sm;
                        if (window.innerWidth < 768)
                          return baseRadius * radiusScale.md;
                        return baseRadius * radiusScale.lg;
                      }
                      return baseRadius;
                    };

                    const radius = getRadius();
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={index}
                        className="absolute top-[68px] left-[105px] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-full shadow-lg"
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 0,
                        }}
                        animate={{
                          x,
                          y,
                          opacity: 1,
                          rotate: [0, 360],
                        }}
                        transition={{
                          delay: 0.6 + index * 0.1,
                          duration: 0.5,
                          rotate: {
                            delay: 1,
                            duration: 20 + index * 2,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                      >
                        <Icon size={20} className="text-blue-500" />
                      </motion.div>
                    );
                  }
                )}

                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 rounded-full shadow-xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(79, 209, 197, 0.3)",
                      "0 0 0 20px rgba(79, 209, 197, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Zap size={24} className="text-white" />
                </motion.div>
              </motion.div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-xs sm:max-w-2xl lg:max-w-4xl mb-8 sm:mb-10 md:mb-12 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  {
                    number: 1,
                    title: "Add Your Income",
                    desc: "Set your starting budget",
                  },
                  {
                    number: 2,
                    title: "Track Expenses",
                    desc: "Record your daily spending",
                  },
                  {
                    number: 3,
                    title: "Gain Insights",
                    desc: "See where your money goes",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border border-gray-100"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
                      borderColor: "#e5e7eb",
                    }}
                  >
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-xs sm:text-sm mr-2 sm:mr-3">
                        {step.number}
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 italic text-center text-xs sm:text-sm">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 1.4,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl blur-sm opacity-70"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative">
                  <Addnew />
                </div>
              </motion.div>
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full hidden sm:block"
                  style={{
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                    background:
                      i % 2 ? "rgb(94, 234, 212)" : "rgb(59, 130, 246)",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.3,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      ) : (
        <div className="h-screen w-full p-2 sm:p-14 md:p-3">
          <div className="flex flex-col md:flex-row gap-2 lg:gap-6">
            <div className="bg-white p-3 lg:p-6 w-full md:w-2/3 space-y-7 sm:space-y-10 shadow-md rounded-lg">
              <div className="flex flex-wrap sm:flex-nowrap justify-around gap-4">
                <div className="text-center p-5 bg-[#f0e347] rounded-3xl w-1/3">
                  <h1 className="text-xl sm:text-2xl font-bold mt-2 flex gap-1 items-center">
                    <span className="text-gray-600 font-semibold text-lg">
                      {user.data.currency}
                    </span>
                    {user.data.totalAmount}
                  </h1>
                  <p className="text-xs text-start font-medium mt-2">Income</p>
                </div>
                <div className="text-center p-5 bg-[#f0e3ff] rounded-3xl w-1/3">
                  <h1 className="text-xl sm:text-2xl font-bold mt-2 flex gap-1 items-center">
                    <span className="text-gray-600 font-semibold text-lg">
                      {user.data.currency}
                    </span>{" "}
                    {user.data.totalAmount - user.data.currentExpense}
                  </h1>
                  <p className="text-xs text-start font-medium mt-2">Balance</p>
                </div>
                <div className="text-center p-5 bg-[#abe2c2] rounded-3xl w-1/3">
                  <h1 className="text-xl sm:text-2xl font-bold mt-2 flex gap-1 items-center">
                    <span className="text-gray-600 font-semibold text-lg">
                      {user.data.currency}
                    </span>
                    {user.data.currentExpense}
                  </h1>
                  <p className="text-xs text-start font-medium mt-2">
                    Expenses
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Addnew />
              </div>
            </div>

            <div className="bg-white w-full md:w-1/2 shadow-md rounded-lg flex justify-center items-center">
              <ChartSquare user={user} />
            </div>
          </div>

          <div className="bg-white p-3 sm:p-6 shadow-md rounded-lg mt-6">
            <RecentTransactions />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
