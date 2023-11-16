import React from 'react';
import Grid from '@mui/material/Grid';
import resources from '../../constants/resources.json';
import LinkCard from './LinkCard';
import style from './ResourceLinks.module.scss';

/**
 * Component to list external sites for more information, these will open in new tabs
 */
const ResourceLinks = () => {
    return (
        <div className={style.resourcesSection}>
            <Grid container alignItems="center" className={style.gridLayout} spacing={4}>
                {resources.sites.map((resource) => {
                    return (
                        <Grid item xs={4} className={style.card} key={resource.name}>
                            <LinkCard
                                image={resource.image}
                                name={resource.name}
                                url={resource.url}
                                description={resource.desc}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default ResourceLinks;
