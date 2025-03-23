'use client'
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import CamapignModal from "@/features/campaign/campaign.modal";

const CampaignIcon = () => {
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const [openModal, setOpenModal] = useState<boolean>(false)

    const openCampaignModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) {
            setOpenModal(true)
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
                    bottom: 90,
                    zIndex: 16,
                    cursor: 'grab',
                    userSelect: 'none',
                    width: '50px',
                    height: '50px',
                    backgroundImage: 'url(/gift.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '50%',
                    border: 'none',
                    outline: 'none',
                }}
                whileTap={{ cursor: 'grabbing' }}
                onClick={openCampaignModal}
            />
            <CamapignModal open={openModal} setOpen={setOpenModal} />
        </>
    );
}

export default CampaignIcon;