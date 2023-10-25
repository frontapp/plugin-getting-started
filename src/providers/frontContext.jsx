import {createContext, useContext, useEffect, useState} from 'react';
import Front from '@frontapp/plugin-sdk';

/*
 * Context.
 */

export const FrontContext = createContext();

/*
 * Hook.
 */

export function useFrontContext() {
  return useContext(FrontContext);
}

/*
 * Component.
 */

export const FrontContextProvider = ({children}) => {
  const [context, setContext] = useState();

  useEffect(() => {
    const subscription = Front.contextUpdates.subscribe(frontContext => {
      setContext(frontContext);
    })
    return () => subscription.unsubscribe();
  }, [])

  return (
    <FrontContext.Provider value={context}>
      {children}  
    </FrontContext.Provider>
  )
}