import { motion } from "framer-motion";

interface IProps {
    isInView: any;
}
const SubjectListMotion = (props: IProps) => {
    const { isInView } = props;

    return (
        <motion.div
            initial={{ opacity: 0, x: -50, y: 50, rotate: 0 }}
            animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : -50,
                y: isInView ? 0 : 50,
                rotate: isInView ? 0 : 80
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='w-[150px] h-[150px] rounded-full absolute right-[100px] top-[-70px] -rotate-12'
            style={{
                backgroundImage: 'url("/planet3.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
            }}
        />
    )
}

export default SubjectListMotion