import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CanadianLoadingScreenProps {
  onLoadingComplete: () => void;
  loadingTime?: number;
}

const CanadianLoadingScreen: React.FC<CanadianLoadingScreenProps> = ({ 
  onLoadingComplete, 
  loadingTime = 3000 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loadingSteps = [
    { text: "Connecting to Canadian markets", icon: "🌲" },
    { text: "Loading real-time data", icon: "🍁" },
    { text: "Preparing your financial insights", icon: "🏔️" },
    { text: "Welcome to MapleMetrics", icon: "🇨🇦" }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, loadingTime / loadingSteps.length);

    const completeTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500);
    }, loadingTime);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, [loadingTime, loadingSteps.length, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating maple leaves */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-red-500 opacity-20"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0
                }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: 360,
                  x: Math.random() * window.innerWidth
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5
                }}
                style={{ fontSize: '2rem' }}
              >
                🍁
              </motion.div>
            ))}
            
            {/* Subtle geometric patterns */}
            <div className="absolute top-20 left-20 w-32 h-32 border border-red-200 rounded-full opacity-10" />
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-red-200 rounded-full opacity-10" />
            <div className="absolute top-1/2 left-10 w-16 h-16 border border-red-200 rounded-full opacity-10" />
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 1 
              }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🍁</span>
              </div>
            </motion.div>

            {/* App name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              MapleMetrics
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gray-600 mb-12 text-sm"
            >
              Your Canadian Financial Companion
            </motion.p>

            {/* Loading steps */}
            <div className="space-y-4">
              {loadingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: currentStep >= index ? 0 : -20, 
                    opacity: currentStep >= index ? 1 : 0.3 
                  }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className={`flex items-center justify-center space-x-3 transition-all duration-300 ${
                    currentStep === index ? 'text-red-600 font-medium' : 'text-gray-500'
                  }`}
                >
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-sm">{step.text}</span>
                  {currentStep === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-red-500 rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="mt-8 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto max-w-xs"
            />

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center space-x-1 mt-6"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CanadianLoadingScreen;