import { SnippylyCommentsSidebar, SnippylyCommentTool, SnippylyCursor, SnippylyHuddle, SnippylyProvider, SnippylyRecorderControlPanel, SnippylyRecorderNotes } from '@snippyly/react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import StreamView from './StreamView/StreamView';
import Toolbar from './Toolbar/Toolbar';

function App() {

  const init = async (client) => {
    if (client) {
      // To enable text comment feature
      const commentElement = client.getCommentElement();
      commentElement.enableTextComments(true);
      commentElement.enableAttachment(true);
      commentElement.showScreenSizeInfo(true);
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
      <SnippylyProvider apiKey='TA66fUfxZVtGBqGxSTCz' config={{
        featureAllowList: [], // To allow specific features only
        // userIdAllowList: ['abcd'], // To allow specific users only
        urlAllowList: [], // To allow snippyly in specific screens only
      }} onClientLoad={(client) => init(client)}>
        <div>
          <SnippylyCursor />
          <SnippylyCommentsSidebar />
          <SnippylyCommentTool />
          <SnippylyRecorderControlPanel />
          <SnippylyRecorderNotes />
          <SnippylyHuddle />
          <Toolbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/stream-view" element={<StreamView />} />
          </Routes>
        </div>
      </SnippylyProvider>
    </>
  );
}

export default App;
