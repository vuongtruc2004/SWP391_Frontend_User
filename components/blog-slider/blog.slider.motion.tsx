import { motion } from "framer-motion";

interface IProps {
    isInView: any;
}
const BlogSliderMotion = (props: IProps) => {
    const { isInView } = props;

    return (
        <motion.div
            initial={{ opacity: 0, x: -50, y: 50, rotate: 0 }}
            animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : -50,
                y: isInView ? 0 : 50,
                rotate: isInView ? 0 : 50
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='w-28 h-28 rounded-full absolute left-[-50px] bottom-[-40px]'
            style={{
                backgroundImage: 'url("/planet2.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        />
    )
}

export default BlogSliderMotion