import React from 'react';
import FaqAccordion from './FaqAccordion';
import PrintableFaq from './PrintableFaq';
import useApi from '../../hooks/useApi';
import { Paper } from '@mui/material';

interface FaqProps {
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Faq: React.FC<FaqProps> = ({ setExpanded }) => {
    const { result, isLoaded } = useApi('GET');

    return (
        <div>
            <h4>Frequently Asked Questions</h4>
            {isLoaded && result ? (
                <>
                    <PrintableFaq faq={result} />
                    <Paper elevation={6}>
                        <FaqAccordion result={result} setIsExpanded={setExpanded} />
                    </Paper>
                </>
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    );
};

export default Faq;
