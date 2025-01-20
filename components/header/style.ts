'use client'
import { styled } from "@mui/material";

export const SearchIconWrapperStyled = styled('span')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    aspectRatio: 1,
    borderRadius: '5px 0 0 5px',
    color: 'white',
})

export const SearchInputStyled = styled('input')({
    width: '220px',
    height: '36px',
    borderRadius: '0 5px 5px 0',
    fontSize: '1rem',
    border: 0,
    padding: '10px 20px',
    paddingLeft: '5px',
    outline: '0',
    background: 'transparent',
    lineHeight: '36px',
    '&::placeholder': {
        color: 'white'
    }
})

export const LabelStyled = styled('label')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(255,255, 255, 0.4)',
    borderRadius: '5px',
    paddingLeft: '5px',
})