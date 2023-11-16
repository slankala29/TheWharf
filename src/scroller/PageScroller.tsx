import React, { useCallback, useEffect, useRef, useState, useMemo, useContext } from 'react';
import { isNil, isNull, isPositiveNumber } from './utils';
import usePrevious from '../hooks/usePrevValue';
import useScroller from '../hooks/useScroller';
import usePageScroll from '../hooks/usePageScroll';
import PageScrollerProvider from '../contexts/pageScrollerContext';
import { componentContext } from '../contexts/componentContext';
import ScrollButton from './ScrollButton';


const animationTimer = 1000;
const transitionTimingFunction = 'ease-in-out';
const DEFAULT_CONTAINER_HEIGHT = '100vh';
const DEFAULT_CONTAINER_WIDTH = '100vw';
const DEFAULT_COMPONENT_INDEX = 0;
const DEFAULT_COMPONENTS_TO_RENDER_LENGTH = 0;

const animationTimerBuffer = 200;
const KEY_UP = 38;
const KEY_DOWN = 40;
const MINIMAL_DELTA_Y_DIFFERENCE = 1;

let previousTouchMove: any = null;
let isScrolling = false;
let isMounted = false;
const containers: any = [];

const TOUCHMOVE = 'touchmove';
const KEYDOWN = 'keydown';

interface PageScrollerProps {
    scrolling: boolean;
    children?: React.ReactNode;
}

/**
 * Adds auto scrolling functionality to move to next fullscreen page section
 * @param children
 */
