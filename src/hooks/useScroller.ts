import { useCallback, useState } from 'react';

const DISABLED_CLASS_NAME = 'rps-scroll--disabled';

const useScroller = () => {
    const [isBodyScrollEnabled, setIsBodyScrollEnabled] = useState<boolean>(true);

    // Disables scrolling
    const disableScroll = useCallback(() => {
        if (isBodyScrollEnabled) {
            setIsBodyScrollEnabled(false);
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth',
            });
            document.body.classList.add(DISABLED_CLASS_NAME);
            document.documentElement.classList.add(DISABLED_CLASS_NAME);
        }
    }, []);

    // Enables scrolling
    const enableScroll = useCallback(() => {
        if (!isBodyScrollEnabled) {
            setIsBodyScrollEnabled(true);
            document.body.classList.remove(DISABLED_CLASS_NAME);
            document.documentElement.classList.remove(DISABLED_CLASS_NAME);
        }
    }, []);

    return {
        disableScroll,
        enableScroll,
    };
};

export default useScroller;
