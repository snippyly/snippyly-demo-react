import { VeltComments, VeltCommentsSidebar, VeltCommentTool, VeltCursor, VeltProvider } from '@veltdev/react';
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
      commentElement.enableDeviceInfo(true);
    }
  }

  return (
    <>
      <VeltProvider apiKey='TA66fUfxZVtGBqGxSTCz' config={{
        featureAllowList: [], // To allow specific features only
        // userIdAllowList: ['abcd'], // To allow specific users only
        urlAllowList: [], // To allow velt in specific screens only
      }} onClientLoad={(client) => init(client)}>
        <div>
          <VeltCursor />
          <VeltComments />
          <VeltCommentsSidebar />
          <VeltCommentTool />
          <Toolbar onMenuSelect={(menu) => setSelectedMenu(menu)} />
          <Tabs selectedMenu={selectedMenu} />
        </div>
      </VeltProvider>
    </>
  );
}

export default App;
