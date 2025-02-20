"use client";


import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { ReactNode } from 'react';

interface Props {
    label: string;
    children: ReactNode;
}

function ReusableAccordion({ label, children }: Props) {

    return (
        <Accordion sx={{ boxShadow: 0 }}>
            <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
            >
                <Typography component="span">{label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default ReusableAccordion