'use client'
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import { CircularProgressProps } from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

interface CircularProgressPropsExpand extends CircularProgressProps {
    width?: number;
}
export default function FacebookCircularProgress(props: CircularProgressPropsExpand) {
    return (
        <Box sx={{ position: 'relative', height: `${props.width ?? 30}px` }}>
            <CircularProgress
                variant="determinate"
                sx={(theme) => ({
                    color: '#ced4da',
                })}
                size={props.width ?? 30}
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
                    }
                })}
                size={props.width ?? 30}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

interface BorderLinearProgressProps {
    thumb_color?: string;
}
export const BorderLinearProgress = styled(LinearProgress, {
    shouldForwardProp: (prop) => prop !== 'thumb_color',
})<BorderLinearProgressProps>(({ theme, thumb_color }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: thumb_color ?? '#c27aff',
    },
}));
