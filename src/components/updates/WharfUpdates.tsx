import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { NewsUpdate } from '../../constants/types';
import wharfUpdates from '../../constants/newsUpdates.json';
import UpdateCard from './UpdateCard';
import Footer from './Footer';
import styles from './WharfUpdates.module.scss';

/**
 * Component for general Wharf area
 */
const WharfUpdates = () => {
    const updates: NewsUpdate[] = wharfUpdates.updates.wharf[0].title
        ? wharfUpdates.updates.wharf.map((update) => {
              return update;
          })
        : [
              {
                  image: 'https://assets.website-files.com/5fb54ad4b4c1fcf604ea4bd0/5fb5a894d0070f1d4c960029_67M_P6c%20(00599).jpg',
                  title: 'Check Back for More Updates',
                  body: '',
              },
          ];

    return (
        <div className={styles.updateContainer}>
            <h4>Stay Up To Date</h4>
            <Grid container className={styles.twitterContainer} spacing={4}>
                <Grid item className={styles.item} xs={5}>
                    <Paper elevation={6}>
                        <Timeline
                            dataSource={{
                                sourceType: 'profile',
                                screenName: 'theWharfDC',
                            }}
                            options={{
                                height: '400',
                                width: '600',
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item className={styles.item} xs={5}>
                    <Grid container spacing={2}>
                        {updates.map((update) => {
                            return (
                                <Grid item xs={12} className={styles.card} key={update.title}>
                                    <UpdateCard
                                        image={update.image}
                                        title={update.title}
                                        body={update.body}
                                        link={update.link}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
                <Footer />
            </Grid>
        </div>
    );
};

export default WharfUpdates;
