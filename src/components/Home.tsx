import React, { useEffect, useRef, useState } from 'react';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import Grid from '@mui/material/Grid';
// import PageScroller from '../scroller/PageScroller';
import Faq from './faq/Faq';
import ResourceLinks from './resources/ResourceLinks';
import styles from './Home.module.scss';
import Hero from './Hero';
import AskField from './AskField';
// import ComponentProvider from '../contexts/componentContext';
import useAccordionScroller from '../hooks/useAccordionScroller';
import OfficeUpdates from './updates/OfficeUpdates';
import WharfUpdates from './updates/WharfUpdates';
import RestaurantList from './restaurants/RestaurantList';
import BuildingRenderings from './buildingRenderings/BuildingRenderings';

/**
 * Main component displaying the single page site
 * Includes the Header banner image, carousel of gallery images, video player, external links,
 * collapsable accordian of frequently asked questions, and a live twitter feed of theWharfDC
 */
const Home = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
    const { canScroll, setCanScroll, onScroll } = useAccordionScroller(ref, expanded);

    useEffect(() => {
        setCanScroll(!expanded);
    }, [expanded]);

    return (
        <div className={styles.homePage}>
            {/* <ComponentProvider>
                <PageScroller scrolling={canScroll}> */}
                    <Hero />
                    <Grid container className={styles.container} ref={ref} onScroll={onScroll}>
                        <div className={styles.scroller} id="update-container">
                            <Grid item className={styles.item} xs={11}>
                                <OfficeUpdates />
                            </Grid>
                        </div>
                    </Grid>
                    <Grid container className={styles.container} ref={ref} onScroll={onScroll}>
                        <div className={styles.scroller} id="update-container">
                            <Grid item className={styles.item} xs={11}>
                                <BuildingRenderings />
                            </Grid>
                        </div>
                    </Grid>
                    {/* Accordian items must be closed for the website to continue scrolling. 
                    adding onScroll={onScroll} to Grid would be a good idea, but it seems to have
                    issues at the moment*/}
                    <Grid container className={styles.container} ref={ref}>
                        <div className={styles.scroller} id="accordian-container">
                            <Grid item className={styles.item} xs={11}>
                                <Faq setExpanded={setExpanded} />
                            </Grid>
                        </div>
                    </Grid>
                    <AskField />
                    {/* Users will have to navigate the restaurant list via the 
                    scrollbar, rather than using the wheel. Since the overflow isnt on the 
                    Grid, onScroll won't work*/}
                    <Grid container className={styles.container}>
                        <div className={styles.scroller} id="restaurant-container">
                            <Grid item xs={11}>
                                <RestaurantList />
                            </Grid>
                        </div>
                    </Grid>
                    <ResourceLinks />
                    <WharfUpdates />
                {/* </PageScroller>
            </ComponentProvider> */}
        </div>
    );
};

export default Home;
