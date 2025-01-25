'use client'
import { motion, useScroll, useTransform } from "framer-motion";

const CoursePage = () => {
    const { scrollYProgress } = useScroll();
    const background = useTransform(scrollYProgress, [0, 1], ["#fff", "#60a5fa"]);

    return (
        <div className='bg-black min-h-screen'>
            <div className='h-screen'></div>

            <div className='m-auto w-max h-max text-white'>
                <h3 className='text-center'>Show me on scroll</h3>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ margin: '-30%' }}
                    style={{
                        backgroundImage: 'url("/planet1.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                    className='w-32 h-32 rounded-full'
                />
            </div>

            <motion.div
                style={{
                    scaleX: scrollYProgress,
                    x: "-50%",
                    y: '-50%',
                    background
                }}
                className='fixed left-1/2 bottom-0 bg-blue-500 h-1 w-screen'
            />

            <div className='h-screen'></div>
        </div>
    );
}

export default CoursePage;
