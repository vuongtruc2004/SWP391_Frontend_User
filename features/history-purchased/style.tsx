import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';

export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&::before': {
        display: 'none',
    },
    borderRadius: '6px'
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={null} {...props} />
))(({ theme }) => ({
    [`&.${accordionSummaryClasses.root}`]: {
        borderRadius: '6px',
    },
    [`&.${accordionSummaryClasses.expanded}`]: {
        borderRadius: '6px 6px 0 0',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    backgroundColor: '#1c1c1c',
}));
