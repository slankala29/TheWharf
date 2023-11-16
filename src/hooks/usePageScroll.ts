import { useCallback } from 'react';

const usePageScroll = () => {
    // Actual scrolling of page, move current page container to the next component index
    const scrollPage = useCallback((nextComponentIndex: number, pageContainer: React.MutableRefObject<null>) => {
        let container: any = pageContainer.current;
        container.style.transform = `translate3d(0, ${nextComponentIndex * -100}%, 0)`;
    }, []);

    return {
        scrollPage,
    };
};

export default usePageScroll;