const PageScroller: React.FunctionComponent<PageScrollerProps> = ({ scrolling, children }) => {
    const [componentsToRenderLength, setComponentsToRenderLength] = useState(DEFAULT_COMPONENTS_TO_RENDER_LENGTH);
    const [showButton, setShowButton] = useState<boolean>(true);
    const { componentIndex, setComponentIndex } = useContext(componentContext);
    const { scrollPage } = usePageScroll();
    const prevComponentIndex = usePrevious(componentIndex);
    const { enableScroll, disableScroll } = useScroller();
    const scrollContainer = useRef(null);
    const pageContainer = useRef(null);
    const lastScrolledElement = useRef(null);

    const elements = useMemo(() => React.Children.toArray(children), [children]);

   // Adds components to the list of components to render
   const addNextComponent = useCallback(
    (componentsToRenderOnMountLength: number) => {
        let tempComponentsToRenderLength = 0;

        if (!isNil(componentsToRenderOnMountLength)) {
            tempComponentsToRenderLength = componentsToRenderOnMountLength;
        }

        tempComponentsToRenderLength = Math.max(tempComponentsToRenderLength, componentsToRenderLength);

        if (tempComponentsToRenderLength <= componentIndex + 1) {
            if (!isNil(elements[componentIndex + 1])) {
                tempComponentsToRenderLength++;
            }
        }

        setComponentsToRenderLength(tempComponentsToRenderLength);
    },
    [elements, componentIndex, componentsToRenderLength]
);


   // checks if components are rendered
    const checkRenderOnMount = useCallback(() => {
        if (!isNil(elements[DEFAULT_COMPONENT_INDEX + 1])) {
            addNextComponent(DEFAULT_COMPONENTS_TO_RENDER_LENGTH + 1);
        }
    }, [addNextComponent, elements]);

    // Renders the components
    const setRenderComponents = useCallback(() => {
        const newComponentsToRender = [];

        let i = 0;

        while (i <= componentsToRenderLength && !isNil(elements[i])) {
            containers[i] = true;
            newComponentsToRender.push(
                <div key={i} style={{ width: '100%' }}>
                    {React.cloneElement(elements[i] as React.ReactElement<any>, {
                        ...(elements[i] as React.ReactElement<any>).props,
                    })}
                </div>
            );
            i++;
        }

        return newComponentsToRender;
    }, [children, componentsToRenderLength]);

   // On scroll event, scroll down to next section
    const scrollWindowDown = useCallback(() => {
        if (!isScrolling) {
            if (!isNil(containers[componentIndex + 1])) {
                disableScroll();
                isScrolling = true;
                scrollPage(componentIndex + 1, pageContainer);

                setTimeout(() => {
                    if (isMounted) {
                        setComponentIndex(componentIndex + 1);
                    }
                }, animationTimer + animationTimerBuffer);
            } else {
                enableScroll();
            }
        }
    }, [animationTimer, animationTimerBuffer, componentIndex, disableScroll, enableScroll, scrollPage]);

    // On scroll event, scroll up to previous section
    const scrollWindowUp = useCallback(() => {
        if (!isScrolling) {
            if (!isNil(containers[componentIndex - 1])) {
                disableScroll();
                isScrolling = true;
                scrollPage(componentIndex - 1, pageContainer);

                setTimeout(() => {
                    if (isMounted) {
                        setComponentIndex(componentIndex - 1);
                    }
                }, animationTimer + animationTimerBuffer);
            } else {
                enableScroll();
            }
        }
    }, [animationTimer, animationTimerBuffer, componentIndex, disableScroll, enableScroll, scrollPage]);

    //Handler for mobile swipes
    const touchMove = useCallback(
    (event: TouchEvent) => {
        if (!isNull(previousTouchMove)) {
            if (event.touches[0].clientY > previousTouchMove) {
                scrollWindowUp();
            } else {
                scrollWindowDown();
            }
        } else {
            previousTouchMove = event.touches[0].clientY;
        }
    },
    [scrollWindowDown, scrollWindowUp]
);


    //Handler for mouse wheel scrolls
    // const wheelScroll = useCallback(
    //     (event) => {
    //         if (scrolling) {
    //             if (Math.abs(event.deltaY) > MINIMAL_DELTA_Y_DIFFERENCE) {
    //                 if (isPositiveNumber(event.deltaY)) {
    //                     lastScrolledElement.current = event.target;
    //                     scrollWindowDown();
    //                 } else {
    //                     lastScrolledElement.current = event.target;
    //                     scrollWindowUp();
    //                 }
    //             }
    //         }
    //     },
    //     [scrollWindowDown, scrollWindowUp, scrolling]
    // );

    //Handler for keyboard arrow stokes
    // const keyPress = useCallback(
    //     (event) => {
    //         if (event.keyCode === KEY_UP) {
    //             scrollWindowUp();
    //         }
    //         if (event.keyCode === KEY_DOWN) {
    //             scrollWindowDown();
    //         }
    //     },
    //     [scrollWindowDown, scrollWindowUp]
    // );

    //Adds the listeners for mobile swipe and keyboard stroke events
    // useEffect(() => {
    //     const instance: any = scrollContainer.current;
    //     instance.addEventListener(TOUCHMOVE, touchMove);
    //     instance.addEventListener(KEYDOWN, keyPress);
    //     return () => {
    //         instance.removeEventListener(TOUCHMOVE, touchMove);
    //         instance.removeEventListener(KEYDOWN, keyPress);
    //     };
    // }, [touchMove, keyPress]);

   // Calls the checkRenderOnMount when mounted
    useEffect(() => {
        isMounted = true;

        checkRenderOnMount();
        return () => {
            isMounted = false;
        };
    }, []);

    //Prevents additional scrolling events while moving
    // useEffect(() => {
    //     isScrolling = false;
    //     previousTouchMove = null;
    //     if (componentIndex > prevComponentIndex) {
    //         addNextComponent(componentIndex);
    //     }
    // }, [addNextComponent, componentIndex, prevComponentIndex]);

    // useEffect(() => {
    //     if (window.innerWidth <= 850) {
    //         elements.push(<></>, <></>);
    //     }
    // }, [window.innerWidth]);

    const onClick = (e: any) => {
        if (isNil(containers[componentIndex + 2])) {
            setShowButton(false);
        }
        scrollWindowDown();
    };

    useEffect(() => {
        if (!isNil(containers[componentIndex + 2])) {
            setShowButton(true);
        }
    }, [componentIndex]);

    return (
        <PageScrollerProvider pageContainer={pageContainer}>
            {showButton && <ScrollButton onClick={onClick} />}
            <div
                ref={scrollContainer}
                style={{
                    height: DEFAULT_CONTAINER_HEIGHT,
                    width: DEFAULT_CONTAINER_WIDTH,
                    overflow: 'hidden',
                }}
            >
                {/* <div
                    ref={pageContainer}
                    onWheel={wheelScroll}
                    style={{
                        height: '100%',
                        width: '100%',
                        transition: `transform ${animationTimer}ms ${transitionTimingFunction}`,
                        outline: 'none',
                    }}
                    tabIndex={0}
                >
                    {setRenderComponents()}
                </div> */}
            </div>
        </PageScrollerProvider>
    );
};

export default PageScroller;
