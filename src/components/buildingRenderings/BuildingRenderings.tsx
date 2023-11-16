import React from 'react';
import CarouselComponent from '../carouselComponent/CarouselComponent';
import renderings from '../../constants/buildingRenderings.json';
import style from './BuildingRenderings.module.scss';

const BuildingRenderings = () => {
    return (
        <div className={style.updateSection}>
            <h4 className={style.header}>Building Renderings</h4>
            <CarouselComponent images={renderings.images} />
        </div>
    );
};

export default BuildingRenderings;
