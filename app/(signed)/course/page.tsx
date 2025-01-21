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

                {/* Hiển thị khi phần tử nằm ở 40% màn hình */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }} // Ẩn ban đầu & nằm thấp hơn
                    whileInView={{ opacity: 1, y: 0 }} // Hiện khi vào viewport
                    transition={{ duration: 0.8 }} // Hiệu ứng mượt hơn
                    viewport={{ margin: '-30%' }} // Kích hoạt khi phần tử ở 40% màn hình
                    style={{
                        backgroundImage: 'url("/planet1.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
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
