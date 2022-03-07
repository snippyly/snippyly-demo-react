import { Snippyly } from '@snippyly/sdk';
import { useEffect, useState } from 'react';
import './App.css';
import { SnippylyContext } from './context/SnippylyContext';
import Toolbar from './Toolbar/Toolbar';

function App() {

  const [snippyly, setSnippyly] = useState(null);

  useEffect(() => {
    initSnippyly();
  }, [])

  const initSnippyly = async () => {
    const snippyly = await Snippyly.init('TA66fUfxZVtGBqGxSTCz', {
      featureAllowList: [], // To allow specific features only
      // userIdAllowList: ['abcd'], // To allow specific users only
      urlAllowList: [], // To allow snippyly in specific screens only
    }); // Add your Api Key here
    console.log('snippyly', snippyly);
    setSnippyly(snippyly);
  }

  return (
    <>
      <SnippylyContext.Provider value={{ snippyly }}>
        <div>
          <snippyly-cursor></snippyly-cursor>
          <Toolbar />
        </div>
      </SnippylyContext.Provider >
    </>
  );
}

export default App;
