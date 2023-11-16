import React from 'react';
import newsUpdates from '../../constants/newsUpdates.json';
import { NewsUpdate } from '../../constants/types';
import style from './UpdateBanner.module.scss';

interface UpdateBannerProps {
    onOfficeClick: () => void;
    onWharfClick: () => void;
}

/**
 * Component to display news update banners, read from newsUpdates.json
 * That file will be manually updated as new updates occur
 */
const UpdateBanner: React.FC<UpdateBannerProps> = ({ onOfficeClick, onWharfClick }) => {
    const officeUpdates: NewsUpdate[] | undefined = newsUpdates.updates.office[0].title
        ? newsUpdates.updates.office.map((update) => {
              return update;
          })
        : [];

    const wharfUpdates: NewsUpdate[] | undefined = newsUpdates.updates.wharf[0].title
        ? newsUpdates.updates.wharf.map((update) => {
              return update;
          })
        : [];

    let index = 0;

    return (
        <div className={style.bannerContainer}>
            {officeUpdates &&
                officeUpdates.map((update) => {
                    return (
                        <span className={style.phrmaBanner} key={index}>
                            <a className={style.link} onClick={onOfficeClick}>
                                {update.title}
                            </a>
                        </span>
                    );
                })}
            {wharfUpdates &&
                wharfUpdates.map((update) => {
                    return (
                        <span className={style.wharfBanner} key={index}>
                            <a className={style.link} onClick={onWharfClick}>
                                {update.title}
                            </a>
                        </span>
                    );
                })}
        </div>
    );
};

export default UpdateBanner;
