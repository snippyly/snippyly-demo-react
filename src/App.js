import { Snippyly } from '@snippyly/sdk';
import { useEffect, useState } from 'react';
import './App.css';
import { SnippylyContext } from './context/SnippylyContext';
import Tabs from './Tabs/Tabs';
import Toolbar from './Toolbar/Toolbar';

function App() {

  const [client, setClient] = useState(null);

  const [selectedMenu, setSelectedMenu] = useState();

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const client = await Snippyly.init('TA66fUfxZVtGBqGxSTCz', {
      featureAllowList: [], // To allow specific features only
      // userIdAllowList: ['abcd'], // To allow specific users only
      urlAllowList: [], // To allow snippyly in specific screens only
    }); // Add your Api Key here
    console.log('snippyly client', client);
    setClient(client);
  }

  return (
    <>
      <SnippylyContext.Provider value={{ client }}>
        <div>
          <snippyly-cursor></snippyly-cursor>
          <snippyly-comments></snippyly-comments>
          <snippyly-comments-sidebar></snippyly-comments-sidebar>
          <snippyly-comment-tool>
            <div className='add-comment-btn'>
              <img src='https://cdn-icons-png.flaticon.com/512/727/727570.png' alt='Add comment' />
            </div>
          </snippyly-comment-tool>
          <Toolbar onMenuSelect={(menu) => setSelectedMenu(menu)} />
          <Tabs selectedMenu={selectedMenu} />
        </div>
      </SnippylyContext.Provider >
    </>
  );
}

export default App;
