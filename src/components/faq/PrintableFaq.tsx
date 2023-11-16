import React, { useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import style from './PrintableFaq.module.scss';

export interface PrintableFaqProps {
    faq: [];
}

/**
 * Component to convert FAQ data into a printer friendly component
 * When the button is clicked, the printer dialogue box is opened with the FAQs listed in bullet points
 * Takes the faq json returned from the API
 *
 * NOTE: This does not work on Firefox Android
 * @param faq
 */
const PrintableFaq: React.FC<PrintableFaqProps> = ({ faq }) => {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <Button onClick={handlePrint}>Click here to download</Button>
            <div ref={componentRef} className={style.printable}>
                <h4 className={style.title}>Frequently Asked Questions</h4>
                {faq.map((q: { question: string; answer: string }) => {
                    return (
                        <div key={q.question}>
                            <Typography fontSize={'1.1rem'}>{q.question}</Typography>
                            <Typography component={'span'} variant={'body2'}>
                                <div dangerouslySetInnerHTML={{ __html: q.answer }} />
                            </Typography>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PrintableFaq;
