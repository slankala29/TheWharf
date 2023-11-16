import React, { createContext, useState } from 'react';

export interface ComponentContext {
    componentIndex: number;
    setComponentIndex: (index: number) => void;
}

const defaultContext: ComponentContext = {
    componentIndex: 0,
    setComponentIndex: () => {},
};

export const componentContext = createContext<ComponentContext>(defaultContext);
const { Provider } = componentContext;

export const ComponentProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [componentIndex, setComponentIndex] = useState<number>(0);
  
    return (
      <componentContext.Provider value={{ componentIndex, setComponentIndex }}>
        {children}
      </componentContext.Provider>
    )};
    
export default ComponentProvider;
