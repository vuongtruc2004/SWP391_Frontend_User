import { Box } from "@mui/material"

const LessonVideo = () => {
    return (
        <Box sx={{
            borderRadius: '6px',
            aspectRatio: 16 / 9,
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            'iframe': {
                width: '100%',
                height: '100%',
                borderRadius: '6px',
            }
        }}>
            <iframe
                width='800'
                height='450'
                src={`https://www.youtube.com/embed/LJDkOgVhadk?autoplay=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
            ></iframe>
        </Box>
    )
}

export default LessonVideo