import { VeltCommentsSidebar, VeltCommentTool, VeltCursor, VeltHuddle, VeltProvider, VeltRecorderControlPanel, VeltRecorderNotes } from '@veltdev/react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cursor from './Cursor/Cursor';
import Home from './Home/Home';
import Presence from './Presence/Presence';
import StreamView from './StreamView/StreamView';
import Toolbar from './Toolbar/Toolbar';

function App() {

  const init = async (client) => {
    if (client) {
      // To enable text comment feature
      const commentElement = client.getCommentElement();
      commentElement.enableTextComments(true);
      commentElement.enableAttachment(true);
      commentElement.enableDeviceInfo(true);
      // To enable live selection feature
      const selectionElement = client.getSelectionElement();
      selectionElement.enableLiveSelection(true);
      // Set document id
      client.setDocumentId(excludeSnippylyParamsFromUrl(window.location.href));
    }
  }

  const excludeSnippylyParamsFromUrl = (url) => {
    try {
      const tempUrl = new URL(url);
      ['review', 'sreviewId', 'snippyly-user', 'scommentId', 'stagId'].forEach((param) => {
        tempUrl.searchParams.delete(param);
      });
      return tempUrl.href;
    } catch (err) {
      return url;
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
          <VeltCommentsSidebar />
          <VeltCommentTool />
          <VeltRecorderControlPanel />
          <VeltRecorderNotes />
          <VeltHuddle />
          <Toolbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/stream-view" element={<StreamView />} />
          </Routes>
        </div>
      </VeltProvider>
    </>
  );
}

export default App;
