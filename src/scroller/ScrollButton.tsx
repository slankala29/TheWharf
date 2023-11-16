import React from 'react';
import { IconButton } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import style from './ScrollButton.module.scss';

interface ScrollButtonProps {
    onClick: (e: any) => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ onClick }) => {
    return (
        <IconButton className={style.button} aria-label="scroll-down" onClick={onClick}>
            <ExpandCircleDownIcon className={style.icon} fontSize="large" />
        </IconButton>
    );
};

export default ScrollButton;
