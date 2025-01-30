'use client'
import { Box, keyframes } from "@mui/material";

interface IProps {
    subjectList: SubjectResponse[];
}
const SubjectSlider = (props: IProps) => {
    const { subjectList } = props;
    const autoRun = keyframes`
                    from {
                        left: 100%;
                    }
                    to {
                        left: -150px;
                    }
                    `;

    return (
        <Box sx={{
            width: '100%',
            position: 'absolute',
            left: 0,
            bottom: '10px',
            height: '50px',
            mask: 'linear-gradient(to right, transparent, #000 20% 80%, transparent)',
            overflow: 'hidden',
            'ul': {
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                minWidth: `${subjectList.length * 150}px`,
                position: 'relative',
                'li': {
                    textTransform: 'uppercase',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    width: '150px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 0,
                    left: '100%',
                    color: 'white',
                    animation: `${autoRun} 20s linear infinite`,
                    cursor: 'pointer',
                    transition: 'all .2s',
                    '&:hover': {
                        color: '#60a5fa'
                    }
                }
            },
            '&:hover ul li': {
                animationPlayState: 'paused'
            }
        }}>
            <ul>
                {subjectList?.map((item, index) => {
                    return (
                        <li key={index} style={{
                            animationDelay: `calc( (20s / ${subjectList.length}) * (${index}))`
                        }}>
                            {item.subjectName}
                        </li>
                    )
                })}
            </ul>
        </Box>
    )
}

export default SubjectSlider