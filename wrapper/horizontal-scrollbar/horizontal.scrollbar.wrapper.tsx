'use client'
import { motion, useScroll, useTransform } from "framer-motion";

const HorizontalScrollbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const scrollbarBackground = useTransform(scrollYProgress, [0, 1], ["#dbeafe", "#60a5fa"]);

  return (
    <>
      {children}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          x: "-50%",
          background: scrollbarBackground,
          height: '5px',
          zIndex: '100'
        }}
        className='fixed left-1/2 bottom-0 bg-blue-500 w-screen'
      />
    </>
  )
}

export default HorizontalScrollbarWrapper