'use client'
import { Box, CircularProgress, circularProgressClasses, CircularProgressProps, styled, Tab, Tabs } from "@mui/material";

interface CircularProgressPropsPrime extends CircularProgressProps {
    thumb_color?: string | null;
}
export const FacebookCircularProgress = (props: CircularProgressPropsPrime) => {
    return (
        <Box sx={{ position: 'relative' }}>
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
        </Box>
    );
}

export const TabsStyled = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: '#dab2ff',
    },
});

export const TabStyled = styled(Tab)({
    color: '#adb5bd',
    '&.Mui-selected': {
        color: '#dab2ff',
    },
})