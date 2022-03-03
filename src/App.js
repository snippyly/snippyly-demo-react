import './App.css';
import { useEffect, useState } from 'react';
import { Users } from './users';
import { SnippylyContext } from './context/SnippylyContext';
import { Snippyly } from '@snippyly/sdk';

function App() {

  const [snippyly, setSnippyly] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const users = Users;

  useEffect(() => {
    initSnippyly();
    if (localStorage.getItem('user')) {
      setSelectedUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [])

  useEffect(() => {
    if (selectedUser && snippyly) {
      signIn();
    }
  }, [selectedUser, snippyly])

  const initSnippyly = async () => {
    const snippyly = await Snippyly.init('TA66fUfxZVtGBqGxSTCz');
    console.log('snippyly', snippyly)
    setSnippyly(snippyly);
  }

  const identifyUser = () => {
    snippyly.identify({
      // apiKey: "TA66fUfxZVtGBqGxSTCz", // Add your Api Key here
      featureAllowList: [], // To allow specific features only
      // userIdAllowList: ['abcd'], // To allow specific users only
      urlAllowList: [], // To allow snippyly in specific screens only
      user: selectedUser // Pass user with unique userId
    })
  }

  const signIn = (user) => {
    localStorage.setItem('user', JSON.stringify(selectedUser));
    identifyUser();
  }

  const signOut = () => {
    localStorage.removeItem('user');
    window.location.reload();
  }

  return (
    <>
      <SnippylyContext.Provider value={{ snippyly }}>
        <div>
          <div className='header'>
            <snippyly-presence></snippyly-presence>
            <snippyly-cursor></snippyly-cursor>
            <div>
              {
                selectedUser ?
                  <div>
                    <span>Hi, {selectedUser?.name}</span>
                    <button className='custom-btn' onClick={() => signOut()}>Sign Out</button>
                  </div>
                  :
                  <div>
                    <span>Sign In with:</span>
                    {
                      users.map((user) => {
                        return (
                          <button key={user.userId} className='custom-btn' onClick={() => setSelectedUser(user)}>{user?.name}</button>
                        )
                      })
                    }
                  </div>
              }
            </div>
          </div>
        </div>
      </SnippylyContext.Provider >
    </>
  );
}

export default App;
