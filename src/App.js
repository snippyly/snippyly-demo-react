import './App.css';
import { Snippyly } from '@snippyly/elements';
import { useEffect, useState } from 'react';
import { getUser } from './uesrs';
import Home from './Home/Home';
import { SnippylyContext } from './context/SnippylyContext';
import Presence from './Presence/Presence';

function App() {

  const [snippyly, setSnippyly] = useState();

  useEffect(() => {
    initSnippyly();
  }, [])

  const initSnippyly = async () => {
    const snippyly = await Snippyly.init({
      apiKey: "TA66fUfxZVtGBqGxSTCz", // Add your Api Key here
      featureAllowList: [], // To allow specific features only
      // userIdAllowList: ['abcd'], // To allow specific users only
      urlAllowList: [], // To allow snippyly in specific screens only
      user: getUser() // Pass user with unique userId
    });
    setSnippyly(snippyly);
  }

  return (
    <>
      <SnippylyContext.Provider value={{ snippyly }}>
        <snippyly-presence></snippyly-presence>
        <Presence />
        <Home />
        <snippyly-cursor></snippyly-cursor>
      </SnippylyContext.Provider>
    </>
  );
}

export default App;
