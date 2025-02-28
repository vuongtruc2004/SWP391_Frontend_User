import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import { Box, CircularProgress, circularProgressClasses, CircularProgressProps } from "@mui/material";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&::before': {
        display: 'none',
    },
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={< ChevronRightOutlinedIcon className='text-gray-500' sx={{ fontSize: '1.2rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    backgroundColor: '#1c1c1c'
}));

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