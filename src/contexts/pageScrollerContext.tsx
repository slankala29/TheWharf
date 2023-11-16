import React, { createContext, useState, ReactNode, ReactElement } from 'react';

export interface PageScrollerContext {
    container: React.MutableRefObject<null>;
}

const defaultContext: PageScrollerContext = {
    container: {} as React.MutableRefObject<null>,
};

export const pageScrollerContext = createContext<PageScrollerContext>(defaultContext);
const { Provider } = pageScrollerContext;

interface PageScrollerProviderProps {
    pageContainer: React.MutableRefObject<null>;
    children: ReactNode; // Use ReactNode to accept any valid JSX content
}

const PageScrollerProvider: React.FC<PageScrollerProviderProps> = ({
    pageContainer,
    children,
}: PageScrollerProviderProps) => {
    const [container] = useState(pageContainer);

    return <Provider value={{ container }}>{children}</Provider>;
};

export default PageScrollerProvider;
