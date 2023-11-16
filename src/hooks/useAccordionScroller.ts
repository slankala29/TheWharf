import React, { useEffect, useState } from 'react';

/**
 * Hook to determine if there is overflow in the FAQ section
 * If there is, we want to turn off auto scrolling until there is no longer overflow
 * or until a user scrolls past the end of the component
 * @param ref
 * @param expanded
 */
const useAccordionScroller = (ref: React.RefObject<HTMLDivElement>, expanded: boolean) => {
    const [overflow, setOverflow] = useState<boolean>(false);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [yPosition, setYPosition] = useState<number>(0);

    const onScroll = (e: any) => {
        if (e.target) {
            // Scrolling down
            if (e.target.scrollTop > yPosition) {
                // At bottom of block
                if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
                    setCanScroll(true);
                } else {
                    setCanScroll(false);
                }
            }
            // Scrolling up
            else if (e.target.scrollTop < yPosition) {
                // At top of block
                if (e.target.scrollTop === 0) {
                    setCanScroll(true);
                } else {
                    setCanScroll(false);
                }
            }
            setYPosition(e.target.scrollTop);
        }
    };

    // Detect if FAQ section has overflow
    useEffect(() => {
        setOverflow(expanded);
        // Due to the accordion animation, height is calculated before it changes
        // The timeout will wait 1000 milliseconds before calculating and deciding if there is overflow
        const timer = setTimeout(() => {
            console.log('ping', yPosition);
            if (ref.current) {
                setOverflow(ref.current?.scrollHeight > ref.current?.clientHeight);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [expanded]);

    // Set if page can scroll based on overflow and internal scroll position
    useEffect(() => {
        if (overflow) {
            setCanScroll(false);
        } else {
            setCanScroll(true);
        }
    }, [overflow]);

    return {
        canScroll,
        setCanScroll,
        onScroll,
    };
};

export default useAccordionScroller;
