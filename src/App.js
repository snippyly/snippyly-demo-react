import { SnippylyComments, SnippylyCommentsSidebar, SnippylyCommentTool, SnippylyCursor, SnippylyProvider } from '@snippyly/react';
import { useState } from 'react';
import './App.css';
import Tabs from './Tabs/Tabs';
import Toolbar from './Toolbar/Toolbar';

function App() {

  const [selectedMenu, setSelectedMenu] = useState();

  const init = async (client) => {
    if (client) {
      // To enable text comment feature
      const commentElement = client.getCommentElement();
      commentElement.enableAttachment(true);
      commentElement.showScreenSizeInfo(true);
    }
  }

  return (
    <>
      <SnippylyProvider apiKey='TA66fUfxZVtGBqGxSTCz' config={{
        featureAllowList: [], // To allow specific features only
        // userIdAllowList: ['abcd'], // To allow specific users only
        urlAllowList: [], // To allow snippyly in specific screens only
      }} onClientLoad={(client) => init(client)}>
        <div>
          <SnippylyCursor />
          <SnippylyComments />
          <SnippylyCommentsSidebar />
          <SnippylyCommentTool />
          <Toolbar onMenuSelect={(menu) => setSelectedMenu(menu)} />
          <Tabs selectedMenu={selectedMenu} />
        </div>
      </SnippylyProvider>
    </>
  );
}

export default App;
