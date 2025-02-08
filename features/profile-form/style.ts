'use client'
import { styled } from "@mui/material";

export const VisuallyHiddenInput = styled('input')({
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer'
});