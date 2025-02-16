import Box from "@mui/material/Box";
import Image from "next/image";

const ListEmpty = ({ text, height }: { text: string, height?: number }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: `${height || 300}px`,
        }}>
            <Image src="/empty.svg" alt="empty box" width={60} height={60} />
            <p className="text-white text-sm">{text}</p>
        </Box>
    )
}

export default ListEmpty