import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&::before': {
        display: 'none',
    },
    borderRadius: '6px'
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={< ChevronRightOutlinedIcon className='text-gray-500' sx={{ fontSize: '1.2rem' }} />} {...props} />
))(({ theme }) => ({
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`&.${accordionSummaryClasses.root}`]: {
        borderRadius: '6px',
    },
    [`&.${accordionSummaryClasses.expanded}`]: {
        borderRadius: '6px 6px 0 0',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3)
    },
    backgroundColor: '#1c1c1c',
}));
