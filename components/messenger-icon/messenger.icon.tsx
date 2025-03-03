'use client'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { motion } from "framer-motion";

const MessengerIcon = () => {
    const [open, setOpen] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const openMessengerChat = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.currentTarget);
        // if (!isDragging) {
        //     window.open("https://m.me/61573093011541", "_blank");
        // }
    };

    return (
        <>
            {open && (
                <motion.div
                    aria-label="Open Messenger Chat"
                    drag
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setTimeout(() => setIsDragging(false), 200)}
                    style={{
                        position: 'fixed',
                        right: 30,
                        bottom: 30,
                        zIndex: 16,
                        cursor: 'grab',
                        userSelect: 'none',
                        width: '50px',
                        height: '50px',
                        backgroundImage: 'url(/messenger.webp)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '50%',
                        border: 'none',
                        outline: 'none',
                    }}
                    whileTap={{ cursor: 'grabbing' }}
                    onClick={(e) => openMessengerChat(e)}
                >
                    <div className='absolute top-[-10px] right-[-5px] cursor-pointer text-blue-400 hover:text-blue-500'>
                        <CloseIcon sx={{ fontSize: '16px' }} />
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default MessengerIcon;