import React, { useContext } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import styles from './Hero.module.scss';
import UpdateBanner from './newsBanner/UpdateBanner';
import usePageScroll from '../hooks/usePageScroll';
import { pageScrollerContext } from '../contexts/pageScrollerContext';
import { componentContext } from '../contexts/componentContext';

const TITLE = 'PhRMA’s Future \n 2024 Headquarters';
const SUB_TITLE = '670 Maine Avenue SW, Washington, DC';

const OFFICE_UPDATES = 1;
const RENDERINGS = 2;
const FAQ = 3;
const DINING = 5;
const RESOURCES = 6;
const TWITTER = 7;

/**
 * Component to display a fullscreen video as the page hero
 */
const Hero = () => {
    const { scrollPage } = usePageScroll();
    const { container } = useContext(pageScrollerContext);
    const { setComponentIndex } = useContext(componentContext);

    const onClick = (e: any) => {
        let index = 0;
        switch (e.target.id) {
            case 'office-updates':
                index = OFFICE_UPDATES;
                break;
            case 'building-renderings':
                index = RENDERINGS;
                break;
            case 'wharf-updates':
                index = TWITTER;
                break;
            case 'casual-dining':
                index = DINING;
                break;
            case 'faq':
                index = FAQ;
                break;
            case 'resources':
                index = RESOURCES;
        }
        // scrollPage(index, container);
        // setComponentIndex(index);
    };

    const onOfficeClick = () => {
        // scrollPage(OFFICE_UPDATES, container);
        // setComponentIndex(OFFICE_UPDATES);
    };

    const onWharfClick = () => {
        // scrollPage(TWITTER, container);
        // setComponentIndex(TWITTER);
    };

    return (
        <section className={styles.root}>
            <ReactPlayer
                url="https://phrmadataapi.azurewebsites.net/assets/phrmawharf.mp4"
                playing
                loop
                muted
                width="100%"
                height="100%"
                className={styles.player}
            />
            <div className={styles.overlay}>
                <UpdateBanner onOfficeClick={onOfficeClick} onWharfClick={onWharfClick} />
                <Grid container className={styles.container}>
                    <Grid item xs={7} className={styles.innerBox}>
                        <Box
                            height="90%"
                            display="flex"
                            justifyContent="start"
                            alignItems="center"
                            color="#fff"
                            paddingLeft="26px"
                        >
                            <div className={styles.content}>
                                <Typography variant="h1" component="h1" className={styles.title}>
                                    {TITLE}
                                </Typography>
                                <Typography variant="button" component="p" className={styles.subtitle}>
                                    {SUB_TITLE}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={5} className={styles.navBox}>
                        <Box
                            height="90%"
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            color="#fff"
                            paddingBottom="25px"
                        >
                            <div className={styles.navbar}>
                                <div className={styles.rowOne}>
                                    <svg
                                        height="25"
                                        width="25"
                                        className={styles.icon}
                                        style={{
                                            position: 'relative',
                                            top: 25,
                                            borderRadius: 2,
                                            zIndex: 999,
                                        }}
                                    >
                                        <polygon
                                            fill="yellow"
                                            points="0,0 25,0 0,25"
                                            style={{ strokeWidth: 1, stroke: 'yellow' }}
                                        ></polygon>
                                        <text style={{ fontSize: 14 }} x={4} y={13}>
                                            1
                                        </text>
                                    </svg>
                                    <Button
                                        id="office-updates"
                                        className={styles.button}
                                        variant="contained"
                                        onClick={onClick}
                                        size="small"
                                    >
                                        PhRMA Office Renderings
                                    </Button>
                                    <Button
                                        id="building-renderings"
                                        className={styles.button}
                                        variant="contained"
                                        onClick={onClick}
                                        size="small"
                                    >
                                        Building Renderings
                                    </Button>
                                    <Button
                                        id="faq"
                                        className={styles.button}
                                        variant="contained"
                                        onClick={onClick}
                                        size="small"
                                    >
                                        FAQ
                                    </Button>
                                </div>
                                <div className={styles.rowTwo}>
                                    <Button
                                        id="casual-dining"
                                        className={styles.button}
                                        variant="contained"
                                        onClick={onClick}
                                        size="small"
                                    >
                                        Casual Dining Options
                                    </Button>
                                    <Button
                                        id="resources"
                                        className={styles.button}
                                        variant="contained"
                                        onClick={onClick}
                                        size="small"
                                    >
                                        Resources
                                    </Button>
                                    <Button
                                        id="wharf-updates"
                                        className={styles.button}
                                        variant="contained"
                                        onClick={onClick}
                                        size="small"
                                    >
                                        Wharf in the News
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </section>
    );
};

export default Hero;
