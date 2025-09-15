import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StableAnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  intervalMs?: number;
}

export function StableAnimatedList({ 
  children, 
  className = "",
  intervalMs = 2000 
}: StableAnimatedListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate how many pairs we can show (2 cards at a time)
  const cardsPerView = 2;
  const totalPairs = Math.ceil(children.length / cardsPerView);

  // Check if component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCurrentIndex(0); // Reset when out of view
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle animation cycle
  useEffect(() => {
    if (!isVisible || totalPairs <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPairs);
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, totalPairs, intervalMs]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Get current pair of cards to display
  const getCurrentCards = () => {
    const startIndex = currentIndex * cardsPerView;
    const endIndex = Math.min(startIndex + cardsPerView, children.length);
    return children.slice(startIndex, endIndex);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        contain: 'layout style paint', // Isolate this component's rendering
        willChange: 'transform', // Optimize for animations
      }}
    >
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "tween"
            }}
            className="w-full space-y-3"
            style={{
              transform: 'translateZ(0)', // Force hardware acceleration
              backfaceVisibility: 'hidden' // Prevent flickering
            }}
          >
            {getCurrentCards().map((child, index) => (
              <div key={`${currentIndex}-${index}`} className="w-full">
                {child}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPairs }, (_, index) => (
          <div
            key={index}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-cta' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
