'use client'
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MessengerIcon = () => {
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const openMessengerChat = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) {
            window.open("https://m.me/61573093011541", "_blank");
        }
    };

    return (
        <>
            <motion.div ref={containerRef} className='fixed top-0 left-0 w-full h-full z-[-1]' />
            <motion.div
                aria-label="Open Messenger Chat"
                drag
                dragConstraints={containerRef}
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
            />
        </>
    );
}

export default MessengerIcon;