import { Snippyly } from '@snippyly/sdk';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SnippylyContext } from './context/SnippylyContext';
import Home from './Home/Home';
import StreamView from './StreamView/StreamView';
import Toolbar from './Toolbar/Toolbar';

function App() {

  const [client, setClient] = useState(null);

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

    // To enable text comment feature
    const commentElement = client.getCommentElement();
    commentElement.enableTextComments(true);
    commentElement.enableAttachment(true);
    // To enable live selection feature
    const selectionElement = client.getSelectionElement();
    selectionElement.enableLiveSelection(true);
    // Set document id
    client.setDocumentId(excludeSnippylyParamsFromUrl(window.location.href));
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
      <SnippylyContext.Provider value={{ client }}>
        <div>
          <snippyly-cursor></snippyly-cursor>
          <snippyly-comments-sidebar></snippyly-comments-sidebar>
          <snippyly-comment-tool>
            <div className='add-comment-btn'>
              <img src='https://cdn-icons-png.flaticon.com/512/727/727570.png' alt='Add comment' />
            </div>
          </snippyly-comment-tool>
          <Toolbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/stream-view" element={<StreamView />} />
          </Routes>
        </div>
      </SnippylyContext.Provider >
    </>
  );
}

export default App;
