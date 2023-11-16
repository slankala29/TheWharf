import React from 'react';
import { NewsUpdate } from '../../constants/types';
import officeUpdates from '../../constants/newsUpdates.json';
import CarouselComponent from '../carouselComponent/CarouselComponent';
import renderings from '../../constants/officeRenderings.json';
import style from './OfficeUpdates.module.scss';

const OfficeUpdates = () => {
    return (
        <div className={style.updateSection}>
            <h4 className={style.header}>PhRMA Office Renderings</h4>
            <CarouselComponent images={renderings.images} />
        </div>
    );
};

export default OfficeUpdates;
