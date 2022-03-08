import { createContext, useContext } from 'react';

export const SnippylyContext = createContext();

export function useSnippylyClient() {
    return useContext(SnippylyContext);
}