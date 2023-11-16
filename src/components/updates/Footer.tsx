import React, { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import { componentContext } from '../../contexts/componentContext';
// import { pageScrollerContext } from '../../contexts/pageScrollerContext';
import usePageScroll from '../../hooks/usePageScroll';
import style from './Footer.module.scss';

const Footer = () => {
    // const { scrollPage } = usePageScroll();
    // const { container } = useContext(pageScrollerContext);
    // const { setComponentIndex } = useContext(componentContext);

    const onClick = () => {
        // scrollPage(0, container);
        // setComponentIndex(0);
    };

    return (
        <div className={style.footerContainer}>
            <div className={style.image}>
                <Grid container className={style.content}>
                    <Grid item xs={5} className={style.logo} />
                    <Grid item xs={5} className={style.buttonWrapper}>
                        <Button color="primary" variant="contained" onClick={onClick} className={style.button}>
                            Return to Top
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Footer;
