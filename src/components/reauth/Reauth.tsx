import React from 'react';
import { Button, Grid } from '@mui/material';
import style from './Reauth.module.scss';

export interface ReauthProps {
    handleLogin: () => void;
}
/**
 * Component to display Unauthorised page so users can reauthenticate to access the site
 */
const Reauth: React.FC<ReauthProps> = ({ handleLogin }) => {
    return (
        <div className={style.reauthContainer}>
            <Grid item className={style.item} xs={11}>
                <h1>Please reauthenticate to access this page</h1>
                <br />
                <Button
                    variant="contained"
                    className={style.authButton}
                    onClick={() => {
                        handleLogin();
                    }}
                >
                    Login
                </Button>
            </Grid>
        </div>
    );
};

export default Reauth;
