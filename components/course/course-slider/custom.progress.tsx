'use client'
import LinearProgress from "@mui/material/LinearProgress";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

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
