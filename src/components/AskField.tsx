import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import style from './AskField.module.scss';
import useApi from '../hooks/useApi';
import useValidation from '../hooks/useValidation';

/**
 * Component to take a user's question and submit it to a public affairs person's email
 */
const AskField = () => {
    const [text, setText] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [valid, setValid] = useState<boolean | undefined>();
    const { sendEmail } = useValidation();

    const validator = (question: string) => {
        if (!question) {
            setSubmitted(false);
            setValid(false);
            return;
        }
        setValid(true);
        setSubmitted(true);
        sendEmail(text);
    };

    const onClick = () => {
        validator(text);
        setDisabled(true);
    };

    return (
        <div className={style.container}>
            <Typography className={style.title} gutterBottom variant="h5" component="div">
                Have questions we didn't answer? Ask Us!
            </Typography>
            <Grid container className={style.formContainer}>
                <Paper elevation={6}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Ask Here"
                            multiline
                            rows={18}
                            className={style.form}
                            defaultValue={text}
                            onChange={(newText) => {
                                setText(newText.target.value);
                                setDisabled(false);
                            }}
                        />
                    </Grid>
                </Paper>
            </Grid>
            {submitted && (
                <Typography className={style.caption} gutterBottom variant="subtitle1" component="div">
                    Thank you for your question, please check back later to see your question answered.
                </Typography>
            )}
            {valid === false && (
                <Typography className={style.error} gutterBottom variant="subtitle1" component="div">
                    Please fill out the form with your question to submit
                </Typography>
            )}
            <div className={style.buttonWrapper}>
                <Button className={style.button} variant="contained" size="small" onClick={onClick} disabled={disabled}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default AskField;
