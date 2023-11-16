import React, { useState } from 'react';
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Box, Button, Grid } from '@mui/material';
import styles from './CarouselComponent.module.scss';

export type CarouselImage = {
    source: string;
    legend: string;
};

interface CarouselComponentProps {
    images: CarouselImage[];
}

/**
 * Component to loop through and display image gallery passed in
 */
const CarouselComponent: React.FC<CarouselComponentProps> = ({ images }) => {
    const [caption, setCaption] = useState<string>(images[0].legend);

    // Set the caption when the image changes
    const onChange = (index: number, item: any) => {
        if (!index || !item) {
            return;
        }
        setCaption(item.key.replace('.$', ''));
    };

    return (
        <div className={styles.carouselSection}>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item className={styles.gridItem}>
                    <Box className={styles.carouselContainer}>
                        <Carousel
                            autoPlay
                            infiniteLoop
                            interval={6000}
                            transitionTime={2000}
                            animationHandler="fade"
                            swipeable={false}
                            onChange={onChange}
                        >
                            {images.map((image) => {
                                return (
                                    <div key={image.legend}>
                                        <img src={image.source} alt={image.legend} />
                                    </div>
                                );
                            })}
                        </Carousel>
                        <div className={styles.captionSection}>
                            <Button disabled className={styles.captionBox}>
                                {caption}
                            </Button>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default CarouselComponent;
