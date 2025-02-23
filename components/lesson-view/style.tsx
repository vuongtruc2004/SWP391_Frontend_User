'use client'
import { Box, CircularProgress, circularProgressClasses, CircularProgressProps, styled, Tab, Tabs } from "@mui/material";

interface CircularProgressPropsPrime extends CircularProgressProps {
    thumb_color?: string | null;
    percentage?: React.ReactNode;
}
export const FacebookCircularProgress = (props: CircularProgressPropsPrime) => {
    return (
        <Box sx={{ position: 'relative', height: '32px' }}>
            <CircularProgress
                variant="determinate"
                sx={(theme) => ({
                    ...theme.applyStyles('dark', {
                        color: theme.palette.grey[800],
                    }),
                })}
                size={32}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={(theme) => ({
                    color: '#1a90ff',
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                    ...theme.applyStyles('dark', {
                        color: props.thumb_color || '#dab2ff',
                    }),
                })}
                size={32}
                thickness={4}
                {...props}
            />

            {props.percentage && (
                <div className="absolute top-1/2 left-1/2 -translate-1/2">
                    {props.percentage}
                </div>
            )}
        </Box>
    );
}

export const TabsStyled = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: '#2b7fff',
    },
});

export const TabStyled = styled(Tab)({
    color: '#adb5bd',
    textTransform: 'none',
    fontSize: '1rem',
    '&.Mui-selected': {
        color: '#2b7fff',
    },
})