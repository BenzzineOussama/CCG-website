'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from './Logo';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadingComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const actualProgress = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Container principal */}
          <div className="relative flex flex-col items-center">
            {/* Logo animé */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Cercle de fond avec effet de respiration */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-64 h-64 bg-ccg-green rounded-full" />
              </motion.div>

              {/* Logo de l'entreprise */}
              <motion.div
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-gray-900"
              >
                <Logo width={240} height={72} />
              </motion.div>
            </motion.div>

            {/* Barre de progression directement sous le logo */}
            <motion.div
              className="w-64 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-ccg-green rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${actualProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                {/* Effet de brillance subtile */}
                <motion.div
                  className="absolute inset-y-0 w-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              
              {/* Texte de chargement */}
              <motion.p
                className="text-center mt-4 text-sm text-gray-600 font-medium"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Chargement en cours...
              </motion.p>
            </motion.div>

            {/* Points animés */}
            <div className="flex space-x-2 mt-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-ccg-green rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}