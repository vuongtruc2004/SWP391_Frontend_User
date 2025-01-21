import { motion } from "framer-motion";

interface IProps {
    isInView: any;
}
const CourseSliderMotion = (props: IProps) => {
    const { isInView } = props;

    return (
        <motion.div
            initial={{ opacity: 0, x: -50, y: 50, rotate: 20 }}
            animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : -50,
                y: isInView ? 0 : 50,
                rotate: isInView ? 0 : 50
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='w-24 h-24 rounded-full absolute left-[-40px] bottom-[-30px]'
            style={{
                backgroundImage: 'url("/planet1.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        />
    )
}

export default CourseSliderMotion