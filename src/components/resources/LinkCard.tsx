import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './LinkCard.module.scss';

interface LinkCardProps {
    image: string;
    name: string;
    url: string;
    description: string;
}

/**
 * Component to display additional resources as cards.
 * Includes image, description, and link to external site
 *
 * @param image
 * @param name
 * @param url
 * @param description
 */
const LinkCard: React.FC<LinkCardProps> = ({ image, name, url, description }) => {
    return (
        <Card className={style.cardContainer} elevation={6}>
            <div className={style.header}>
                <div className={style.imageWrapper}>
                    <img
                        alt={name}
                        draggable="false"
                        loading="lazy"
                        role="presentation"
                        src={image}
                        className={style.image}
                    />
                </div>
            </div>
            <div className={style.cardBody}>
                <div className={style.innerBody}>
                    <CardContent>
                        <Typography className={style.title} gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography className={style.description} variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                    <div className={style.cardFooter}>
                        <CardActions className={style.actions}>
                            <Button
                                className={style.button}
                                variant="contained"
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                size="small"
                            >
                                Learn More
                            </Button>
                        </CardActions>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LinkCard;
