import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import style from './FaqAccordion.module.scss';

// General styling for the accordian component
const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
    ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    })
);

// The collapsed question section of the accordian
const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

// Styling for the expanded answer section of the accordian
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface FaqAccordionProps {
    result: [];
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Function to display the list of FAQs in the accordian
 */
const FaqAccordion: React.FC<FaqAccordionProps> = ({ result, setIsExpanded }) => {
    const [expanded, setExpanded] = useState<number | false>(0);

    const linkStyle = {
        paddingTop: '25px',
    };

    const handleChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        if (expanded) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    }, [expanded]);

    let i = 1;

    return (
        <div>
            {result.map((q: { question: string; answer: string }) => {
                i++;
                return (
                    <Accordion expanded={expanded === i - 1} onChange={handleChange(i - 1)} key={q.question}>
                        <AccordionSummary aria-controls={`{i-1}-content`} id={`{i-1}-header`}>
                            <Typography fontSize={'1.1rem'}>{q.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'span'} variant={'body2'}>
                                <div dangerouslySetInnerHTML={{ __html: q.answer }} />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
};

export default FaqAccordion;
