"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const HorizontalScrollbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const scrollbarBackground = useTransform(scrollYProgress, [0, 1], ["#dbeafe", "#60a5fa"]);
  const [showScrollbar, setShowScrollbar] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      setShowScrollbar(document.documentElement.scrollHeight > window.innerHeight);
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  return (
    <>
      {children}
      {showScrollbar && (
        <motion.div
          style={{
            scaleX: scrollYProgress,
            x: "-50%",
            background: scrollbarBackground,
            height: "3px",
            zIndex: "100",
          }}
          className="fixed left-1/2 bottom-0 bg-blue-500 w-screen"
        />
      )}
    </>
  );
};

export default HorizontalScrollbarWrapper;
