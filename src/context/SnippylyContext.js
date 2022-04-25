import { createContext, useContext } from 'react';

/**
 * @typedef {import("@snippyly/sdk").Snippyly} SnippylyClient
 */

export const SnippylyContext = createContext();

/**
 * 
 * @returns {{client: SnippylyClient}}
 */
export function useSnippylyClient() {
    return useContext(SnippylyContext);
}