import * as React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import style from './UpdateCard.module.scss';

interface UpdateCardProps {
    image: string;
    title: string;
    body: string;
    link?: string;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ image, title, body, link }) => {
    return (
        <Card className={style.cardContainer} elevation={6}>
            <div className={style.header}>
                <div className={style.imageWrapper}>
                    <img
                        alt={title}
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
                            {title}
                        </Typography>
                        <Typography component={'span'} className={style.body} variant="body2" color="text.secondary">
                            <div dangerouslySetInnerHTML={{ __html: body }} />
                        </Typography>
                    </CardContent>
                    {link && (
                        <div className={style.cardFooter}>
                            <CardActions className={style.actions}>
                                <Button
                                    className={style.button}
                                    variant="contained"
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer"
                                    size="small"
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default UpdateCard;
