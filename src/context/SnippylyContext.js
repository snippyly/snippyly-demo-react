import { createContext, useContext } from 'react';

export const SnippylyContext = createContext();

export function useSnippyly() {
    return useContext(SnippylyContext);
}